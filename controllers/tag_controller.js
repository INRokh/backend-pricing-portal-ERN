const TagModel = require("../database/models/tag_model")

async function index(req, res) {
    const tags = await TagModel.find({is_active: true})
        .catch(err => res.status(500).send(err));
    res.json(tags);
}

async function create(req, res) {
    let tagObjs = [];
    for (let tagLabel of req.body.tags) {
        tagObjs.push({title: tagLabel});
    }
    const tags = await TagModel.insertMany(tagObjs)
        .catch(err => res.status(500).send(err));
    res.send(tags);
}

async function destroy(req, res) {
    let deletedTags = []
    for(let id of req.body.ids){
        deletedTags.push(await TagModel.findByIdAndUpdate(id, {is_active: false})
            .catch(err => res.status(500).send(err)));
    }
    res.json(deletedTags);
}

async function update(req, res) {
    let updatedTag = [];
    for(let tag of req.body.tags){
        updatedTag.push(await TagModel.findByIdAndUpdate(tag.id, {title: tag.title})
            .catch(err => res.status(500).send(err)));
    }
    res.json(updatedTag);
}

module.exports = {
    index,
    create,
    destroy,
    update
}