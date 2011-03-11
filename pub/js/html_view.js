{
    "html_template": "\
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
                            <td id='even class='parity yellow''>Even</td>\
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
        </html>"
}
