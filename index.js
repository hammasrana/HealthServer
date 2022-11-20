const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose");
const Doctors = require("./Models/doctors");
const Nurses = require("./Models/nurses");
const LabTests = require("./Models/labtest");
const AskQuestion = require("./Models/askQuestion");
const Hospital =require("./Models/hospitals");
const Specialities = require("./Models/specialities");
const Users = require("./Models/users");
const Areas = require("./Models/areas");
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

app.post("/DoctorsUpdateAll", (req, res) => {
    Doctors.update({},req.query, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

app.get("/HospitalDoctors", (req, res) => {
    Doctors.find({hospital:{$elemMatch: {name: req.query.name, address: req.query.area, city: req.query.city}}}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
        // console.log(result+" hello")
      }
    })
  });

//fetch randomly 3 no of doctors from specific speciality
app.get("/NoOfDoctors", (req, res) => {
    Doctors.aggregate([
      { $match: { speciality: req.query.spec } },
      { $sample: { size: 3 } }
    ], (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
        // console.log(result+" hello")
      }
    });
  });

app.get("/Specialities", (req, res) => {
  Specialities.find(req.query, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
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

app.get("/Hospitals", (req, res) => {
    Hospital.find(req.query, (err, result) => {
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

app.get("/Users", (req, res) => {
  Users.find(req.query, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if(result.length == 0){
        return res.status(404).send({
          message: "User not found!"
        })
      }
      else{
        res.json(result);
      }
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

app.post("/createHospital", async (req, res) => {
    const hospital = req.query;
    console.log(req.query)
    const newhospital = new Hospital(hospital);
    await newhospital.save().then(()=>console.log(newhospital)).catch((err)=>console.log(err));

    res.json(hospital);
  });

app.post("/createUser", async (req, res) => {
  const user = req.query;
  console.log(req.query)
  const newuser = new Users(user);
  await newuser.save().then(() => console.log(newuser)).catch((err) => console.log(err));

  res.json(user);
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

app.get("/updateUser", (req, res) => {
  // var reslt = json
  Users.findOneAndUpdate(
    { name: req.query.name },
    req.query, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(req.query);
        // console.log(result+" hello")
      }
    });
});

    app.post("/createSpeciality", async (req, res) => {
      const speciality = req.query;
      console.log(req.query)
      const newspeciality = new Specialities(speciality);
      await newspeciality.save().then(() => console.log(newspeciality)).catch((err) => console.log(err));
      res.json(speciality);
    });

app.post("/createarea", async (req, res) => {
  const area = req.query;
  console.log(req.query)
  const newarea = new Areas(area);
  await newarea.save().then(() => console.log(newarea)).catch((err) => console.log(err));

  res.json(area);
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


  app.listen(process.env.PORT || 3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
  });
