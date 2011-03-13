var html_template = "\
<html>\
<head>\
    <title>{{title}}</title>\
	<meta charset='UTF-8'>\
    <link rel='stylesheet' type='text/css' href='/pub/css/noulette.css' media='all' />\
    <script src='/pub/js/head.js'></script>\
</head>\
<body class='hide'>\
    <h1>noulette</h1>\
    <div id='column_left' class='fl-left fifty'>\
        <div id='flash'></div>\
        <ul id='players'></ul>\
        <button id='buy_more_chips'>buy more chips</button>\
        <ul id='chips'>\
            <li>Chip Stack</li>\
        </ul>\
        <ul id='results'>\
            <li>Results</li>\
        </ul>\
    </div>\
    <div id='column_right' class='fl-left fifty'>\
        <div id='layout'>\
            <div id='wheel'></div>\
            <table id='main_table'>\
                <tr>\
	                <td id='0' class='number yellow'>0</td>\
	                <td id='00' class='number yellow'>00</td>\
                </tr>\
                <tr>\
	                <td id='1' class='red number'>1</td>\
	                <td id='2' class='black number'>2</td>\
	                <td id='3' class='red number'>3</td>\
                </tr>\
                <tr>\
	                <td id='4' class='black number'>4</td>\
	                <td id='5' class='red number'>5</td>\
	                <td id='6' class='black number'>6</td>\
                </tr>\
                <tr>\
	                <td id='7' class='red number'>7</td>\
	                <td id='8' class='black number'>8</td>\
	                <td id='9' class='red number'>9</td>\
                </tr>\
                <tr>\
	                <td id='10' class='black number'>10</td>\
	                <td id='11' class='black number'>11</td>\
	                <td id='12' class='red number'>12</td>\
                </tr>\
                <tr>\
	                <td id='13' class='black number'>13</td>\
	                <td id='14' class='red number'>14</td>\
	                <td id='15' class='black number'>15</td>\
                </tr>\
                <tr>\
	                <td id='16' class='red number'>16</td>\
	                <td id='17' class='black number'>17</td>\
	                <td id='18' class='red number'>18</td>\
                </tr>\
                <tr>\
	                <td id='19' class='black number'>19</td>\
	                <td id='20' class='black number'>20</td>\
	                <td id='21' class='red number'>21</td>\
                </tr>\
                <tr>\
	                <td id='22' class='black number'>22</td>\
	                <td id='23' class='red number'>23</td>\
	                <td id='24' class='black number'>24</td>\
                </tr>\
                <tr>\
	                <td id='25' class='red number'>25</td>\
	                <td id='26' class='black number'>26</td>\
	                <td id='27' class='red number'>27</td>\
                </tr>\
                <tr>\
	                <td id='28' class='red number'>28</td>\
	                <td id='29' class='black number'>29</td>\
	                <td id='30' class='red number'>30</td>\
                </tr>\
                <tr>\
	                <td id='31' class='black number'>31</td>\
	                <td id='32' class='red number'>32</td>\
	                <td id='33' class='black number'>33</td>\
                </tr>\
                <tr>\
	                <td id='34' class='red number'>34</td>\
	                <td id='35' class='black number'>35</td>\
	                <td id='36' class='red number'>36</td>\
                </tr>\
                <tr>\
	                <td id='column_1'>2-1</td>\
	                <td id='column_2'>2-1</td>\
	                <td id='column_3'>2-1</td>\
                </tr>\
            </table>\
            <table id='three_wide'>\
	            <tr>\
	                <td id='1_12' class='third yellow'>1st 12</td>\
                    <td id='13_24' class='third yellow'>2nd 12</td>\
                    <td id='25_36' class='third yellow'>3rd 12</td>\
	            </tr>\
            </table>\
            <table id='six_wide'>\
	            <tr>\
                    <td id='1_18' class='half yellow'>1-18</td>\
                    <td id='even' class='parity yellow''>Even</td>\
                    <td id='red' class='red color'>Red</td>\
                    <td id='black' class='black color'>Black</td>\
                    <td id='odd' class='parity yellow'>Odd</td>\
                    <td id='19_36' class='half yellow'>19-36</td>\
	            </tr>\
            </table>\
        </div>\
    </div>\
    <script>\
    head.js('https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js', 'http://cdn.socket.io/stable/socket.io.js', '/pub/js/mustache.js', '/pub/js/noulette_client.js');\
    </script>\
</body>\
</html>\
";

var sys = require('sys')
    ,   fs = require('fs')
    ,   filename = process.argv[2]
    ,   Url = require('url')
    ,   http = require('http')
    ,   querystring = require('querystring')
    ,   static = require('node-static')
    ,   app = require('express').createServer()
    ,   socket = require('socket.io').listen(app)
    ,   file = new(static.Server)('./pub')
    ,   Mustache = require('mustache')
    ,   _ = require('underscore')
    ,   view = {
        title: "Noulette"
    }
    ,   players_arr = [] // use _ to build this from players{}
    ,   players = {}
    ,   layout_config = JSON.parse(fs.readFileSync(filename, 'utf8'))
;

