const amqp = require('amqplib/callback_api');
const url = 'amqp://rabbitmq:rabbitmq@localhost:5672';
const queue = 'ufc';

amqp.connect(url, function (error0, connect) {
    if (error0) {
        console.log(error0);
        return;
    }
    connect.createChannel(function (error1, channel) {
        if (error1) {
            console.log(error1);
            return;
        }

        channel.assertQueue(queue, {durable: true});

        console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            const json = JSON.parse(msg.content.toString());
            console.dir(json, {depth: null, colors: true});
        }, {
            noAck: true
        });
    });
});
