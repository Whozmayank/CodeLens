import Explanation from "../models/Explanation.js";


//  Get user history
export const getHistory = async (req, res) => {
  try {
    const history = await Explanation.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};


export const deleteHistory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const item = await Explanation.findById(id);
  
      if (!item) {
        return res.status(404).json({ message: "Not found" });
      }
  
      // 🔒 Ensure user owns this history
      if (item.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      await item.deleteOne();
  
      res.json({ message: "Deleted successfully" });
  
    } catch (error) {
      res.status(500).json({ message: "Delete failed" });
    }
  };