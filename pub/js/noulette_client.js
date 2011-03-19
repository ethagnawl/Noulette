(function () {

    var config = {
        betting_status: false
        ,   els: {
            $layout: $(document.getElementById('layout'))
            ,   betting_status: document.getElementById('betting_status')
            ,   wheel: document.getElementById('wheel')
            ,   results: document.getElementById('results')
            ,   flash: document.getElementById('flash')
            ,   players: document.getElementById('players')
            ,   chip_count: null
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
            user_name: prompt('hey there! what\'s your name?')
        ,   chip_count: 0
        ,   debit: function (key, val) {
            message_server({
                bet: new Bet('add_bet', key, val)
            });        
        }
        ,   credit: function (key, val) {
            message_server({
                bet: new Bet('remove_bet', key, val)
            });        
        }
        ,   update_chip_count: function (updated_chip_count) {
console.log('updated_chip_count: ' + updated_chip_count);
            var updated_chip_count_msg;
            this.chip_count = updated_chip_count;
            updated_chip_count_msg = this.chip_count > 0 ? this.chip_count : 'ca$hed out!';
            config.els.chip_count.innerHTML = updated_chip_count_msg;
        }
    }
    ,   socket = new io.Socket(null, {
        port: 8000
    });

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

    config.els.$layout.delegate('td', 'click', function () {
        var $this = $(this)
            ,   key = this.id
            ,   val = 1
        ;
        if (config.betting_status) {
            if ($this.hasClass(config.classes.chip)) {
                chips.credit(key, val);
                $this.removeClass(config.classes.chip);
            } else if (chips.chip_count) {
                chips.debit(key, val);                
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
        }
        if (msg.players_arr) {
            config.els.players.innerHTML = msg.players_arr;
        }
        if (msg.new_chip_count) {
            chips.update_chip_count(msg.new_chip_count); 
        }
        if (msg.spin) {
            var li_result = document.createElement('li')
                ,   first = config.els.results.getElementsByTagName('li')[1]
                ,   results = msg.spin
                ,   winner = false
                ,   result
            ;

            config.els.wheel.className = config.classes.spin;

            setTimeout(function () {
                li_result.innerHTML = results.number + ' ' + results.color + ' ' + results.parity;

                config.els.results.insertBefore(li_result, first);

                clear.bets();

                for (result in results) {
                    if (results.hasOwnProperty(result)) {
                        document.getElementById(results[result]).className = document.getElementById(results[result]).className += ' ' + config.classes.result;
                    }
                }
    
//                if (winner) {
//                   flash();
//                }            
                    
                 setTimeout(function () {
                    clear.all();                 
                 }, 4000);
    
            }, 4000);


        }
    });

    (function init() {
        var chip_count;
        if (chips.user_name) {
            chip_count = document.createElement('li');
            chip_count.id = 'chip_count';        
            chip_count.innerHTML = chips.chip_count;
            document.getElementById('chips').appendChild(chip_count);
            config.els.chip_count = document.getElementById('chip_count');
            message_server({
                user_name: chips.user_name
            });
            document.getElementsByTagName('body')[0].className = '';
        }
    }());
        
}());
