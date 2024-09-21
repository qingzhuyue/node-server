/*
 * @Author: qingzhuyue qingzhuyue@foxmail.com
 * @Date: 2024-09-21 17:51:05
 * @LastEditors: qingzhuyue qingzhuyue@foxmail.com
 * @LastEditTime: 2024-09-21 18:02:45
 * @FilePath: /hmosServer/utils/responseUtils.js
 * @Description: 
 * Copyright (c) 2024 by ${qingzhuyue} email: ${qingzhuyue@foxmail.com}, All Rights Reserved.
 */
// responseUtils.js  
  
function createResponse(statusCode) {  
  return function(req, res, next,data = null, message = '') {  
      // 设置响应体  
      const responseBody = {  
          code: statusCode,  
          data: data,  
          mes: message,  
      };  

      // 设置响应状态码  
      res.status(statusCode);  

      // 发送响应  
      res.json(responseBody);  
  };  
}  

// 导出函数  
module.exports = {  
  success: createResponse(200),  
  created: createResponse(201),  
  badRequest: (message = 'Bad Request', data = null) => createResponse(400, data, message),  
  notFound: (message = 'Not Found', data = null) => createResponse(404, data, message),  
  serviceError:createResponse(500)
  // 可以根据需要添加更多状态码的处理  
};