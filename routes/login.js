/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-20 12:10:27
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-10-02 00:17:34
 * @FilePath: /hmosServer/routes/login.js
 * @Description: 
 * Copyright (c) 2024 by ${error: git config user.name & please set dead value or install git} email: ${error: git config user.email & please set dead value or install git}, All Rights Reserved.
 */
var express = require('express');
var router = express.Router();
const createConnection = require("../mysql");
const responseUtils = require("../utils/responseUtils");
const bcrypt = require('bcrypt'); // 用于密码哈希  
const saltRounds = 10; // 密码哈希的盐轮数
const msgMap = {
  success: "登录成功",
  notFind: "用户不存在",
}
/* GET users listing. */
router.post('/login', async function (req, res, next) {
  const { username, password,phone } = req.body;
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
            return res.status(200).json({ message: 'Login successful', user: { username: rows[0].username } });  
        } else {  
            return res.status(401).json({ message: 'Invalid username or password' });  
        }  
    } else {  
        // 用户不存在，注册新用户  
        const hashedPassword = await bcrypt.hash(password, saltRounds);  
        const createTime = new Date();
        await connection.execute('INSERT INTO users2 (username, password,phone,create_time) VALUES (?, ?,?,?)', [username, hashedPassword,phone,createTime]);  

        return res.status(201).json({ message: 'User registered and logged in successfully', user: { username } });  
    }  

    if (rows.length === 0) {
      return res.status(401).json({
        code: 401,
        data: null,
        mes: msgMap.notFind
      });
    }

    const user = results[0];  
  
    // 注意：实际项目中应验证哈希密码  
    if (user.password === password) {  
       responseUtils.success(req, res, next, {
        username: user.username,
        phone:user.phone,
        createTime:user
      }, msgMap.success);
    } else {  
        return res.status(401).json({ message: '用户名或者密码无效' });  
    }  
    // 使用封装的成功响应函数  
    responseUtils.success(req, res, next, null, msgMap.success);
    // 注意：由于我们直接发送了响应，所以通常不需要调用 next()  
    // 如果你需要在发送响应之前执行其他中间件，请确保在发送响应之前调用 next() 
  } catch (error) {
    responseUtils.serviceError(req, res, next, null, "查询失败");
  }
});

module.exports = router;
