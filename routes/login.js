/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-20 12:10:27
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-09-21 18:02:16
 * @FilePath: /hmosServer/routes/login.js
 * @Description: 
 * Copyright (c) 2024 by ${error: git config user.name & please set dead value or install git} email: ${error: git config user.email & please set dead value or install git}, All Rights Reserved.
 */
var express = require('express');
var router = express.Router();
const createConnection = require("../mysql");
const responseUtils = require("../utils/responseUtils")
/* GET users listing. */
router.post('/login', async function (req, res, next) {
  try {
    const connection = await createConnection();
    const { username, phone } = req.body; // 假设你发送了name和age  
    const dateTime = new Date();
    // SQL查询，注意使用占位符防止SQL注入  
    const [rows, fields] = await connection.execute(
      'INSERT INTO users (username, phone,create_time) VALUES (?, ?,?)',
      [username, phone, dateTime]
    );
    const message = "登录成功"
    // 使用封装的成功响应函数  
    responseUtils.success(req, res, next, null, message);
    // 注意：由于我们直接发送了响应，所以通常不需要调用 next()  
    // 如果你需要在发送响应之前执行其他中间件，请确保在发送响应之前调用 next() 
  } catch (error) {
    responseUtils.serviceError(req, res, next, { message: 'Error inserting data', insertedId: rows.insertId });
  }
});

module.exports = router;
