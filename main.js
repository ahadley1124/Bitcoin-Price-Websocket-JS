const WebSocket = require('websocket').w3cwebsocket;
var ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
var firstPrice = 0;
ws.onopen = function() {
    ws.send(JSON.stringify({
        type: 'subscribe',
        product_ids: ['BTC-USD'],
        channels: ['ticker']
    }));
    console.log('connected. Time is: ' + new Date());
};
ws.onmessage = function(e) {
    var data = JSON.parse(e.data);
    if (data.type == 'ticker') {
        var price = data.price;
        if (firstPrice == 0) {
            firstPrice = price;
        }
        console.log((price - firstPrice).toFixed(2));
    }
};

ws.onclose = function() {
    console.log('reconnecting...');
    ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
    ws.onopen = function() {
        ws.send(JSON.stringify({
            type: 'subscribe',
            product_ids: ['BTC-USD'],
            channels: ['ticker']
        }));
    };
};
