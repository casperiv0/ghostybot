const { model, Schema, models } = require('mongoose');

const PlaylistSchema = new Schema({
    user: { type: Object, required: true},
    playlists: { type: Array, required: true }
});

module.exports = models.Playlists || model('Playlists', PlaylistSchema);