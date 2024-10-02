/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-20 12:10:27
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-10-02 19:10:50
 * @FilePath: /hmosServer/routes/login.js
 * @Description: 
 * Copyright (c) 2024 by ${error: git config user.name & please set dead value or install git} email: ${error: git config user.email & please set dead value or install git}, All Rights Reserved.
 */
var express = require('express');
var router = express.Router();
const createConnection = require("../mysql");
const responseUtils = require("../utils/responseUtils");
const bcrypt = require('bcrypt'); // 用于密码哈希  
const jwt = require('jsonwebtoken');
const saltRounds = 10; // 密码哈希的盐轮数
const msgMap = {
  success: "登录成功",
  notFind: "用户不存在",
}

// 密钥（在实际应用中，请确保密钥的安全存储）  
const SECRET_KEY = '32r093hfudihvsdoifhvldksfvnakjesbvflsedfblsedfb';

const createTime = new Date();

/* GET users listing. */
router.post('/login', async function (req, res, next) {
  const { username, password, phone } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '用户名或者密码错误' });
  }
  try {
    const connection = await createConnection();

    const [rows] = await connection.execute(
      'SELECT * FROM users2 WHERE username = ?',
      [username]
    );

    // 检查用户是否存在  

    if (rows.length > 0) {
      // 用户已存在，验证密码  
      const hashedPassword = rows[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (isMatch) {
        // 生成 token  
        const token = jwt.sign({ id: rows[0].phone, username: rows[0].username, createTime }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
          code: 200,
          msg: msgMap.success,
          data: {
            username: rows[0].username,
            phone: rows[0].phone,
            token
          }
        });
      } else {
        return res.status(400).json({
          code: 401,
          data: null,
          msg: '用户名或者密码错误'
        });
      }
    } else {
      // 用户不存在，注册新用户  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const token = jwt.sign({ phone, username: username, createTime }, SECRET_KEY, { expiresIn: '1h' });

      await connection.execute('INSERT INTO users2 (username, password,phone,create_time) VALUES (?, ?,?,?)', [username, hashedPassword, phone, createTime]);

      return res.status(200).json({
        code: 200,
        msg: msgMap.success,
        data: { username, phone, token }
      });
    }

  } catch (error) {
    responseUtils.serviceError(req, res, next, null, "查询失败");
  }
});

module.exports = router;
