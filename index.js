const express = require('express')
const qs = require('qs')

const app = express()
const buildImageUrl = location => `https://maps.googleapis.com/maps/api/staticmap?${qs.stringify({
  center: location,
  zoom: 16,
  scale: 2,
  style: 'style=feature:all|element:labels|visibility:off',
  size: '180x180',
})}`

app.set('port', (process.env.PORT || 8080))
app.use(express.static('public'))

app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const center = 'Manchester Library, UK'
  const image = buildImageUrl(center)

  res.render('index', {
    clue: 'Dickens, PR4560.A1',
    question: 'P141, L07, W03',
    image,
  })
})

app.listen(app.get('port'), () => {
  console.log('App listening on port', app.get('port'))
})
