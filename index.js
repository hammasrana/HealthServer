const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose");
const Doctors = require("./Models/doctors");
const Nurses = require("./Models/nurses");
const LabTests = require("./Models/labtest");
const AskQuestion = require("./Models/askQuestion");
const Labpost=require("./Models/post");
const Labmedi=require("./Models/ordermedicine")
const cors = require("cors");
const { json } = require("body-parser");

// app.use(express.json());

app.use(
    bodyParser.urlencoded({ extended: true })
);
app.use(bodyParser.json());
app.use(cors());

const DB = 'mongodb+srv://kumail:kumail123@clusterkumm.jj8fx.mongodb.net/HealthCare?retryWrites=true&w=majority';
mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=>
    console.log("connection succesfull")
).catch((err)=> 
    console.log("Failed to connet with MongoDB> "+err)
);

app.get("/Doctors", (req, res) => {
    Doctors.find(req.query, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
        // console.log(result+" hello")
      }
    });
  });

app.get("/Nurses", (req, res) => {
    Nurses.find(req.query, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
        // console.log(result+" hello")
      }
    });
  });

  app.get("/Questions", (req, res) => {
    AskQuestion.find(req.query, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
        // console.log(result+" hello")
      }
    });
  });

  app.get("/DoctorName", (req, res) => {
    Doctors.find(req.query,{name: 1, degree: 1,speciality:1,_id: 0}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
        // console.log(result+" hello")
      }
    });
  });
  app.get("/LabTests", (req, res) => {
    LabTests.find(req.query, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
        // console.log(result+" hello")
      }
    });
  });

  app.post("/createDoctor", async (req, res) => {
      const doctor = req.query;
      console.log(req.query)
      const newdoctor = new Doctors(doctor);
      await newdoctor.save().then(()=>console.log(newdoctor)).catch((err)=>console.log(err));

      res.json(doctor);
  });

  app.post("/createQuestion", async (req, res) => {
    const question = req.query;
    console.log(req.query)
    const newquestion = new AskQuestion(question);
    await newquestion.save().then(()=>console.log(newquestion)).catch((err)=>console.log(err));

    res.json(question);
  });

app.post("/createNurse", async (req, res) => {
    const nurse = req.query;
    console.log(req.query)
    const newnurse = new Nurses(nurse);
    await newnurse.save().then(()=>console.log(newnurse)).catch((err)=>console.log(err));

    res.json(nurse);
});

  app.get("/updateQuestion", (req, res) => {
    // var reslt = json
    AskQuestion.findOneAndUpdate(
      { title: req.query.key }, 
      { $push: { 
          answers: {
            docName: req.query.name,
            docDeg: req.query.degree,
            docSpec: req.query.speciality,
            ans: req.query.ans
          }  
        } 
      },(err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
          // console.log(result+" hello")
        }
      });
  });

app.post("/medicine", async (req, res) => {
    const medi = req.body;
    console.log(req.body)
    const newlabmedi = new Labmedi(medi);
    await newlabmedi.save()
    .then(()=>console.log(newlabmedi)).catch((err)=>console.log("Something Wrong> "+err)); 
    res.json(medi);
});
app.post("/post", async (req, res) => {
  const labtest = req.query;
  console.log(req.query)
  const newLabtest = new LabTests(labtest);
  await newLabtest.save().
  then(()=>console.log(newLabtest)).catch((err)=>console.log("Something Wrong> "+err));

  res.json(labtest);
});
app.post("/book", async (req, res) => {
  const labbook = req.body;
  console.log(req.body)
  const newLabbook = new Labpost(labbook);
  await newLabbook.save().
  then(()=>console.log(newLabbook)).catch((err)=>console.log("Something Wrong> "+err));

  res.json(labbook);
});

// get method to get all 
app.get('/get', async (req, res) => {
  try{
      const health = await LabTests.find();
      res.json(health)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//get method to  basically get the one  by ID
app.get('/get/:id', async (req, res) => {
  try{
      const health= await LabTests.findById(req.params.id);
      res.json(health)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})


  app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
  });
