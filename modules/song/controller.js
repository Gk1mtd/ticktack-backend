// mongoose user model
const Setlist = require("../setlist/setlist.model");
const Song = require("./song.model");

/** create new setlist and adds it to the user*/
async function createSong(req, res) {
  try {
    const { setlistId, name, bpm, note } = req.body;
    const newSong = await Song.create({ name, bpm, note });
    await Setlist.findByIdAndUpdate(setlistId, {
      $push: { songs: newSong._id },
    });
    return res
      .status(200)
      .json({ message: "Song created successfully ♫", newSongId: newSong._id });
  } catch (error) {
    return res.status(500).json({ message: "Cannot create Song ⚠" });
  }
}
/** retrieves the song of the current setlist and return it */
async function getSong(req, res) {
  try {
    const { songId } = req.body;
    const song = await Song.findById(songId);
    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json({ message: "Cannot get Song ⚠" });
  }
}

/** get all Songs */
async function getAllSongs(req, res) {
  try {
    const songs = await Song.find();
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ message: "Cannot get Songs ⚠" });
  }
}

/** updates a song */
async function updateSong(req, res) {
  try {
    const { songId, name, bpm, note } = req.body;
    await Song.findByIdAndUpdate(songId, { name, bpm, note });
    return res.status(200).json({ message: "Song update was successful ♫♫♫" });
  } catch (error) {
    return res.status(500).json({ message: "Cannot update Song ⚠" });
  }
}

/** deletes a song and deletes it from the setlist reference as well*/
async function deleteSong(req, res) {
  try {
    const { songId, setlistId } = req.body;
    /** deletes song from db */
    await Song.findByIdAndDelete(songId);
    /** find the setlist in which the song is referenced in and removes song from its songs array */
    await Setlist.findByIdAndUpdate(setlistId, { $pull: { songs: songId } });
    return res.status(200).json({ message: "Song deleted successfully ♲" });
  } catch (error) {
    return res.status(500).json({ message: "Cannot delete Song ⚠" });
  }
}

module.exports = {
  createSong,
  updateSong,
  deleteSong,
  getAllSongs,
  getSong,
};
