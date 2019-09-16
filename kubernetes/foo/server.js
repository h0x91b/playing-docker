let express = require('express');
let app = express();

app.get('/', (req, res) => {
	res.end('foo')
});

app.listen(3001, ()=>{
	console.log('Listening on 3001');
});