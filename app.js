const express = require('express')
const cors = require('cors')
const { saveImage, getTagsFromImage, removeImage } = require('./utils')
const { getTagFromBarcode } = require('./barcode')

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

app.post('/gettags', async (req, res) => {
    let ans = ''
    const imgBase64 = req.body.params.img
    const uuid = await saveImage(imgBase64)
    console.log(uuid)
    ans = await getTagFromBarcode(uuid)
    if(!ans) {
        ans = await getTagsFromImage(`https://imgtags3.onrender.com/${uuid}.jpeg`)
        //ans = await getTagsFromImage(`https://imgtags3.onrender.com/1c25f3cf-757e-41ae-b1a2-4ce256d0b6a2.jpeg`);
        //ans = await getTagsFromImage(`http://localhost:3001/${uuid}.jpeg`)
    }
    await removeImage(uuid)
    res.send(ans)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
