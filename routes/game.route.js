const express = require("express");
const app = express();
const GamesRoutes = express.Router();

let Game = require("../model/Game");

// api to add game
GamesRoutes.route("/add").post(function (req, res) {
  let game = new Game(req.body);
  game
    .save()
    .then((game) => {
      res
        .status(200)
        .json({ status: "success", mssg: "game added successfully" });
    })
    .catch((err) => {
      res
        .status(409)
        .send({ status: "failure", mssg: "unable to save to database" });
    });
});

// api to get games
GamesRoutes.route("/").get(function (req, res) {
  Game.find(function (err, games) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", games: games });
    }
  });
});

// api to get game
GamesRoutes.route("/game/:id").get(function (req, res) {
  let name = req.params.name;
  Game.findById(name, function (err, game) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", game: game });
    }
  });
});

// api to update route
GamesRoutes.route("/update/:id").put(function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (!game) {
      res.status(400).send({ status: "failure", mssg: "Unable to find data" });
    } else {
      game.name = req.body.name;
      game.year = req.body.year;
      game.area = req.body.area;
      game.description = req.body.description;

      game.save().then((business) => {
        res.status(200).json({ status: "success", mssg: "Update complete" });
      });
    }
  });
});

// api for delete
GamesRoutes.route("/delete/:id").delete(function (req, res) {
  Game.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", mssg: "Delete successfully" });
    }
  });
});

module.exports = GamesRoutes;
