const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.get('socket', () => {
  
})


export default router
