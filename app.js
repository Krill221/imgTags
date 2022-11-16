const express = require('express')
const cors = require('cors')
const { saveImage, getTagsFromImage, removeImage } = require('./utils')


const app = express()
let corsOptions = {
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions))
app.use(express.json({ type: ['application/json', 'application/csp-report'] }))
app.use(express.static('public'))



const port = 4000

app.post('/', async (req, res) => {

    //const imgBase64 = req.body.params.img

    //const uuid = await saveImage(imgBase64)

    //await removeImage(uuid)
    //const ans = await getTagsFromImage('img')
    res.send('ans')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})