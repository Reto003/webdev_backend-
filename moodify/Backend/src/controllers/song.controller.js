const {songModel} = require("../models/song.model")
const id3 = require("node-id3")
// const { uploadFile } = require("../services/storage.service")
const storageService = require("../services/storage.service")

const uploadSong = async (req,res)=>{
  const {mood} = req.body
  const songBuffer = req.file.buffer
  // console.log(songBuffer)

  const tags = id3.read(songBuffer)
  console.log(tags)
  // console.log(req.file.originalname)

  const [SongFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/moodify/song",
    }),
    tags.image && tags.image.imageBuffer
      ? storageService.uploadFile({
          buffer: tags.image.imageBuffer,
          filename: tags.title + ".jpeg",
          title: tags.title // add title here
        })
      : Promise.resolve({ url: "https://tse1.mm.bing.net/th?id=OIP.7n9s8l2XoQh0jKZy3mLz5gHaHa&pid=Api&P=0" }) // default poster URL
  ])

  const song = await songModel.create({
    url: SongFile.url,
    posterUrl: posterFile.url,
    title: tags.title? tags.title : req.file.originalname, // use tags.title or default to "Unknown Title"
    mood: mood
  })
  res.status(201).json({
    message: "song created successfully",
    song
  })
}

const getSongs = async (req,res)=>{
  const {mood} = req.query
  // const songs = await songModel.find({mood})
  const song = await songModel.aggregate([
    { $match: { mood } },
    { $sample: { size: 1 } }
  ]);
  res.status(200).json({
    message: "songs retrieved successfully",
    song: song[0]|| null
  })
}

module.exports = {
  uploadSong,
  getSongs
}
