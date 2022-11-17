const axios = require('axios')
const htmlparser2 = require("htmlparser2");
const CSSselect = require("css-select");
const _ = require("lodash");
const fs = require('fs').promises;
const uuid = require('uuid');


const fetchContentFronYandex = async (imgUrl) => {

    const url = 'https://yandex.ru/images/search'

    const { data } = await axios.get(url,
        {
            params: {
                rpt: 'imageview',
                url: 'https://www.holidayshopbd.com/wp-content/uploads/2021/05/potato.jpg'
            }
        }
    );
    return data
}

getTagListFromHtml = (html) => {
    const dom = htmlparser2.parseDocument(html)
    const sentances = CSSselect.selectAll('.CbirTags .Tags-Wrapper a > span', dom).map(item => item.children.at(0).data)
    const tags = sentances.map(sentance => sentance.split(' ')).flat()
    return tags
}

const getMostFrequantTag = (tags) => {
    var allTags = [];
    _.chain(tags.join(' '))
        .split(" ")
        .remove(function (f) { return f.length > 2; })  // removes pronouns
        .countBy()
        .forEach(function (n_value, n_key) {
            allTags.push({ tag: n_key, freq: n_value })
        })
        .value()
    const ans = allTags.sort((a, b) => b.freq - a.freq).at(0)?.tag

    return ans
}


const getTagsFromImage = async (imgUrl) => {

    const html = await fetchContentFronYandex(imgUrl)
    const tags = getTagListFromHtml(html)
    const ans = getMostFrequantTag(tags)

    return ans
}

//// filesystem functions
const saveImage = async (base64) => {
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
    const id = uuid.v4()
    await fs.writeFile(`./public/${id}.jpeg`, base64Data, 'base64')
    return id
}

const removeImage = async (id) => {
    await fs.rm(`./public/${id}.jpeg`)
}

module.exports = { getTagsFromImage, saveImage,removeImage }