const qs = window.Qs

const canvas = document.getElementById('map')
const context = canvas.getContext('2d')

canvas.width = 640
canvas.height = 640

const drawGrid = () => {
  const lineWidth = 4
  const gridNumber = 10
  const gridSize = Math.floor((canvas.width - lineWidth) / gridNumber)
  const gridWidth = gridSize * gridNumber + lineWidth
  const gridHeight = gridSize * gridNumber + lineWidth

  const paddingX = Math.floor((canvas.width - gridWidth) / 2)
  const paddingY = Math.floor((canvas.height - gridWidth) / 2)

  for (let x = 0; x <= gridWidth; x += gridSize) {
    const iX = paddingX + x + lineWidth / 2
    context.moveTo(iX, paddingY)
    context.lineTo(iX, gridHeight + lineWidth)
  }

  for (let y = 0; y <= gridHeight; y += gridSize) {
    const iY = paddingY + y + lineWidth / 2
    context.moveTo(paddingX, iY)
    context.lineTo(gridWidth + lineWidth, iY)
  }

  context.strokeStyle = 'white'
  context.lineWidth = lineWidth
  context.stroke()
}

const drawMapGrid = image => {
  const gutterSize = 4
  const gridNumber = 10
  const gridSize = Math.floor((canvas.width - gridNumber * gutterSize) / gridNumber)

  for (let y = 0; y <= gridNumber; y += 1) {
    for (let x = 0; x <= gridNumber; x += 1) {
      context.drawImage(
        image,
        x * gridSize,
        y * gridSize,
        gridSize,
        gridSize,
        x * gridSize + gutterSize * x,
        y * gridSize + gutterSize * y,
        gridSize,
        gridSize
      )
    }
  }
}

const mapOptions = qs.stringify(
  {
    center: '35 Fountain St, Manchester M2 2AN',
    zoom: 16,
    size: `${canvas.width}x${canvas.height}`,
    maptype: 'roadmap',
    key: '',
    style: [
      'feature:poi|visibility:off',
      'feature:poi.park|visibility:on',
      'feature:road|visibility:simplified',
      'feature:administrative|element:labels|visibility:off',
    ],
  },
  { arrayFormat: 'repeat' }
)

const url = `https://maps.googleapis.com/maps/api/staticmap?${mapOptions}`

const image = new Image()
image.onload = () => {
  // context.drawImage(image, 0, 0)
  drawMapGrid(image)
}
image.src = url
