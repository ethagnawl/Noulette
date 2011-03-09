var html_template = "\
<html>\
<head>\
    <title>{{title}}</title>\
	<meta charset='UTF-8'>\
    <link rel='stylesheet' type='text/css' href='/pub/css/noulette.css' media='all' />\
    <script src='/pub/js/head.js'></script>\
</head>\
<body>\
    <h1>noulette</h1>\
    <div id='flash'></div>\
    <button id='buy_more_chips'>buy more chips</button>\
    <button id='spin'>spin!</button>\
    <ul id='chips'>\
        <li>Chip Stack</li>\
    </ul>\
    <ul id='results'>\
        <li>Results</li>\
    </ul>\
    <div id='layout'>\
        <div id='wheel'></div>\
        <table id='main_table'>\
            <tr>\
	            <td id='0' class='number'>0</td>\
	            <td id='00' class='number'>00</td>\
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
        <table>\
	        <tr>\
	            <td id='1_12' class='third'>1st 12</td>\
                <td id='13_24' class='third'>2nd 12</td>\
                <td id='25_36' class='third'>3rd 12</td>\
	        </tr>\
        </table>\
        <table>\
	        <tr>\
                <td id='1_18' class='half'>1-18</td>\
                <td class='parity' id='even'>Even</td>\
                <td id='red' class='red color'>Red</td>\
                <td id='black' class='black color'>Black</td>\
                <td class='parity' id='odd'>Odd</td>\
                <td id='19_36' class='half'>19-36</td>\
	        </tr>\
        </table>\
    </div>\
    <script>\
    head.js('https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js', '/pub/js/noulette.js');\
    </script>\
</body>\
</html>\
";

var sys = require('sys')
    ,   fs = require('fs')
    ,   Url = require('url')
    ,   http = require('http')
    ,   querystring = require('querystring')
    ,   static = require('node-static')
    ,   file = new(static.Server)('./pub')
    ,   Mustache = require('./mustache')
    ,   view = {
        title: "Noulette"
    }
;


function indexAction(req) {
	return Mustache.to_html(html_template, view);
};

//Very basic routing
var router = {
    "/" : indexAction
};

http.createServer(function (req, res) {
    var request_path = Url.parse(req.url).pathname;
    req.addListener('end', function () {
    if (request_path.indexOf('/pub') !== -1) {
//        file.serve(req, res)
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(fs.readFileSync('/var/www/roulette/' + request_path, 'utf8')); // <--- add this line
        res.end();
    }
  });
    if (request_path === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = indexAction(req);
        res.end(html);
    } else if (request_path.indexOf('/pub') !== -1) {
console.log('trying to serve up: ' + request_path);
//        res.end(file.serve(req, res));
    } else {
        res.end('sorry');
    } 
}).listen(8000);
