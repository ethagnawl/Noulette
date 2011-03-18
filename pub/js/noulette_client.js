(function () {

    var betting_status = false
        ,   clear = {
            flash: function () {
                flash('');
            }
            ,   bets: function () {
                $('#layout').find('.chip').removeClass('chip');    
            }
            ,   results: function () {
                $('#layout').find('.result').removeClass('result');
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
            document.getElementById('chip_count').innerHTML = updated_chip_count_msg;
        }
    }
    ,   socket = new io.Socket(null, {
        port: 8000
    });

    function flash(msg) {
        document.getElementById('flash').innerHTML = msg;
    }

    function Bet(action, widget, key) {
        this.action = action;
        this.widget = widget;
        this.wager = key;
    }

    function message_server(msg) {
        socket.send(msg);            
    }

    document.getElementById('buy_more_chips').onclick = function () {
        chips.credit(5);
    };

    $('#layout').delegate('td', 'click', function () {
        var $this = $(this)
            ,   key = this.id
            ,   val = 1
        ;
        if (betting_status) {
            if ($this.hasClass('chip')) {
                chips.credit(key, val);
                $this.removeClass('chip');
            } else if (chips.chip_count) {
                chips.debit(key, val);                
                $this.addClass('chip');
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
            betting_status = msg.betting_status;                    
        }
        if (msg.players_arr) {
            document.getElementById('players').innerHTML = msg.players_arr;
        }
        if (msg.new_chip_count) {
            chips.update_chip_count(msg.new_chip_count); 
        }
        if (msg.spin) {
            var results = msg.spin;
            clear.flash();
            $('.result').removeClass('result');
            $('#wheel').addClass('spin');
            setTimeout(function () {
                var li_result = document.createElement('li')
                    ,   bets = []
                    ,   winner = false
                    ,   bet
                    ,   l
                    ,   result
                ;

                li_result.innerHTML = results.number + ' ' + results.color + ' ' + results.parity;
                document.getElementById('results').appendChild(li_result);

               if (winner) {
                   flash();
                }

                clear.bets();            

                for (result in results) {
                    if (results.hasOwnProperty(result)) {
                        $(document.getElementById(results[result])).addClass('result');
                    }
                }

                setTimeout(function () {
                    $('#wheel').removeClass('spin');
                    clear.results();
                }, 4000);
 
            }, 2000);
        }
    });

    (function init() {
        if (chips.user_name) {
            message_server({
                user_name: chips.user_name
            });
            document.getElementsByTagName('body')[0].className = '';
            var chip_count = document.createElement('li');
            chip_count.id = 'chip_count';        
            chip_count.innerHTML = chips.chip_count;
            document.getElementById('chips').appendChild(chip_count);
        }
    }());
        
}());
