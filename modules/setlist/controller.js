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
/** retrieves the setlist by id and returns it */
async function getSetlist(req, res) {
  try {
    // gets the id 
    const {setlistId} = req.body;
    console.log("setlist id", setlistId);
    //populate songs to see all song data
    const setlist = await Setlist.findById(setlistId).populate('songs')
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
    const userId = req.session.user.id;
    const user = await User.findById(userId).populate("setlists");
    return res.status(200).json(user.setlists);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "couldn't retrieve data, sorry :/" });
  }
}

/** updates Setlist name */
async function updateSetlist(req, res) {
  try {
    const { name, setlistId } = req.body;
    await Setlist.findByIdAndUpdate(setlistId, {name})
    return res.status(200).json({message: "Update successfull"})
  } catch (error) {
    return res.status(500).json({message: "couldn't update setlist"})
  }
}

/** deletes a setlist */
async function deleteSetlist(req, res) {
  try {
    const { setlistId } = req.body;
    await Setlist.findByIdAndDelete(setlistId)
    return res.status(200).json({message: "deleted successfully"})
  } catch (error) {
    return res.status(500).json({message: "couldn't delete setlist"})

  }
}


module.exports = {
  createSetlist,
  getAllSetlists,
  getSetlist,
  updateSetlist,
  deleteSetlist,
};
