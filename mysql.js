/*
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-09-20 11:49:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-09-20 12:28:53
 * @FilePath: /hmosServer/mysql.js
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
 */
const mysql = require('mysql2');  
// 数据库配置  
const db = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '12345678',  
  database : 'hm'  
});  


module.exports = db;