const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Anslut till mongoDB
mongoose
    .connect("mongodb://localhost:27017/workExperience")
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

// Skapa ett nytt jobb
async function createJob() {
    //objekt som representerar jobb
    let job = {
        companyName: "",
    };
}

//Hämta jobberfarenhet
app.get("/api", (req, res) => {
    res.json({ message: "Emmas Work Experience API" });
});

app.get("/api/work_experience", (req, res) => {
    client.query("SELECT * FROM work_experience;", (err, results) => {
        //Om fel...
        if (err) {
            res.status(500).json({ error: "Något gick fel: " + err });
            return;
        }
        //Om poster saknas...
        if (results.length === 0) {
            res.status(200).json({ message: "Hittade inga poster" });
            //Annars, hämta resultat
        } else {
            res.json(results);
        }
    });
});

/*

//Skapa jobberfarenhet
app.post("/api/work_experience", (req, res) => {
    let companyName = req.body.company_name;
    let jobtitle = req.body.job_title;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    //Error handling
    let errors = {
        message: "",
        detail: "",
        https_response: {},
    };

    if (!companyName || !jobtitle || !location || !startdate) {
        errors.message =
            "Missing company name and/or jobtitle and/or location and/or startdate";
        errors.detail =
            "You must include company name, jobtitle, location and startdate";

        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);
        return;
    }

    //Add work experience to database
    client.query(
        "INSERT INTO work_experience(company_name, job_title, location, startdate, enddate, description) VALUES ($1,$2,$3,$4,$5,$6);",
        [companyName, jobtitle, location, startdate, enddate, description],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Något gick fel: " + err });
                return;
            }

            let workExperience = {
                company_name: companyName,
                job_title: jobtitle,
                location: location,
                startdate: startdate,
                enddate: enddate,
                description: description,
            };

            res.json({ message: "Jobberfarenhet tillagd", workExperience });
        }
    );
});

//Ändra jobberfarenhet
app.put("/api/work_experience/:id", (req, res) => {
    let id = req.params.id;
    let companyName = req.body.company_name;
    let jobtitle = req.body.job_title;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    client.query(
        
        "UPDATE work_experience SET company_name = $1, job_title = $2, location = $3, startdate = $4, enddate = $5, description = $6 WHERE id = $7;",
        [companyName, jobtitle, location, startdate, enddate, description, id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Något gick fel: " + err });
                return;
            }

            res.json({ message: "Jobberfarenhet uppdaterad", id: id });
        }
    );
});


//Radera jobberfarenhet
app.delete("/api/work_experience/:id", (req, res) => {
    let id = req.params.id;

    client.query(
        "DELETE FROM work_experience WHERE id = $1;",
        [id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Något gick fel: " + err });
                return;
            }

            res.json({ message: "Jobberfarenhet raderad", id: id });
        }
    );
});

*/

//Starta
app.listen(port, () => {
    console.log("Server started on port:" + port);
});
