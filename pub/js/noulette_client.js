(function () {

    var config = {
        betting_status: false
        ,   els: {
            $layout:            $(document.getElementById('layout'))
            ,   betting_status: document.getElementById('betting_status')
            ,   chip_count:     document.getElementById('chip_count')
            ,   el_chips:       document.getElementById('chips')
            ,   flash:          document.getElementById('flash')
            ,   players:        document.getElementById('players')
            ,   results:        document.getElementById('results')
            ,   wheel:          document.getElementById('wheel')
        }
        ,   classes: {
            spin: 'spin'
            ,   chip: 'chip'
            ,   result: 'result'   
        }
    }
    ,   clear = {
            flash: function () {
//                flash('');
            }
            ,   results: function () {
                    config.els.$layout.find('.' + config.classes.result).removeClass(config.classes.result);
            }
            ,   bets: function () {
                    config.els.$layout.find('.' + config.classes.chip).removeClass(config.classes.chip);    
            }
            ,   wheel: function () {
                    config.els.wheel.className = '';
            }
            ,   all: function () {
                    this.flash();
                    this.results();
                    this.bets();
                    this.wheel();            
            }
    }
    ,   chips = {
            user_name: localStorage.getItem('user_name') ? localStorage.getItem('user_name') : prompt('hey there! what\'s your name?')
        ,   chip_count: 0
        ,   augment_bet: function (action, key, val) {
                message_server({
                    bet: new Bet(action, key, val)
                });                    
        }
        ,   update_chip_count: function (updated_chip_count) {
console.log('updated_chip_count: ' + updated_chip_count);
            this.chip_count = updated_chip_count;
            config.els.chip_count.innerHTML = this.chip_count > 0 ? this.chip_count : 'ca$hed out!';
        }
    }
    ,   socket = new io.Socket(null, {
        port: 8000
    });

//    (function user_name() {
//        var user_exists = localStorage.getItem('user_name');
//        if (user_exists) {
//            chips.user_name = user_exists;
//        } else {
//            chips.user_name = prompt('hey there! what\'s your name?'); // TODO: <---
//            localStorage.setItem('user_name', chips.user_name);
//        }        
//    }());

    function flash(msg) {
        config.els.flash.innerHTML = msg;
    }

    function Bet(action, widget, key) {
        this.action = action;
        this.widget = widget;
        this.wager = key;
    }

    function message_server(msg) {
        socket.send(msg);            
    }

    function update_players_list(players_list) {
        config.els.players.innerHTML = players_list;    
    }

    config.els.$layout.delegate('td', 'click', function () {
        if (config.betting_status) {
            var $this = $(this)
                ,   key = this.id
                ,   val = 1
            ;
            if ($this.hasClass(config.classes.chip)) {
                chips.augment_bet('remove_bet', key, val);                
                $this.removeClass(config.classes.chip);
            } else if (chips.chip_count) {
                chips.augment_bet('add_bet', key, val);                
                $this.addClass(config.classes.chip);
            } else {
console.log('Please purchase additional chips.');        
            }
        } else {
console.log('sorry, no more bets.');        
        }
    });    

    socket.connect().on('message', function (msg) {
        if (msg.payout) {
console.log(msg.payout.message);
        }
        if (msg.hasOwnProperty('betting_status')) {
            config.betting_status = msg.betting_status ? 'open' : 'closed';
            config.els.betting_status.innerHTML = config.betting_status;
            config.els.betting_status.className = config.betting_status;
            if (config.betting_status === 'open') {
                clear.all();
            }
        }
        if (msg.players_arr) {
            update_players_list(msg.players_arr);
        }
        if (msg.new_chip_count) {
            chips.update_chip_count(msg.new_chip_count); 
        }
        if (msg.spin) {
            var li_result = document.createElement('li')
                ,   first = config.els.results.getElementsByTagName('li')[1]
                ,   results = msg.spin
                ,   result
            ;

            config.els.wheel.className = config.classes.spin;

//            setTimeout(function () {
                li_result.innerHTML = results.number + ' ' + results.color + ' ' + results.parity;

                config.els.results.insertBefore(li_result, first);

                clear.bets();

                for (result in results) {
                    if (results.hasOwnProperty(result)) {
                        document.getElementById(results[result]).className = document.getElementById(results[result]).className += ' ' + config.classes.result;
                    }
                }
//            }, 4000);
        }
    });

    (function init() {
        if (chips.user_name) {
            message_server({
                user_name: chips.user_name
            });
        }
    }());
}());
