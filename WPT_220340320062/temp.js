
const express = require('express');
const app = express();
const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'wpt',
	portno: 3306
});

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

app.get('/getdetails', (req, res) => {
	connection.query('select * from book where bookid=?', [req.query.bookid], (err, rows) => {
		if (err) {
			console.log("Something went wrong...!");
		} else {
			if (rows.length > 0) {
				res.send(rows[0]);
				console.log("Details send.."); //Maintaing log on server..
			} else {
				res.send(true);
			}
		}
	});
});

app.get('/updatedetails', (req, res) => {
	connection.query('update book set bookname=?, price=? where bookid=?', [req.query.bookname, req.query.bookprice, req.query.bookid], (err, rows) => {
		if (err) {
			console.log("Error in update query...!");
		} else {
			if (rows.affectedRows == 0) {
				res.send(false);
				console.log("Failed to update..!"); //Maintaing log on server..
			} else {
				res.send(true);
				console.log("Details updated..."); //Maintaing log on server..
			}
		}
	});
});

app.listen(8081, function () {
	console.log("server listening at port 8081...");
});