(function () {
    var column_1 = [0, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
        ,   column_2 = [0, 00, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
        ,   column_3 = [00, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
    //  first 12
    //  second 12
    //  third 12
    //  1-18
    //  19-36
        ,   numbers = {
            nums: [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, 00, 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2],
            '0': {
                color: 'green',
                parity: 'even'
            },
            '28': {
                color: 'red',
                parity: 'even'    
            }, 
            '9': {
                color: 'red',
                parity: 'odd'    
            },
            '26': {
                color: 'black',
                parity: 'even'    
            },
            '30': {
                color: 'red',
                parity: 'even'    
            },
            '11': {
                color: 'black',
                parity: 'odd'    
            },
            '7': {
                color: 'red',
                parity: 'odd'    
            },
            '20': {
                color: 'black',
                parity: 'even'    
            },
            '32': {
                color: 'red',
                parity: 'even'    
            },
            '17': {
                color: 'black',
                parity: 'odd'        
            },
            '5': {
                color: 'red',
                parity: 'odd'        
            },
            '22': {
                color: 'black',
                parity: 'even'    
            },
            '34': {
                color: 'red',
                parity: 'even'    
            },
            '15': {
                color: 'black',
                parity: 'odd'    
            },
            '3': {
                color: 'red',
                parity: 'odd'    
            },
            '24': {
                color: 'black',
                parity: 'even'    
            },
            '36': {
                color: 'red',
                parity: 'even'    
            },
            '13': {
                color: 'black',
                parity: 'odd'    
            },
            '1': {
                color: 'red',
                parity: 'odd'    
            },
            '00': {
                color: 'green',
                parity: 'even'        
            },
            '27': {
                color: 'red',
                parity: 'odd'    
            },
            '10': {
                color: 'black',
                parity: 'even'    
            },
            '25': {
                color: 'red',
                parity: 'odd'    
            },
            '29': {
                color: 'black',
                parity: 'odd'    
            },
            '12': {
                color: 'red',
                parity: 'even'    
            },
            '8': {
                color: 'black',
                parity: 'even'    
            },
            '19': {
                color: 'black',
                parity: 'odd'    
            },
            '31': {
                color: 'black',
                parity: 'odd'    
            },
            '18': {
                color: 'red',
                parity: 'even'    
            },
            '6': {
                color: 'black',
                parity: 'even'    
            },
            '21': {
                color: 'red',
                parity: 'odd'    
            },
            '33': {
                color: 'black',
                parity: 'odd'    
            },
            '16': {
                color: 'red',
                parity: 'even'    
            },
            '4': {
                color: 'black',
                parity: 'even'    
            },
            '23': {
                color: 'red',
                parity: 'odd'    
            },
            '35': {
                color: 'black',
                parity: 'odd'    
            },
            '14': {
                color: 'red',
                parity: 'even'    
            },
            '2': {
                color: 'black',
                parity: 'even'    
            }
        }
    ;

    function rando(arr) {
	    return Math.floor(Math.random() * arr.length);
    }

    function spin() {
        var result = numbers.nums[rando(numbers.nums)]
            ,   results = {
                number: result.toString()
                ,   color: numbers[result]['color']
                ,   parity: numbers[result]['parity']
            }
        ;
        return results;
    }

    function parity_test(val) {
        return val === 'even' ? true : val === 'odd' ? true : false;
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
        chip_count: 5,
        credit: function (chips) {
            var credit_amount = chips || 1;
            this.chip_count += credit_amount;
        },
        debit: function (chips) {
            var debit_amount = chips || 1;
            this.chip_count -= debit_amount;
        },
        update_chip_count: function () {
            document.getElementById('chip_count').innerHTML = chips.chip_count;
        }
    };

    (function () {
        var chip_count = document.createElement('li');
        chip_count.id = 'chip_count';        
        chip_count.innerHTML = chips.chip_count;
        document.getElementById('chips').appendChild(chip_count);
    }());

    document.getElementById('spin').onclick = function () {
        clear.flash();
        $('.result').removeClass('result');
        if ($('#layout').find('.chip').length) {
            $('#wheel').addClass('spin');
            setTimeout(function () {
                var result = spin()
                    ,   li_result = document.createElement('li')
                    ,   bets = []
                    ,   column = column_1.indexOf(Number(result.number)) !== -1 ? 'column_1' : column_2.indexOf(Number(result.number))!== -1 ? 'column_2' : 'column_3'
                    ,   which_third = Number(result['number']) < 13 ? '1_12' : Number(result['number']) < 25 ? '13_24' : '25_36' 
                    ,   which_half = Number(result['number']) < 19 ? '1_18' : '19_36'
                    ,   winner = false
                    ,   bet
                    ,   l
                    ,   $el
                ;
                li_result.innerHTML = result.number + ' ' + result.color + ' ' + result.parity;
                document.getElementById('results').appendChild(li_result);

                $('#layout').find('.chip').each(function () {
                    bets[bets.length] = this.id;
                });

                for (bet = 0, l = bets.length; bet < l; bet += 1) {
                    $el = $(document.getElementById(bets[bet]));
                    if ($el.hasClass('color')) {
                        if (bets[bet] === result['color']) {
                            winner = true;
                            console.log(chips.chip_count);
                            console.log('you win! - color');
                            chips.credit(1);
                            console.log(chips.chip_count);
                        }
                    }
                    if ($el.hasClass('half')) {
                        if (bets[bet] === which_half) {
                            winner = true;
                            console.log('you win! - half');                        
                            chips.credit(1);
                        }
                    }
                    if ($el.hasClass('third')) {
                        if (bets[bet] === which_third) {
                            winner = true;
                            console.log('you win! - third');                        
                            chips.credit(3);
                        }
                    }                
                    if (parity_test(bets[bet])) {
                        if (bets[bet] === result['parity']) {
                            winner = true;
                            console.log('you win! - parity');
                            chips.credit(2);
                        }
                    }
                    if (bets[bet] === result['number']) {
                        winner = true;
                        console.log('you win! - number');
                        console.log(chips.chip_count);
                        chips.credit(35);
                        console.log(chips.chip_count);
                    }
                }
        
                if (winner) {
                    flash();
                }

                clear.bets();            

                $('#' + result.number + ', #' + result.parity + ', #' + result.color + ', #' + which_half + ', #' + which_third + ', #' + column).addClass('result');

                chips.update_chip_count();

                setTimeout(function () {
                    $('#wheel').removeClass('spin');
                    clear.results();
                }, 4000);
            }, 2000);
                    
        } else {
alert('will someone please place a bet?!');
        }
    };

    $('#layout').delegate('td', 'click', function () {
        if ($(this).hasClass('chip')) {
            chips.credit();
            chips.update_chip_count();
            $(this).removeClass('chip');
        } else if (chips.chip_count) {
            chips.debit();                
            chips.update_chip_count();
            $(this).addClass('chip');
        } else {
alert('Please take a left at the Native American Motif behind the table and purchase some additional chips.');        
        }
    });    
}());
