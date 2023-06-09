// const createError = require('http-errors');
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const { resizeImage } = require('./utils/resize-image');
// const { getPlayers } = require('./utils/get-players');
// const { screenshot } = require('./utils/screenshot');
import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
// const { scrape } = require('./utils/scraper');

// const upload = multer({ dest: '/tmp/' });

const app = express();

// app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.post('/image', upload.array('files'), async (req, res) => {
// console.log(req.body);
// console.log(req.files);

// if (req.files && req.files[0]) {
//   const file = req.files[0];
//   const resizedImagePath = `${file.path}_small.jpg`;
//   await resizeImage(file.path, resizedImagePath);

//   const players = await getPlayers(resizedImagePath);

//   const results = await Promise.all(
//     players.map(async (player) => {
//       const price = await scrape(player.url);
//       return {
//         name: player.name,
//         price: price && price.length ? price[0] : 0,
//         url: player.url,
//       };
//     })
//   );

//   // remove uploaded files
//   fs.unlinkSync(file.path);
//   fs.unlinkSync(resizedImagePath);

//   console.log('players', results);
//   return res.json(results);
// }

//   return res.json({ done: true });
// });

app.post('/', async (req, res) => {
  const LOCAL_CHROME_EXECUTABLE =
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto('https://github.com');

  res.send('hello');

  // const browser = await puppeteer.launch({
  //   executablePath,
  //   args: edgeChromium.args,
  //   headless: false,
  // })

  // const page = await browser.newPage()
  // await page.goto('https://github.com')

  // res.send('hello')
});

// app.post('/', upload.array('files'), async (req, res) => {
//   if (req.files && req.files[0]) {
//     const file = req.files[0];
//     console.log('xxx', file);

//     await screenshot('https://futwiz.com');
//     // const resizedImagePath = `${file.path}_small.jpg`;
//     // await resizeImage(file.path, resizedImagePath);

//     // const players = await getPlayers(file.path);
//     // const players = await getPlayers(resizedImagePath);

//     // const results = await Promise.all(
//     //   players.map(async (player) => {
//     //     const price = await scrape(player.url);
//     //     return {
//     //       name: player.name,
//     //       price: price && price.length ? price[0] : 0,
//     //       url: player.url,
//     //     };
//     //   })
//     // );

//     // // remove uploaded files
//     // fs.unlinkSync(file.path);
//     // fs.unlinkSync(resizedImagePath);

//     // console.log('players', results);
//     // return res.json(results);
//     return res.json({ done: false });
//   }

//   return res.json({ done: true });
// });

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;
