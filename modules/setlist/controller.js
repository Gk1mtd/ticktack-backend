// mongoose user model
const Setlist = require("./setlist.model");
const User = require("../auth/user.model");
const res = require("express/lib/response");

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
/** retrieves the setlists of the current user and return it */
async function getAllSetlists(req, res) {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId).populate("setlists");
    return res.status(200).json(user.setlists);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "couldn't retrieve data, sorry :/" });
  }
}

/** updated Setlist */
async function updateSetlist(req, res) {
  // updates name of setlist
    // Setlist.update(name)
  // updates songs
    //  push new song to songlist
}

// delete
async function deleteSetlist() {}

module.exports = {
  createSetlist,
  getAllSetlists,
  updateSetlist,
  deleteSetlist,
};
