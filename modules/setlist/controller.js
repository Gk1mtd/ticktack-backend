// mongoose user model
const Setlist = require("./setlist.model");
const User = require("../auth/user.model");
const Song = require("../song/song.model");

/** create new setlist and adds it to the user*/
async function createSetlist(req, res) {
  try {
    const { name } = req.body;
    const userId = req.session.user.id;
    /** creates new setlist */
    const newSetlist = await Setlist.create({ name });
    /** adds the new setlist to the user - uses push to not overwrite old values */
    await User.findByIdAndUpdate(userId, {
      $push: { setlists: newSetlist._id },
    });
    return res.status(200).json({ message: "Setlist created!" });
  } catch (error) {
    return res.status(500).json({ message: "Setlist NOT created! Error is: " });
  }
}
/** retrieves the setlist by id and returns it */
async function getSetlist(req, res) {
  try {
    // gets the id via query
    const { setlistId } = req.params;
    //populate songs to see all song data
    const setlist = await Setlist.findById(setlistId).populate("songs");
    return res.status(200).json(setlist);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "couldn't retrieve data, sorry :/" });
  }
}
/** retrieves the setlists of the current user and return it */
async function getAllSetlists(req, res) {
  try {
    // const userId = req.session.user.id;
    const userEmail = req.params.userEmail;
    console.log("userEmail: ", userEmail);
    const user = await User.findOne({ email: userEmail }).populate("setlists");
    return res.status(200).json(user.setlists);
  } catch (error) {
    console.log("ERROR!!!!!: ", error);
    return res
      .status(500)
      .json({ message: "couldn't retrieve data, sorry :/" });
  }
}

/** updates Setlist name */
async function updateSetlist(req, res) {
  try {
    const { name, setlistId } = req.body;
    await Setlist.findByIdAndUpdate(setlistId, { name });
    return res.status(200).json({ message: "Update successfull" });
  } catch (error) {
    return res.status(500).json({ message: "couldn't update setlist" });
  }
}

/** deletes a setlist */
async function deleteSetlist(req, res) {
  try {
    const { setlistId } = req.params;
    /** delete all songs from setlist */
    // get setlist
    const setlist = await Setlist.findById(setlistId);
    // get song ids [of IDs]
    const songs = [...setlist.songs];
    // delete songs
    songs.map(async (song) => {
      await Song.findByIdAndDelete(song._id);
    });
    /** delete setlist itself */
    await Setlist.findByIdAndDelete(setlistId);
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "couldn't delete setlist" });
  }
}

module.exports = {
  createSetlist,
  getAllSetlists,
  getSetlist,
  updateSetlist,
  deleteSetlist,
};
