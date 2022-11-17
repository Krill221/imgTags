const express = require('express')
const cors = require('cors')
const { saveImage, getTagsFromImage, removeImage } = require('./utils')

const port = process.env.PORT || 3001;
const app = express()
let corsOptions = {
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions))
app.use(express.json({ type: ['application/json', 'application/csp-report'] }))
app.use(express.static('public'))

app.get('/ping', async (req, res) => {
    res.send('pong')
})

app.post('/', async (req, res) => {

    const imgBase64 = req.body.params.img

    const uuid = await saveImage(imgBase64)

    const ans = await getTagsFromImage(`https://imgtags.onrender.com/${uuid}.jpeg`)

    await removeImage(uuid)
    res.send(uuid)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})