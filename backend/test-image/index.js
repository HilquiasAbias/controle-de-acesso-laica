const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

app.post('/upload', upload.single('imagem'), (req, res) => {
  res.send('ok')
})

app.listen(6000)

