var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// 自定義路由
var indexRouter = require('./routes/index');
var mCalendarRouter = require('./routes/mCalendar');
var mCostCoinsRouter = require('./routes/mCostCoins');
var mGroupRouter = require('./routes/mGroup');
var mIndexRouter = require('./routes/mIndex');
var mMemberRouter = require('./routes/mMember');
var mNewGroupRouter = require('./routes/mNewGroup');
var mNewOrderRouter = require('./routes/mNewOrder');
var mNewOrder_2Router = require('./routes/mNewOrder_2');
var mNewVoteRouter = require('./routes/mNewVote');
var mNewVote_2Router = require('./routes/mNewVote_2');
var mNoticeRouter = require('./routes/mNotice');
var mOrderRouter = require('./routes/mOrder');
var mOrderListRouter = require('./routes/mOrderList');
var mSaveCoinsRouter = require('./routes/mSaveCoins');
var mSiderRouter = require('./routes/mSider');
var mVoteRouter = require('./routes/mVote');
var mVoteListRouter = require('./routes/mVoteList');
var sCommentRouter = require('./routes/sComment');
var sInformationRouter = require('./routes/sInformation');
var sNoticeRouter = require('./routes/sNotice');
var sOrderRouter = require('./routes/sOrder');
var sProductRouter = require('./routes/sProduct');
var sStatRouter = require('./routes/sStat');
var deleteRouter = require('./routes/delete');

const { state } = require('./model/db');
const db = require('./model/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session設定
app.use(session({
    secret: '237498732943284sdfds',
    resave: false,
    saveUninitialized: true
}));


// use自定義
app.use('/', indexRouter);
app.use('/mCalendar', mCalendarRouter);
app.use('/mCostCoins', mCostCoinsRouter);
app.use('/mGroup', mGroupRouter);
app.use('/mIndex', mIndexRouter);
app.use('/mMember', mMemberRouter);
app.use('/mNewGroup', mNewGroupRouter);
app.use('/mNewOrder', mNewOrderRouter);
app.use('/mNewOrder_2', mNewOrder_2Router);
app.use('/mNewVote', mNewVoteRouter);
app.use('/mNewVote_2', mNewVote_2Router);
app.use('/mNotice', mNoticeRouter);
app.use('/mOrder', mOrderRouter);
app.use('/mOrderList', mOrderListRouter);
app.use('/mSaveCoins', mSaveCoinsRouter);
app.use('/mSider', mSiderRouter);
app.use('/mVote', mVoteRouter);
app.use('/mVoteList', mVoteListRouter);
app.use('/sComment', sCommentRouter);
app.use('/sInformation', sInformationRouter);
app.use('/sNotice', sNoticeRouter);
app.use('/sOrder', sOrderRouter);
app.use('/sProduct', sProductRouter);
app.use('/sStat', sStatRouter);
app.use('/delete', deleteRouter);


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