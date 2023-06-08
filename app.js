const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { resizeImage } = require('./utils/resize-image');
const { getPlayers } = require('./utils/get-players');
const { scrape } = require('./utils/scraper');

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/image', upload.array('files'), async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  if (req.files && req.files[0]) {
    const file = req.files[0];
    const resizedImagePath = `${file.path}_small.jpg`;
    await resizeImage(file.path, resizedImagePath);

    const players = await getPlayers(resizedImagePath);

    const results = await Promise.all(
      players.map(async (player) => {
        const price = await scrape(player.url);
        return {
          name: player.name,
          price: price && price.length ? price[0] : 0,
          url: player.url,
        };
      })
    );

    // remove uploaded files
    fs.unlinkSync(file.path);
    fs.unlinkSync(resizedImagePath);

    console.log('players', results);
    return res.json(results);
  }

  return res.json({ done: true });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
