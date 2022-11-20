const QrCode = require('qrcode-reader');
var Jimp = require("jimp");
var fs = require("fs");

const jimpP = (uuid) => {
    return new Promise((resolve, reject) => {
        var Jimp = require("jimp");
        var buffer = fs.readFileSync(`./public/${uuid}.jpeg`);
        Jimp.read(buffer, function (err, image) {
            if (err) {
                console.error(err)
                resolve('')
            }
            resolve(image)
        })
    })
}

const qrDecode = (image) => {
    return new Promise((resolve, reject) => {
        var qr = new QrCode();
        qr.callback = function (err, value) {
            if (err) {
                console.error(err)
                resolve('')
            }
            if (value) {
                resolve(value.result)
            }
        };
        qr.decode(image.bitmap);
    })
}

const getTagFromBarcode = async (uuid) => {
    const image = await jimpP(uuid);
    const res = await qrDecode(image)
    return res
}

module.exports = { getTagFromBarcode }