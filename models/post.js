const mongoose = require('mongoose');
const Consult = require('./consult');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('upload', 'upload/w_200'); //use cloudinary transformation API to create thumbnails of width 200 px
});
const PostSchema = new Schema({
    title: String,
    description: String,
    images: [ImageSchema],  
    //Is there a speci
    //could use this URL typehttps://www.npmjs.com/package/mongoose-type-urlal type fro url
    //should also check to see if theres an easy way to upload files to a site
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    consults: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Consult'
        }
    ]
});

PostSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Consult.deleteMany({
            _id: {
                $in: doc.consults
            } //delete all reviews where their id feild is in our document(that was just delted) in its Consults array
        })
    }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;