let express = require('express');
let app = express();
let fs = require('fs');

app.get('/', (req, res) => {
	let obj = {
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