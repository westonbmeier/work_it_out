const Workout = require("../models/workoutSchema.js");
const router = require("express").Router();
const path = require("path");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .sort({day: -1})
        .then(function(data){
            res.json(data[0]);
        })
        .catch(err => console.log(err));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/stats.html"));
});

router.post("/api/workouts", (req, res) => {
    let workout = new Workout;
    workout.save( (err, result) => {
        if (err) {
            throw err;
        }
        res.json({"inserted": result});
    });
});

router.put("/api/workouts/:id", (req, res) => {
    let id = req.params.id;
    let exercise = req.body;
    Workout.findByIdAndUpdate({_id: id}, {$push: {exercises: exercise}})
        .then(result => res.json({"result:": result}))
        .catch(err => console.log(err))
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .then(data => res.json(data));
});

module.exports = router;