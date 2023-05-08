const express = require('express')
const router = express.Router()
// const clicksSchema = require('../models/Clicks.js')
const playerSchema = require('../models/PlayerData.js')

//what do you want to send back to the user?
//the delivery
// this is the api


//req =  request has properties: headers (tokens), content type, params
// res = response 
router.get('/', (req, res) => {
  playerSchema.find({})
  //'then' happens if find is succesful
  .then(players => {
    console.log("succesfully got entire db!")
    console.log(players)
    res.json(players)
  })
  //if theres an error, 'catch' happens instead
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

//Read/get by id
router.get('/:id', (req, res) => {
  playerSchema.findById(req.params.id)
  .then(player => {
    console.log("succesfully got one!")
    console.log(player)
    res.json(player)
  })
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

router.get('/name/:name', (req, res) => {
playerSchema.findOne({ name: req.params.name })
.then(player => {
  console.log("succesfully got one!")
  console.log(player)
  res.json(player)
})
.catch(err => {
  console.error(err)
  res.json(err)
})
})

//we will be using the '/add' to do a POST request
router.post('/add', (req, res) => {
  const player = new playerSchema({
    name:req.body.name,
    totalClicks:req.body.totalClicks,
    clicksPerSecond:req.body.clicksPerSecond,
    timeSinceClick:req.body.timeSinceClick
  })
  // console.log(req.body.name)
  // playerSchema.create(req.body)
  player.save()
  .then(player => {
    console.log(player)
    res.json("added")
  })
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

// router.put('/:id', (req, res) => {
//   playerSchema.findByIdAndUpdate(req.params.id, req.body)
//     .then(updated => {
//       // returns the previously saved model
//       res.send(updated)
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })

// router.delete('/:id', (req, res) => {
//   playerSchema.findByIdAndDelete(req.params.id)
//   .then(deleted => {
//     res.send(deleted)
//   })
//   .catch(err => {
//     res.json(err)
//   })
// })

module.exports = router