//use(require('facebook').Facebook, {
//  apiKey: '5af3275cc23a696032fcf1e5125fa28a', 
//  apiSecret: '4e4af39c25f8eaf974820a6c77b14728'
//})

function vithout(arr) {
    var args = Array.prototype.slice.call(arguments).slice(1, arguments.length), arg, j, l, ll;
        for (arg = 0, l = args.length; arg < l; arg += 1) {
            for (j = 0, ll = arr.length; j < ll; j += 1) {
                if (arr[j] === args[arg]) {
                    arr.splice(j, 1); 
                    j -= 1;
                }
            }
        }
    return arr;
}

var tests = {
    // TODO: add "00" tests
    column_test: function (result) {
        return layout_config.columns.column_1.indexOf(Number(result)) !== -1 ? 'column_1' : layout_config.columns.column_2.indexOf(Number(result))!== -1 ? 'column_2' : 'column_3';
    },
    which_third_test: function (result) {
        return Number(result) < 13 ? '1_12' : Number(result) < 25 ? '13_24' : '25_36';        
    },
    which_half_test: function (result) {
        return Number(result) < 19 ? '1_18' : '19_36'    
    },
    parity_test: function (result) {
        return result === 'even' ? true : result === 'odd' ? true : 'something went wrong...';
    }
}

function Bet_board() {  // this name sucks
    return JSON.parse(fs.readFileSync('/var/www/roulette/pub/js/board.js', 'utf8'));
}

function rando(arr) {
    return Math.floor(Math.random() * arr.length);
}

function spin() {
    var result = layout_config.numbers.nums[rando(layout_config.numbers.nums)]
        ,   results = {
            number: result.toString()
            ,   color: layout_config.numbers[result]['color']
            ,   parity: layout_config.numbers[result]['parity']
            ,   third: tests.which_third_test(result)
            ,   half: tests.which_half_test(result)
        }
    ;
    return results;
}

var board;
(function () {
    board  = new Bet_board;
}());

setInterval(function () {
    var x, i, l, keys, results;
//    board  = new Bet_board;
    results = spin();
    keys = _.keys(players);
    for (i = 0; i < keys.length; i++) {
        var x = [keys][i];
    }

if (board[results.number]) {
        // credit 35
}
if (board[results.third]) {
        // credit 2
}
if (board[results.column]) {
        // credit 2
}
if (board[results.half]) {
        // credit 1
}
if (board[results.parity]) {
    x = _.keys(board[results.parity]);
    for (i = 0, l = x.length; i < l; i += 1) {
        socket.broadcast('congrats, ' + players[x[i]]['name'] + ' you\'ve won!', vithout(keys, x[i]));        
        players[x[i]]['credit'](1);
    }
}
if (board[results.color]) {
    x = _.keys(board[results.color]);
    for (i = 0, l = x.length; i < l; i += 1) {
        socket.broadcast('congrats, ' + players[x[i]]['name'] + ' you\'ve won!', vithout(keys, x[i]));        
        players[x[i]]['credit'](1);
    }
}

// } else { 
//  players[x[i]]['debit'](x);

    socket.broadcast({
        spin: results
    });
    board  = new Bet_board;
}, 20000);

function update_players_list() {
    var view = {
        players: players_arr 
    }
        ,   template = '{{#players}}<li>{{.}}</li>{{/players}}'
        ,   players_partial = Mustache.to_html(template, view)
    ;

    socket.broadcast({
        'players_arr': players_partial
    });        
}

function Bet() {
    this.bets = [];
}

function User(client_id, name) {
    this.client_id = client_id;
    this.name = name;
    this.chip_count = 20;
    this.bet = new Bet();
}

Bet.prototype.add_bet = function (widget, wager, client_id) {   // shouldn't these have access to client_id?
    board[widget][client_id] = wager;
};
Bet.prototype.remove_bet = function (widget, wager, client_id) {   // shouldn't these have access to client_id?
//    board[widget][client_id] = wager;
};
User.prototype.credit = function (chips) {
    var credit_amount = chips || 1;
    this.chip_count += credit_amount;
    this.update_chip_count();
};
User.prototype.debit = function (chips) {
    var debit_amount = chips || 1;
    this.chip_count -= debit_amount;
    this.update_chip_count();
};
User.prototype.update_chip_count = function () {
    if (this.chip_count) {
//        broadcast new chip count
        socket.broadcast({
            new_chip_count: this.chip_count
        });  
    } else {
//        broadcast 'ca$hed out!'
        socket.broadcast({
            new_chip_count: this.chip_count
        });  
    }
};

socket.on('connection', function (client) {
    var user;

    client.on('message', function (msg) {
        if (msg.bet) {
//console.log(msg);            
            user.bet[msg.bet.action](msg.bet.widget, msg.bet.wager, user.client_id);    // add/remove bet
        }
        if (msg.user_name) {
            user = new User(client.sessionId, msg.user_name);
            user.update_chip_count();
            players[client.sessionId] = user;
            players_arr[players_arr.length] = user.name;    // gheeeett0
            update_players_list();
        }
    }).on('disconnect', function () {
        vithout(players_arr, user.name);
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
