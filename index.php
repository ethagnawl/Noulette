<!DOCTYPE HTML>
<html lang="en-us" dir="ltr">
<head>
	<title>Noulette</title>
	<meta charset="UTF-8">
<?/*
    <link rel="stylesheet" type="text/css" href="./pub/css/yui/reset-min.css" media="all" />
    <link rel="stylesheet" type="text/css" href="./pub/css/yui/base-min.css" media="all" />
    <link rel="stylesheet" type="text/css" href="./pub/css/yui/fonts-min.css" media="all" />
    <link rel="stylesheet" type="text/css" href="./pub/css/yui/grids-min.css" media="all" />
*/?>
    <link rel="stylesheet" type="text/css" href="./noulette.css" media="all" />
    <script src='./head.js'></script>
</head>
<body class='yui3-g'>
    <hi>noulette</hi>
    <div id="flash"></div>
    <button id="spin">spin!</button>
    <div class="yui3-u-1">
        <ul id="chips" class='yui3-u-1-2'>
	        <li>Stacks</li>
        </ul>
        <ul id="results" class='yui3-u-1-2'>
	        <li>Results</li>
        </ul>
    </div>
    <div id='layout'>
        <div id="wheel"></div>
        <table id='main_table'>
            <tr>
	            <td id='0' class='number'>0</td>
	            <td id='00' class='number'>00</td>
            </tr>
            <tr>
	            <td id='1' class='red number'>1</td>
	            <td id='2' class='black number'>2</td>
	            <td id='3' class='red number'>3</td>
            </tr>
            <tr>
	            <td id='4' class='black number'>4</td>
	            <td id='5' class='red number'>5</td>
	            <td id='6' class='black number'>6</td>
            </tr>
            <tr>
	            <td id='7' class='red number'>7</td>
	            <td id='8' class='black number'>8</td>
	            <td id='9' class='red number'>9</td>
            </tr>
            <tr>
	            <td id='10' class='black number'>10</td>
	            <td id='11' class='black number'>11</td>
	            <td id='12' class='red number'>12</td>
            </tr>
            <tr>
	            <td id='13' class='black number'>13</td>
	            <td id='14' class='red number'>14</td>
	            <td id='15' class='black number'>15</td>
            </tr>
            <tr>
	            <td id='16' class='red number'>16</td>
	            <td id='17' class='black number'>17</td>
	            <td id='18' class='red number'>18</td>
            </tr>
            <tr>
	            <td id='19' class='black number'>19</td>
	            <td id='20' class='black number'>20</td>
	            <td id='21' class='red number'>21</td>
            </tr>
            <tr>
	            <td id='22' class='black number'>22</td>
	            <td id='23' class='red number'>23</td>
	            <td id='24' class='black number'>24</td>
            </tr>
            <tr>
	            <td id='25' class='red number'>25</td>
	            <td id='26' class='black number'>26</td>
	            <td id='27' class='red number'>27</td>
            </tr>
            <tr>
	            <td id='28' class='red number'>28</td>
	            <td id='29' class='black number'>29</td>
	            <td id='30' class='red number'>30</td>
            </tr>
            <tr>
	            <td id='31' class='black number'>31</td>
	            <td id='32' class='red number'>32</td>
	            <td id='33' class='black number'>33</td>
            </tr>
            <tr>
	            <td id='34' class='red number'>34</td>
	            <td id='35' class='black number'>35</td>
	            <td id='36' class='red number'>36</td>
            </tr>
            <tr>
	            <td id='column_1'>2-1</td>
	            <td id='column_2'>2-1</td>
	            <td id='column_3'>2-1</td>
            </tr>
        </table>
        <table>
	        <tr>
	            <td id='1_12' class='third'>1st 12</td>
                <td id='13_24' class='third'>2nd 12</td>
                <td id='25_36' class='third'>3rd 12</td>
	        </tr>
        </table>
        <table>
	        <tr>
                <td id='1_18' class='half'>1-18</td>
                <td class='parity' id='even'>Even</td>
                <td id='red' class='red color'>Red</td>
                <td id='black' class='black color'>Black</td>
                <td class='parity' id='odd'>Odd</td>
                <td id='19_36' class='half'>19-36</td>
	        </tr>
        </table>
    </div>
    <script>
    head.js('https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js', './noulette.js');
    </script>	
</body>
</html>
