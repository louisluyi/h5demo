/**
 * Created by luyi on 2016/5/21.
 */
'use strict';

let argv = require('./config/argv');
let express = require('express');
let mustacheExpress = require('mustache-express')();
let lruCache = require('lru-cache');
let app = express();
let env = process.argv ? process.argv['env'] : null;
mustacheExpress.cache = lruCache(
    {
        max: 50000,
        length: function (n) { return n.data.length },
        maxAge: 0
    }
);

//static directory
['css', 'html', 'img', 'js'].forEach(function(name){
    app.use('/' + name, express.static(name, {
        maxAge: 24*3600*1000*365
    }));
});

app.engine('mustache', mustacheExpress);
app.set('view engine', 'mustache');
app.set('view cache', false);
app.set('views', __dirname + '/mustache');

app.get('/mustache/:path', function(req, res){
    var result = {};
    result.timestamp = new Date().getTime();
    if(req.header('user-agent').indexOf('Chrome/38.0.0.0') > 0 && argv['env'] === 'dev'){
        result.debug = true;
    }
    res.render(req.params.path, result);
});

app.listen(8088, function(){
    console.log('express begin');
});
