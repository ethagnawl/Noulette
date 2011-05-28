(function () {
    var config = {
        betting_status: false
        , port: 8000
        , els: {
            $layout: $(document.getElementById('layout'))
            , betting_status: document.getElementById('betting_status')
            , chip_count: document.getElementById('chip_count')
            , el_chips: document.getElementById('chips')
            , flash: document.getElementById('flash')
            , players: document.getElementById('players')
            , results: document.getElementById('results')
            , wheel: document.getElementById('wheel')
        }
        , classes: {
            spin: 'spin'
                , chip: 'chip'
                , result: 'result'
            }
        }
    , clear = {
            flash: function () {
//                flash('');
            }
            , results: function () {
                    config.els.$layout.find('.' + config.classes.result).removeClass(config.classes.result);
            }
            , bets: function () {
                    config.els.$layout.find('.' + config.classes.chip).removeClass(config.classes.chip);
            }
            , wheel: function () {
                    config.els.wheel.className = '';
            }
            , all: function all() {
                for (method in this) {
                    if (this.hasOwnProperty(method) && typeof this[method] === 'function' && method !== 'all') {
                        this[method]();
                    }
                }
            }
    }
    , chips = {
        chip_count: 0
            , augment_chip_count: function (action, key, val) {
                message_server({
                    bet: new Bet(action, key, val)
                });
            }
        , update_chip_count: function (updated_chip_count) {
console.log('updated_chip_count: ' + updated_chip_count);
            this.chip_count = updated_chip_count;
            config.els.chip_count.innerHTML = this.chip_count > 0 ? this.chip_count : 'ca$hed out!';
        }
    }
    , socket = new io.Socket(null, {
        port: config.port
    });

    chips.user_name = get_user_name();

    function get_user_name() {
//        var new_user, user_exists = localStorage.getItem('user_name');
//        if (user_exists) {
//            return user_exists;
//        } else {
            new_user = prompt('hey there! what\'s your name?')
//            localStorage.setItem('user_name', new_user);
            return new_user;
//        }
    }

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

    function update_betting_status(betting_status) {
        //$('.class').bind('click.namespace', function(){});
        //$('.class').trigger('click.namespace');
        //$('.class').unbind('click.namespace');
        config.betting_status = betting_status;
        var betting_state = betting_status ? 'open' : 'closed'
        config.els.betting_status.innerHTML = betting_state;
        config.els.betting_status.className = betting_state;
        if (betting_state === 'open') {
            clear.all();
        }
    }

    function clear_results() {
        $(document.getElementById('results')).find('li').not(':first').remove();
    }

    document.getElementById('clear_results').onclick = function () {
        clear_results();
    };

    config.els.$layout.delegate('td', 'click', function () {
//console.log(config.betting_status);
        if (config.betting_status) { // add .betting-open namespace and do away with this
            var $this = $(this)
                , key = this.id
                , val = 1
            ;
            if ($this.hasClass(config.classes.chip)) {
                chips.augment_chip_count('remove_bet', key, val);
                $this.removeClass(config.classes.chip);
            } else if (chips.chip_count) {
                chips.augment_chip_count('add_bet', key, val);
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
//console.log(msg.payout.message);
        }
        if (msg.hasOwnProperty('betting_status')) {
            update_betting_status(msg.betting_status);
        }
        if (msg.players_arr) {
            update_players_list(msg.players_arr);
        }
        if (msg.new_chip_count) {
            chips.update_chip_count(msg.new_chip_count);
        }
        if (msg.spin_results) {
console.log(msg.spin_results);
            var li_result = document.createElement('li')
                , first = config.els.results.getElementsByTagName('li')[1]
                , results = msg.spin_results
                , result
            ;


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
        if (msg.spin) {
            config.els.wheel.className = config.classes.spin;
        }
    });

    (function init() {
        if (chips.user_name) {
            message_server({
                user_name: chips.user_name
            });
            document.getElementsByTagName('body')[0].className = '';
        }
    }());
}());
