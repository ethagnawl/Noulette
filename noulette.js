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
        title: "Noulette"
    }
    ,   payouts = {
            color: 1,
            half: 1,
            parity: 1,
            column: 2,
            third: 2,
            number: 35
    }
    ,   players = {}
    ,   seconds_between_spins = 10000
    ,   game_is_active = false
    ,   board
;

var tests = {
    // TODO: add "00" tests
    column_test: function (result) {
        return layout_config.columns.column_1.indexOf(Number(result)) !== -1 ? 'column_1' : layout_config.columns.column_2.indexOf(Number(result))!== -1 ? 'column_2' : 'column_3';
    },
    which_third_test: function (result) {
        return Number(result) < 13 ? '1_12' : Number(result) < 25 ? '13_24' : '25_36';        
    },
    which_half_test: function (result) {
        return Number(result) < 19 ? '1_18' : '19_36';
    },
    parity_test: function (result) {
        return result === 'even' ? true : result === 'odd' ? true : 'something went wrong...';
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
    open: function () {
        this.status = true;
        message.players({
            betting_status: this.status
        });        
    },
    close: function (callback) {
        this.status = false;
        message.players({
            betting_status: betting.status
        });        
        callback();
    }
};

function Bet_board() {  // this name sucks
    return JSON.parse(fs.readFileSync('./pub/js/board.js', 'utf8'));
}

function random(arr) {
    return Math.floor(Math.random() * arr.length);
}

function spin() {
    var result = layout_config.numbers.nums[random(layout_config.numbers.nums)]
        ,   results = {
            number: result.toString()
            ,   color: layout_config.numbers[result]['color']
            ,   parity: layout_config.numbers[result]['parity']
            ,   third: tests.which_third_test(result)
            ,   half: tests.which_half_test(result)
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

function payout(winners, widget, winnings) {
    var winner, id, name, l;
    for (winner = 0, l = winners.length; winner < l; winner += 1) {
        name = players[winners[winner]]['name'];
        id = players[winners[winner]]['client_id'];
        message.player(id, {
            payout: {
                message: 'congrats, ' + name + ' you\'ve won ' + winnings + ' betting on ' + widget,
                chips: winnings
            }
        });
        players[winners[winner]]['credit'](winnings);
    }
}

function update_players_list() {
    var view = {
        players: generate_active_players_arr()
    }
        ,   template = '{{#players}}<li>{{.}}</li>{{/players}}'
        ,   players_partial = Mustache.to_html(template, view)
    ;

    message.players({
        'players_arr': players_partial
    });        
}

function Bet() {}

Bet.prototype.add_bet = function (widget, wager, client_id) {   // shouldn't these have access to client_id?
    if (board[widget][client_id]) {
        board[widget][client_id] = board[widget][client_id] += wager;
    } else {
        board[widget][client_id] = wager;
    }
    players[client_id]['debit'](wager);
};
Bet.prototype.remove_bet = function (widget, wager, client_id) {   // shouldn't these have access to client_id?
    board[widget][client_id] = board[widget][client_id] -= wager;
    if (board[widget][client_id] === 0) {
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

function derp() {
    if (game_is_active) {
        var i, l, widget, winners, bet_pays, result
            ,   results = spin()
            ,   keys = _.keys(players)
        ;

    //    betting.close(function () {
    //        setTimeout(function () {
    //            betting.open();
    //        }, 10000);
    //    });

        for (result in results) {
            if (results.hasOwnProperty(result)) {
                if (board[results[result]]) {
                    bet_pays = payouts[result];
                    widget = results[result];
                    winners = _.keys(board[widget]);
                    payout(winners, widget, bet_pays);
                }
            }
        }

        message.players({
            spin: results
        });

        board  = new Bet_board();
    }
}

function init() {
    board  = new Bet_board();
    setInterval(function () {
        derp();
    }, seconds_between_spins);
    game_is_active = true;
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
//console.log(msg);
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
        delete players[client_id];
        update_players_list();
    });
});

app.get('/*.(js|css|png)', function(req, res) {
    res.sendfile("/var/www/roulette" + req.url);
}).get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(Mustache.to_html(html_template, view));
});

app.listen(8000);
