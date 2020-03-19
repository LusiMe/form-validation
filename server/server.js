require('dotenv').config();

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = router;
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const formSchema = new mongoose.Schema({
	firstName: String,
	secondName: String,
	phone: String,
	email: String
});

const Form = mongoose.model('Form', formSchema);

app.use(express.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

const subscribersRouter = require('./routes/subscribers');

// GET method route
app.get('/form', async function(req, res) {
	const filter = {};
	const all = await Form.find(filter);
	return res.json(all);
});

app.get('/form/:id', async function(req, res) {
	const result = await Form.findById(req.params.id);
	return res.json(result);
});

//PUT method route
app.put('/form/:id', async function(req, res) {
	await Form.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, doc) {
		if (err) return res.send(500, { error: err });
		return res.send(200, { msg: 'Succesfully saved.' });
	});
});

// POST method route
app.post('/form', async function(request, response) {
	const sv = new Form({
		firstName: request.body.firstName,
		secondName: request.body.secondName,
		tel: request.body.tel,
		email: request.body.email
	});

	await sv.save((err, doc) => response.json({ _id: doc._id }));
});

app.listen(4000, () => console.log('server started'));
