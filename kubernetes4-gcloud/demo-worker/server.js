let express = require('express');
let app = express();
let fs = require('fs');

let date = (new Date()).toString();
let isReady = false;

setTimeout(()=>{
	isReady = true;
}, 90000);

app.get('/healthz', (req, res)=>{
	console.log('/healthz', isReady);
	if(!isReady) {
		res.status('503');
		res.end('not ready yet');
	} else {
		res.end('ok');
	}
});

app.get('/', (req, res) => {
	res.end('Started on ' + date);
});

app.get('/hello', (req, res) => {
	let obj = {
		workers: [],
		POD_IP: process.env.POD_IP || '<not set>',
		DB_HOST: process.env.DB_HOST || '<not set>',
		DB_PASS: process.env.DB_PASS || '<not set>',
		DB_USER: process.env.DB_USER || '<not set>',
		rest: {
			...process.env
		},
	};

	fs.stat('/var/log/app/', (err, stat)=>{
		if(err || !stat.isDirectory()) return;
		fs.appendFile('/var/log/app/log.txt', `${new Date()} - request to /\n`, (err) => {
			if (err) throw err;
		});
	});

	res.end(JSON.stringify(obj, null, '    '));
});

app.listen(3001, ()=>{
	console.log('Listening on 3001');
});