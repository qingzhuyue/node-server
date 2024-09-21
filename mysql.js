/*
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-09-20 11:49:48
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-09-21 15:49:42
 * @FilePath: /hmosServer/mysql.js
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
 */
const mysql = require('mysql2/promise');  
// 数据库配置  
const db = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '12345678',  
  database : 'hm'  
});  

async function createConnection() {  
  try {  
      const connection = await mysql.createConnection({  
          host: 'localhost',  
          user: 'root',  
          password: '12345678',  
          database: 'hm'  
      });  
      console.log('MySQL Connected...');  
      return connection;  
  } catch (error) {  
      console.error('Error connecting to MySQL:', error);  
  }  
} 

module.exports = createConnection;