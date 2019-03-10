const express = require('express');
const app = express();
const path = require('path');

var compression = require('compression');
app.use(compression());

app.use(express.static(__dirname + "/dist",{ maxage: '365d' }));

// app.use(express.static(path.join(__dirname,"Public","images")))

// app.use(express.static('Public'));
app.set('view engine','ejs');
app.set('views','./dist');


app.listen(process.env.PORT || 3500, function(){
    console.log('Server started!');
})

app.get('*', function(req,res){
    res.render(path.join(__dirname,"dist","index"));
})

