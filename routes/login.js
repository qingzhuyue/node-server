/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-20 12:10:27
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-09-20 12:39:41
 * @FilePath: /hmosServer/routes/login.js
 * @Description: 
 * Copyright (c) 2024 by ${error: git config user.name & please set dead value or install git} email: ${error: git config user.email & please set dead value or install git}, All Rights Reserved.
 */
var express = require('express');
var router = express.Router();
const db = require("../mysql");
/* GET users listing. */
router.get('/login',async function(req, res, next) {
  // try {  
  //   db.query('SELECT * FROM users', (err, results, fields) => {
  //     if (err) throw err;
  //     // res.send(results);
  //     res.json(results);
  //   }); 
  //   // res.json(rows);  
  // } catch (err) {  
  //   console.error('Database query error:', err);  
  //   res.status(500).send('Database error');  
  // }  

  res.render('index', { title: 'Express;dbfvjkdbfvjkdf' });
});

module.exports = router;
