var express = require('express');
var router = express.Router();
const createConnection = require("../mysql");
const responseUtils = require("../utils/responseUtils")

/* GET users listing. */
router.get('/',async function(req, res, next) {
  
  try {
    const connection = await createConnection();
    const { pageNum, pageSize } = req.query; 
    const offset = (pageNum - 1) * pageSize;  
    const [rows, fields] = await connection.query(
      `SELECT * FROM users2 ORDER BY id ASC LIMIT ${pageSize} OFFSET ${offset}`
    );
    // 使用封装的成功响应函数  
    responseUtils.success(req, res, next, rows, "查询成功");
    // 注意：由于我们直接发送了响应，所以通常不需要调用 next()  
    // 如果你需要在发送响应之前执行其他中间件，请确保在发送响应之前调用 next() 
  } catch (error) {
    responseUtils.serviceError(req, res, next,null, "查询失败");
  }
});

module.exports = router;
