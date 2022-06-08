var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

//---Customers
router.get('/', function (req, res, next){
    conn.query("SELECT * FROM Customers", (err, customers) => {
        if (err) throw err;
        else {
            conn.query("SELECT * FROM Items", (err, products) => {
                if (err) throw err;
                else {
                    conn.query("SELECT COUNT(*) AS value FROM Customers", (err, customerCount) => {
                        if (err) throw err;
                        else {
                            conn.query("SELECT COUNT(*) AS value FROM Items", (err, productCount) => {
                                if (err) throw err;
                                else {
                                    conn.query("SELECT SUM(price) AS value FROM Items", (err, priceSum) => {
                                        if (err) throw err;
                                        else {
                                            conn.query("SELECT AVG(price) AS value FROM Items", (err, priceAvg) => {
                                                if (err) throw err;
                                                else {
                                                    conn.query("SELECT MAX(quantity) AS value FROM Items", (err, itemMax) => {
                                                        if (err) throw err;
                                                        else {
                                                            conn.query("SELECT MIN(quantity) AS value FROM Items", (err, itemMin) => {
                                                                if (err) throw err;
                                                                else {
                                                                    res.render('index',{
                                                                        customer_table: customers,
                                                                        product_table: products,
                                                                        Customers: customerCount[0].value,
                                                                        Items: productCount[0].value,
                                                                        profit: priceSum[0].value,
                                                                        price_average: priceAvg[0].value,
                                                                        lowest_quant: itemMin[0].value,
                                                                        highest_quant: itemMax[0].value,
                                                                        page_title: 'Welcome to A Store'
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router; 
