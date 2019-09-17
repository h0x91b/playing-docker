let express = require('express');
let app = express();

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
	res.end(JSON.stringify(obj, null, '    '));
});

app.listen(3001, ()=>{
	console.log('Listening on 3001');
});