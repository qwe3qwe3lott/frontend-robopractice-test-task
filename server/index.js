// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

app.get('/api/users', (req, res) => {
	res.send(
		// eslint-disable-next-line no-undef
		require('./data.json')
	);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
