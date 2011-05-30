var sys = require('sys')
    ,   fs = require('fs')
    ,   http = require('http')
    ,   app = require('express').createServer()
    ,   socket = require('socket.io').listen(app)
    ,   Mustache = require('mustache')
    ,   _ = require('underscore')
    ,   html_template = fs.readFileSync('noulette.html', 'utf8')
    ,   layout_config = JSON.parse(fs.readFileSync('./pub/js/layout_config.js', 'utf8'))
    ,   view = {
        title: 'Noulette'
    }
    ,   payouts = {
            color: 1,
            half: 1,
            parity: 1,
            column: 2,
            third: 2,
            number: 35
    }
    ,   seconds_between_spins = seconds(10)
    ,   game_is_active = false
    ,   players = {}
    ,   board
;

var tests = {
    // TODO: add "00" tests
    column_test: function (result) {
        return layout_config.columns.column_1.indexOf(Number(result)) !== -1 ? 'column_1' : layout_config.columns.column_2.indexOf(Number(result)) !== -1 ? 'column_2' : 'column_3';
    },
    which_third_test: function (result) {
        return result === 'first' ? '1_12' : result === 'second' ? '13_24' : '25_36';
    },
    which_half_test: function (result) {
        return result === 'first' ? '1_18' : '19_36';
    }
},
message = {
    player: function (id, msg) {
        socket.clients[id]['send'](msg);
    },
    players: function (msg) {
        socket.broadcast(msg);
    }
},
betting = {
    status: false,
    switch_status: function () {
        this.status = !this.status;
    },
    send_status: function () {
        message.players({
            betting_status: this.status
        });
    },
    open: function () { // merge into .toggle_status()
        this.switch_status();
        this.send_status();
    },
    close: function (callback) { // merge into .toggle_status()
        this.switch_status();
        this.send_status();
        callback();
    }
};

function seconds(secs) {
    return secs * 1000;
}

var Bet_board = (function () {
    fs.readFile('./pub/js/board.js', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        board = JSON.parse(data);
    });
    return function Bet_board() {
        return board;
    }
});

function random(arr) {
    return Math.floor(Math.random() * arr.length);
}

function spin() {
    var result = layout_config.numbers.nums[random(layout_config.numbers.nums)]
        ,   results = {
            number: result.toString()
            ,   color: layout_config.numbers[result]['color']
            ,   parity: layout_config.numbers[result]['parity']
            ,   third: tests.which_third_test(layout_config.numbers[result]['third'])
            ,   half: tests.which_half_test(layout_config.numbers[result]['half'])
            ,   column: tests.column_test(result)
        }
    ;
    return results;
}

function generate_active_players_arr() {
    var player, players_arr = [];
    for (player in players) {
        if (players.hasOwnProperty(player)) {
            players_arr[players_arr.length] = players[player]['name'];
        }
    }
    return players_arr;
}

function Payout(message, chips) {
    this.payout = {
        message: message,
        chips: chips
    };
}

function payout(winners, widget, winnings) { // widget needs a more descriptive name
    var winner, id, name, l;
    for (winner = 0, l = winners.length; winner < l; winner += 1) {
        name = players[winners[winner]]['name'];
        id = players[winners[winner]]['client_id'];
        message.player(id,
            new Payout('congrats, ' + name + ' you\'ve won ' + winnings + ' betting on ' + widget, winnings)
        );
        players[winners[winner]]['credit'](winnings);
    }
}

var update_players_list = (function () {
    var template = '{{#players}}<li>{{.}}</li>{{/players}}';
    function View() {
        this.view = {
            players: generate_active_players_arr()
        };
        this.template = template;
    }

    return function update_players_list() {
        var players = new View()
            , players_partial = Mustache.to_html(players.template, players.view)
        ;

        message.players({
            players_arr: players_partial
        });
    }
}());

function Bet() {}

Bet.prototype.add_bet = function (widget, wager, client_id) {
    board[widget][client_id] = board[widget][client_id] ? board[widget][client_id] += wager : wager;
    players[client_id]['debit'](wager);
};
Bet.prototype.remove_bet = function (widget, wager, client_id) {
    board[widget][client_id] = board[widget][client_id] -= wager;
    if (board[widget][client_id] <= 0) {
        delete board[widget][client_id];
    }
    players[client_id]['credit'](wager);
};

function User(client_id, name) {
    this.client_id = client_id;
    this.name = name;
    this.chip_count = 20;
    this.bet = new Bet();
}
User.prototype.credit = function (wager) {
    var credit_amount = wager || 1;
    this.chip_count += credit_amount;
    this.update_client_chip_count();
};
User.prototype.debit = function (wager) {
    var debit_amount = wager || 1;
    this.chip_count -= debit_amount;
    this.update_client_chip_count();
};
User.prototype.update_client_chip_count = function () {
    message.player(this.client_id, {
        new_chip_count: this.chip_count
    });
};

function derp() { // TODO: this guy needs a proper name...
    if (game_is_active) {
        var bet_pays, widget, winners, result
            ,   results = spin()
        ;

        setTimeout(function () {
            betting.close(function () {
                message.players({
                    spin_results: results
                });

                for (result in results) {
                    if (results.hasOwnProperty(result) && board[results[result]]) {
                        bet_pays = payouts[result];
                        widget = results[result];
                        winners = _.keys(board[widget]);
                        payout(winners, widget, bet_pays);
                    }
                }


                setTimeout(function () {
                    board  = new Bet_board();
                    betting.open();
                    derp();
                }, seconds_between_spins);

            });
        }, seconds_between_spins);

        setTimeout(function () {
            message.players({
                spin: true
            });
        }, seconds(8));
    }
}

function init() {
    game_is_active = true;
    board  = new Bet_board();
    derp();
}

function disconnect(player) {
    delete players[player];
    update_players_list();
}

socket.on('connection', function (client) {
    var user
        ,   client_id = client.sessionId
    ;

    if (!game_is_active) {
        init();
    }

    if (_.keys(players).length < 1) {
        betting.open();
    } else {
        message.player(client_id, {
            betting_status: betting.status
        });
    }

    client.on('message', function (msg) {
        if (msg.bet && betting.status) {
            user.bet[msg.bet.action](msg.bet.widget, msg.bet.wager, client_id);    // add/remove bet
        }
        if (msg.user_name) {
            user = new User(client_id, msg.user_name);
            user.update_client_chip_count();
            players[client_id] = user;
            update_players_list();
        }
    }).on('disconnect', function () {
        disconnect(client_id);
    });
});

app.get('/*.(js|css|png)', function (req, res) {
    res.sendfile('./' + req.url);
}).get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(Mustache.to_html(html_template, view));
});

app.listen(8000);
