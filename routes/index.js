var express = require('express');
var router = express.Router();
const db = require("../mysql");
/* GET home page. */
router.get('/', function(req, res, next) {
   try {  
    db.query('SELECT * FROM users', (err, results, fields) => {
      if (err) throw err;
      // res.send(results);
      res.json(results);
    }); 
    // res.json(rows);  
  } catch (err) {  
    console.error('Database query error:', err);  
    res.status(500).send('Database error');  
  }  
  // res.render('index', { title: 'Express' });
});

module.exports = router;
