var express = require('express');
var router = express.Router();
var db = require('../model/db');
var session = require('express-session');

/* GET home page. */
let memberId;
let member;
let cost;



// 會員儲值金額
let saveCoin;

// 會員消費金額
let costCoin;

router.get('/', function (req, res, next) {
    memberId = req.session.memberID;
    member = 'select a.`memberID`,a.`memberName`,a.`memberPhoto`,\
count(b.`noticeStatus`) as noticeCount from `member` as a,\
`notice` as b where a.memberID=b.toWhoID and toWhoType=2 \
and b.noticeStatus=1 and memberID='+ memberId;
    cost = 'select b.orderDeadline,d.storeName,\
    c.productName,sum(a.price*a.quality) sum from\
     `orderdetail` as a, `order` as b,`product` as c,\
     `store` as d where a.`orderID`=b.`orderID` \
     and a.`productID`=c.`productID` and c.`storeID`=d.`storeID` and\
      a.memberID='+ memberId + ' group by a.`orderDetailID` DESC';
    saveCoin = 'SELECT SUM(saveCoin) saveSum from savecoin where memberID=' + memberId;
    costCoin = 'SELECT sum( `price`*`quality`) costSum FROM `orderdetail` WHERE memberID=' + memberId;

    console.log("session:", req.session.memberID);
    next();
});

// 會員左側資料
const getMemberData = (req) => {
    return new Promise((resolve, reject) => {
        db.queryAsync(member)
            .then(results => {
                resolve(results);
            })
            .catch(ex => {
                reject(ex);
            });
    })
};

const getCost = (req) => {
    return new Promise((resolve, reject) => {
        db.queryAsync(cost)
            .then(results => {
                resolve(results);
            })
            .catch(ex => {
                reject(ex);
            });
    })
};
// 儲值總額
const getsaveCoinData = (req) => {
    return new Promise((resolve, reject) => {
        db.queryAsync(saveCoin)
            .then(results => {
                resolve(results);
            })
            .catch(ex => {
                reject(ex);
            });
    })
};
// 消費總額
const getcostCoinData = (req) => {
    return new Promise((resolve, reject) => {
        db.queryAsync(costCoin)
            .then(results => {
                resolve(results);
            })
            .catch(ex => {
                reject(ex);
            });
    })
};

//傳資料到表單裡
router.get('/', async (req, res) => {
    newsJSON = JSON.stringify(await getMemberData(req));
    newsJSON1 = JSON.stringify(await getCost(req));
    newsJSON2 = JSON.stringify(await getsaveCoinData(req));
    newsJSON3 = JSON.stringify(await getcostCoinData(req));
    res.render('mCostCoins', {
        mMemberData: newsJSON,
        costCoinListData: newsJSON1,
        saveCoinData: newsJSON2,
        costCoinData: newsJSON3,
        active: 'mSaveCoins'
    });

});







module.exports = router;
