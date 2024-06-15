const express = require('express');
const app = express();
const port = 3001;

// 1. 추가 외부모듈 설정
var path = require('path');
var indexRouter = require('./routes/index');
// 2. express 추가 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
// 3. index 라우팅
app.use('/', indexRouter);

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(port, () => {
    console.log(`Simple tutorial app is listening on port ${port}`)
});