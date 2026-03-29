const Album = require("../models/Album")

const getAlbumById= async (req, res)=>{
  try{
    const album =await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Album Not found"});
    res.json(album);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
const searchAlbums = async(req,res)=>{
  try {
    const query = req.query.q;
    if (!query || query.trim()===""){
      return res.status(200).json([]);
    }
    const searchTerm= query.trim();
    const albums= await Album.find({
      title: {$regex: searchTerm, $options: "i"},
    });
    res.status(200).json(albums);
  } catch(error) {
    console.error("Search error:",error);
    res.status(500).json({message:error.message});
  }
};
module.exports={getAlbumById,searchAlbums};