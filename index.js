var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

//gpio.setup(7, gpio.DIR_OUT);

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
    app.get('/', function(req, res){ 
        res.render('index',{status: value});
    });
});
gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH);


app.post('/led/on', function(req, res){
gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written True to pin => pin on (1)');
	console.log(path.join(__dirname, 'public'));
	return res.render('index', {status: "Cool!!Led is On"});
    });

});


app.post('/led/off', function(req, res){
gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin => pin off (0)');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "Ohh!! Led is Off"});
    });

});


app.listen(3000, function () {
  console.log('Simple LED Control Server Started on Port: 3000!')
})
