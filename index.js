const express = require('express')
const qs = require('qs')
const bodyParser = require('body-parser')
const compression = require('compression')

const questions = require('./data/questions.json')
const teams = require('./data/teams.json')

const app = express()
const normalise = text => String(text).toLowerCase().replace(/[^a-z0-9]/g, '')
const buildImageUrl = location => `https://maps.googleapis.com/maps/api/staticmap?${qs.stringify({
  center: location,
  zoom: 16,
  scale: 2,
  style: 'style=feature:all|element:labels|visibility:off',
  size: '180x180',
  key: 'AIzaSyCeRXyZCLeZq2JVoxL1nHn5jzIuMajxwT0',
})}`

app.set('port', (process.env.PORT || 8080))
app.use(compression())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('startpage')
})

app.post('/', (req, res) => {
  const { teamId } = req.body
  const team = teams[normalise(teamId)]
  const destination = !team ? '/' : `/${team.firstQuestion}`

  res.redirect(destination)
})

app.get('/:questionId', (req, res) => {
  const { questionId } = req.params
  const { location, clue, question } = questions[normalise(questionId)]
  const image = buildImageUrl(location)

  res.render('index', { clue, question, image })
})

app.post('/:questionId', (req, res) => {
  res.json({
    question: req.params.questionId,
    body: req.body,
  })
})

app.listen(app.get('port'), () => {
  console.log('App listening on port', app.get('port'))
})
