(function () {

    var layout_config = {
        "columns": {
            "column_1": [
                0,
                1,
                4,
                7,
                10,
                13,
                16,
                19,
                22,
                25,
                28,
                31,
                34
            ],
            "column_2": [
                0,
                "00",
                2,
                5,
                8,
                11,
                14,
                17,
                20,
                23,
                26,
                29,
                32,
                35
            ],
            "column_3": [
                "00",
                3,
                6,
                9,
                12,
                15,
                18,
                21,
                24,
                27,
                30,
                33,
                36
            ] 
        },
        "numbers": {
            "nums": [
                0,
                28,
                9,
                26,
                30,
                11,
                7,
                20,
                32,
                17,
                5,
                22,
                34,
                15,
                3,
                24,
                36,
                13,
                1,
                "00",
                27,
                10,
                25,
                29,
                12,
                8,
                19,
                31,
                18,
                6,
                21,
                33,
                16,
                4,
                23,
                35,
                14,
                2
            ],
            "0": {
                "color": "green",
                "parity": "even", 
                "column_1":true,
                "column_2":true,
                "third": "first"                
            },
            "28": {
                "color": "red",
                "parity": "even", 
                "column_1":true,
                "third": "third",
                "half": "second"  
            },
            "9": {
                "color": "red",
                "parity": "odd", 
                "column_3":true,
                "third": "first",
                "half": "first" 
            },
            "26": {
                "color": "black",
                "parity": "even",
                "column_2":true,
                "third": "third",
                "half": "second"                 
            },
            "30": {
                "color": "red",
                "parity": "even", 
                "column_3":true,
                "third": "third",
                "half": "second"
            },
            "11": {
                "color": "black",
                "parity": "odd",
                "column_2":true,
                "third": "first",
                "half": "first"                 
            },
            "7": {
                "color": "red",
                "parity": "odd", 
                "column_1":true,
                "third": "first",
                "half": "first"  
            },
            "20": {
                "color": "black",
                "parity": "even",
                "column_2":true,
                "half": "second"                
            },
            "32": {
                "color": "red",
                "parity": "even",
                "column_2":true,
                "third": "third",
                "half": "second"                
            },
            "17": {
                "color": "black",
                "parity": "odd",
                "column_2":true,
                "third": "second",
                "half": "first"                 
            },
            "5": {
                "color": "red",
                "parity": "odd",
                "column_2":true,
                "third": "first",
                "half": "first"                 
            },
            "22": {
                "color": "black",
                "parity": "even", 
                "column_1":true,
                "third": "second",
                "half": "second"  
            },
            "34": {
                "color": "red",
                "parity": "even", 
                "column_1":true,
                "third": "third",
                "half": "second"  
            },
            "15": {
                "color": "black",
                "parity": "odd", 
                "column_3":true,
                "third": "second",
                "half": "first"
            },
            "3": {
                "color": "red",
                "parity": "odd", 
                "column_3":true,
                "third": "first",
                "half": "first"  
            },
            "24": {
                "color": "black",
                "parity": "even", 
                "column_3":true,
                "third": "second",
                "half": "second"
            },
            "36": {
                "color": "red",
                "parity": "even", 
                "column_3":true,
                "third": "third",
                "half": "second"
            },
            "13": {
                "color": "black",
                "parity": "odd", 
                "column_1":true,
                "third": "second",
                "half": "first"  
            },
            "1": {
                "color": "red",
                "parity": "odd", 
                "column_1": true,
                "third": "first"
            },
            "00": {
                "color": "green",
                "parity": "even", 
                "column_2":true,
                "third": "first"
            },
            "27": {
                "color": "red",
                "parity": "odd", 
                "column_3":true,
                "third": "third",
                "half": "second"
            },
            "10": {
                "color": "black",
                "parity": "even", 
                "column_1":true,
                "third": "first",
                "half": "first"  
            },
            "25": {
                "color": "red",
                "parity": "odd", 
                "column_1":true,
                "third": "third",
                "half": "second"  
            },
            "29": {
                "color": "black",
                "parity": "odd",
                "column_2":true,
                "third": "third",
                "half": "second"                 
            },
            "12": {
                "color": "red",
                "parity": "even", 
                "column_3":true,
                "third": "first",
                "half": "first"
            },
            "8": {
                "color": "black",
                "parity": "even",
                "column_2":true,
                "third": "first",
                "half": "first"                 
            },
            "19": {
                "color": "black",
                "parity": "odd", 
                "column_1":true,
                "third": "second",
                "half": "second"  
            },
            "31": {
                "color": "black",
                "parity": "odd", 
                "column_1":true,
                "third": "third",
                "half": "second"  
            },
            "18": {
                "color": "red",
                "parity": "even", 
                "column_3":true,
                "third": "second",
                "half": "first"
            },
            "6": {
                "color": "black",
                "parity": "even", 
                "column_3": true,
                "third": "first",
                "half": "first" 
            },
            "21": {
                "color": "red",
                "parity": "odd", 
                "column_3":true,
                "third": "second",
                "half": "second"
            },
            "33": {
                "color": "black",
                "parity": "odd", 
                "column_3":true,
                "third": "third",
                "half": "second"
            },
            "16": {
                "color": "red",
                "parity": "even", 
                "column_1":true,
                "third": "second",
                "half": "first"  
            },
            "4": {
                "color": "black",
                "parity": "even",
                "column_1":true,
                "third": "first",
                "half": "first" 
            },
            "23": {
                "color": "red",
                "parity": "odd",
                "column_2":true,
                "third": "second",
                "half": "second"                 
            },
            "35": {
                "color": "black",
                "parity": "odd",
                "column_2":true,
                "third": "third",
                "half": "second"                
            },
            "14": {
                "color": "red",
                "parity": "even",
                "column_2":true,
                "third": "second",
                "half": "first"                 
            },
            "2": {
                "color": "black",
                "parity": "even", 
                "column_2":true,
                "third": "first",
                "half": "first"
            } 
        }
    }
    ,   user = {}
    ;

    var tests = {
        // TODO: add "00" tests and move server-side
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

    function flash() {
        document.getElementById('flash').innerHTML = 'We have a winner!';
    }
    
    var clear = {
        flash: function () {
            document.getElementById('flash').innerHTML = '';
        },
        bets: function () {
            $('#layout').find('.chip').removeClass('chip');    
        },
        results: function () {
            $('#layout').find('.result').removeClass('result');
        }    
    };

    var chips = {
        owner: null,
        chip_count: 5,
        credit: function (chips) {
            var credit_amount = chips || 1;
            this.chip_count += credit_amount;
            this.update_chip_count();
            socket.send(this);
        },
        debit: function (chips) {
            var debit_amount = chips || 1;
            this.chip_count -= debit_amount;
            this.update_chip_count();
            socket.send(this);
        },
        update_chip_count: function () {
            if (chips.chip_count) {
                document.getElementById('chip_count').innerHTML = chips.chip_count;
            } else {
                document.getElementById('chip_count').innerHTML = 'ca$hed out!';            
            }
        }
    };

    (function () {
        var chip_count = document.createElement('li');
        chip_count.id = 'chip_count';        
        chip_count.innerHTML = chips.chip_count;
        document.getElementById('chips').appendChild(chip_count);
    }());

    document.getElementById('buy_more_chips').onclick = function () {
        chips.credit(5);
    };

    var socket = new io.Socket(null, {
        port: 8000
    });

    $('#layout').delegate('td', 'click', function () {
        var key = this.id
            ,   val = 1
            ,   bet = {}
        ;
        bet[key] = val;
        if ($(this).hasClass('chip')) {
            chips.credit();
            $(this).removeClass('chip');
            bet['action'] = 'remove';
            socket.send({
                bet: {
                    action: 'remove_bet',
                    widget: key,
                    wager: val
                }
            });        
        } else if (chips.chip_count) {
            chips.debit();                
            $(this).addClass('chip');
            socket.send({
                bet: {
                    action: 'add_bet',
                    widget: key,
                    wager: val
                }
            });  
        } else {
alert('Please purchase additional chips.');        
        }
    });

    socket.connect().on('message', function (msg) {
console.log(msg);
        if (msg.client_id) {
            user.client_id = msg.client_id;
        }
        if (msg.players_arr) {
            document.getElementById('players').innerHTML = msg.players_arr;
        }
        if (msg.new_chip_count) {
            document.getElementById('chip_count').innerHTML = msg.new_chip_count;
        }
        if (msg.spin) {
            var result = msg.spin;
            clear.flash();
            $('.result').removeClass('result');
            $('#wheel').addClass('spin');
            setTimeout(function () {
                var li_result = document.createElement('li')
                    ,   bets = []
                    ,   column = tests.column_test(result.number)
                    ,   which_third = tests.which_third_test(result.number)                
                    ,   which_half = tests.which_half_test(result.number)                
                    ,   winner = false
                    ,   bet
                    ,   l
                    ,   $el
                ;
                li_result.innerHTML = result.number + ' ' + result.color + ' ' + result.parity;
                document.getElementById('results').appendChild(li_result);

//                $('#layout').find('.chip').each(function () {
//                    bets[bets.length] = this.id;
//                });

//                for (bet = 0, l = bets.length; bet < l; bet += 1) {
//                    $el = $(document.getElementById(bets[bet]));
//                    if ($el.hasClass('color')) {
//                        if (bets[bet] === result['color']) {
//                            winner = true;
//                            chips.credit(1);
//                        }
//                    }
//                    if ($el.hasClass('half')) {
//                        if (bets[bet] === which_half) {
//                            winner = true;
//                            chips.credit(1);
//                        }
//                    }
//                    if ($el.hasClass('third')) {
//                        if (bets[bet] === which_third) {
//                            winner = true;
//                            chips.credit(3);
//                        }
//                    }                
//                    if (tests.parity_test(bets[bet])) {
//                        if (bets[bet] === result['parity']) {
//                            winner = true;
//                            chips.credit(2);
//                        }
//                    }
//                    if (bets[bet] === result['number']) {
//                        winner = true;
//                        chips.credit(35);
//                    }
//                }
        
                if (winner) {
                    flash();
                }

                clear.bets();            

                $('#' + result.number + ', #' + result.parity + ', #' + result.color + ', #' + which_half + ', #' + which_third + ', #' + column).addClass('result');

                setTimeout(function () {
                    $('#wheel').removeClass('spin');
                    clear.results();
                }, 4000);
            }, 2000);
        }
    });
    
//    $('#layout').delegate('td', 'click', function () {
//        if ($(this).hasClass('chip')) {
//            chips.credit();
//            $(this).removeClass('chip');
//        } else if (chips.chip_count) {
//            chips.debit();                
//            $(this).addClass('chip');
//            
//        } else {
//            alert('Please take a left at the Native American Motif behind the table and purchase some additional chips.');        
//        }
//    });        

    var user_name = prompt('hey there! what\'s your name?');
    if (user_name) {
        user.user_name = user_name;
        socket.send(user);        
        chips.owner = user_name;
        document.getElementsByTagName('body')[0].className = '';
    }
        
}());
