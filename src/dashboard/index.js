const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// Handle 404
app.use(function(req, res, next) {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

// Handle error
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    error: err.status,
    message: err.message,
  });
});

const port = process.env.WATCHDOG_PORT;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
