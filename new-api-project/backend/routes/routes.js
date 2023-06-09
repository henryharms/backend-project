const express = require('express')
const router = express.Router()

const PlayerSchema = require('../models/PlayerData.js')
const SettingSchema = require('../models/PlayerData.js')

//what do you want to send back to the user?
//the delivery
// this is the api

//req =  request has properties: headers (tokens), content type, params
// res = response 



//Player schema CRUD

router.get('/players', (req, res) => {
  PlayerSchema.find({})
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
router.get('/player/:id', (req, res) => {
  PlayerSchema.findById(req.params.id)
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

router.get('/player-name/:name', (req, res) => {
PlayerSchema.findOne({ name: req.params.name })
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
router.post('/player-add', (req, res) => {
  const player = new PlayerSchema({
    name:req.body.name,
    totalClicks:req.body.totalClicks,
    clicksPerSecond:req.body.clicksPerSecond,
    timeSinceClick:req.body.timeSinceClick,
    settings: {}
  })
  console.log(req.body.name)
  // PlayerSchema.create(req.body)
  player.save()
  .then(created_player => {
    console.log(created_player)
    res.json("added")
  })
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

router.put('/player-update-id/:id', (req, res) => {
  PlayerSchema.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => {
      // returns the previously saved model
      res.send(updated)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/player-update-name/:name', (req, res) => {
  PlayerSchema.findOneAndUpdate({ name: req.params.name }, req.body)
    .then(updated => {
      // returns the previously saved model
      res.send(updated)
    })
    .catch(err => {
      res.json(err)
    })
})




router.delete('/player-delete/:id', (req, res) => {
  PlayerSchema.findByIdAndDelete(req.params.id)
  .then(deleted => {
    res.send(deleted)
  })
  .catch(err => {
    res.json(err)
  })
})

router.put('/:id/update-settings', (req, res) => {
  new_settings = {
    displayMode:req.body.displayMode,
    sound:req.body.sound,
    language:req.body.language
  }
  PlayerSchema.findByIdAndUpdate(req.params.id, {settings:new_settings})
    .then(updated => {
      // returns the previously saved model
      console.log('WE GOT IT')
      console.log(new_settings)
      res.send(updated)
    })
    .catch(err => {
      res.json(err)
    })
})




module.exports = router
