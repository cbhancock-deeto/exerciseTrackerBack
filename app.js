const express = require('express');
const mongoose = require('mongoose');
const route = require('./Routes/routing');
const cors = require('cors');
const app = express();

mongoose
	.connect('mongodb://localhost:27017/ExerciseApp', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB connection successful'));

app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:8000', 'http://localhost:3000'],
	})
);

app.use('/', route);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
