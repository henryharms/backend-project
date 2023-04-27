const express = require('express')
const router = express.Router()
const ClickSchema = require('../models/Clicks.js')
const PlayerSchema = require('../models/PlayerData.js')

//what do you want to send back to the user?
//the delivery
// this is the api


//req =  request has properties: headers (tokens), content type, params
// res = response 
router.get('/', (req, res) => {
  PlayerSchema.find(req.query)
  //'then' happens if find is succesful
  .then(nuevans => {
    console.log("succesfully got entire db!")
    console.log(nuevans)
    res.json(nuevans)
  })
  //if theres an error, 'catch' happens instead
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

//Read/get by id
router.get('/:id', (req, res) => {
  PlayerSchema.findById(req.params.id)
  .then(nuevan => {
    console.log("succesfully got one!")
    console.log(nuevan)
    res.json(nuevan)
  })
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

router.get('/name/:name', (req, res) => {
PlayerSchema.findOne({ name: req.params.name })
.then(nuevan => {
  console.log("succesfully got one!")
  console.log(nuevan)
  res.json(nuevan)
})
.catch(err => {
  console.error(err)
  res.json(err)
})
})

//we will be using the '/add' to do a POST request
router.post('/add', (req, res) => {
PlayerSchema.create(req.body)
  .then(nuevan => {
    console.log(nuevan)
    res.send(nuevan)
  })
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

router.put('/:id', (req, res) => {
  PlayerSchema.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => {
      // returns the previously saved model
      res.send(updated)
    })
    .catch(err => {
      res.json(err)
    })
})

router.delete('/:id', (req, res) => {
  PlayerSchema.findByIdAndDelete(req.params.id)
  .then(deleted => {
    res.send(deleted)
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router
