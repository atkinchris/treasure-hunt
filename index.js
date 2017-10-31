const express = require('express')
const qs = require('qs')
const bodyParser = require('body-parser')

const questions = require('./data/questions.json')

const app = express()
const buildImageUrl = location => `https://maps.googleapis.com/maps/api/staticmap?${qs.stringify({
  center: location,
  zoom: 16,
  scale: 2,
  style: 'style=feature:all|element:labels|visibility:off',
  size: '180x180',
  key: 'AIzaSyCeRXyZCLeZq2JVoxL1nHn5jzIuMajxwT0',
})}`

app.set('port', (process.env.PORT || 8080))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const { id, location, clue, question } = questions.default
  const image = buildImageUrl(location)

  res.render('index', { id, clue, question, image })
})

app.post('/', (req, res) => {
  res.json(req.body)
})

app.listen(app.get('port'), () => {
  console.log('App listening on port', app.get('port'))
})
