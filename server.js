const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
app.use(express.static('public'))
const {mergepdfs}  = require('./merge')
const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})
app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files)
   await mergepdfs(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))
    res.redirect("http://localhost:3000/")
   // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})