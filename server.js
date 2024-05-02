const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3005;

//Middlewares
app.use(cors());
app.use(express.json());

//Anslut till mongoDB
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("connected to mongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to database: " + error);
    });

// Skapa ett db-schema för jobb
const jobSchema = new mongoose.Schema({
    company: {
        type: String, 
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

// Skapa en model
const Job = mongoose.model("Job", jobSchema);

//Routing

app.get("/api", async (req, res) => {
    res.json({ message: "Emmas Work Experience API" });
});

//Hämta jobberfarenhet
app.get("/jobs", async (req, res) => {

    try {
        let result = await Job.find({});

        return res.json(result)
    } catch(error) {
        return res.status(500).json(error);
    }
});

// Skapa jobberfarenhet
app.post("/jobs", async (req, res) => {
    try {
        console.log(req.body);
        let result = await Job.create(req.body);

        return res.json(result);
    } catch(error) {
        return res.status(400).json({ message : "Error creating job " + error});
    }
});

// Ändra jobberfarenhet
app.put("/jobs/:_id", async (req, res) => {
    try {
        let jobId = req.params._id;
        let updateJob = await Job.findOneAndUpdate(
            { _id: jobId }, req.body, { new: true }
        );
        if (!updateJob) {
            return res.status(404).json({ message: "Unable to find job" });
        }
        return res.json(updateJob);
    } catch(error) {
        return res.status(400).json(error)
    }
});

app.delete("/jobs/:_id", async (req, res) => {
    try {
        let jobId = req.params._id;
        let deleteJob = await Job.findByIdAndDelete(jobId);
        if (!deleteJob) {
            return res.status(400).json({ message: "Unable to find job"});
        }
        return res.json({ message: "Job deleted"})
    } catch(error) {
        return res.status(500).json({ message : "Unable to delete job " + error})
    }
});


//Starta
app.listen(port, () => {
    console.log("Server started on port:" + port);
});
