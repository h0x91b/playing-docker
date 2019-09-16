let express = require('express');
let app = express();

app.get('/', (req, res) => {
	res.end('bar')
});

app.listen(3002, ()=>{
	console.log('Listening on 3002');
});