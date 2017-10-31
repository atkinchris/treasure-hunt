const express = require('express')

const app = express()

app.set('port', (process.env.PORT || 8080))
app.use(express.static('public'))

app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { message: 'It\'s alive!' })
})

app.listen(app.get('port'), () => {
  console.log('App listening on port', app.get('port'))
})
