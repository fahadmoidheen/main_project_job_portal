const express = require('express');

const cors = require('cors');
const { getMaxListeners } = require('process');
const Facultydata = require('./model/facultydata');
const alumnidata = require('./model/alumnidata')

require("./db/connect")
const app = new express();
const jwt = require('jsonwebtoken');
const Jobdata = require('./model/jobdata');
const employerdata=require ('./model/employerData')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


admin = "admin@gmail.com";
adminPwd = "Aa@123456"

// -------------------------------SECTION FACULTY STARTS------------------------------------
app.get("/allfaculty",async(req,res)=>{

    
    Facultydata.find()
    .then(function(products){
        res.send(products);
    
    });
})


app.get("/faculty/:id",async(req,res)=>{
console.log("hai");
const id = req.params.id;
await Facultydata.findOne({"_id":id})
.then((book)=>{
    console.log(book);
    res.send(book);
});
}) 

// Faculty login

app.post("/faculty/login", async(req,res)=>{

const userrole= 0;
const email = req.body.email;
const password = req.body.password;
const udata = await Facultydata.findOne({email: email})



 if(email===admin && password===adminPwd){
  
  return  res.status(200).send({email});
}else if(udata==null){
    return res.status(404).send("userdata not present");
  }else
  if(udata.email===email && udata.password===password){
  
   res.status(200).send({email});
}
else{
  res.status(405).send("something Went Wrong Try Again");
}
})

// Adding new faculty by admin

app.post("/faculty/add",async(req,res)=>{
console.log(req.body);

const user = req.body;

console.log(user);
const newUser = new Facultydata(user);
try{
    await newUser.save();
    res.status(201).json(newUser);
} catch (error){
    res.status(409).json({ message: error.message});     
}

})

// Faculty details updating

app.put("/faculty/update",async(req,res)=>{
console.log(req.body)
let user = await Facultydata.findById(req.body._id);
user = req.body;

const editUser = new Facultydata(user);
console.log(editUser)
try{
    await Facultydata.updateOne({_id: req.body._id}, editUser);
    res.status(201).json(editUser);
} catch (error){
    res.status(409).json({ message: error.message});     
}
})

// deleting faculty details

app.delete('/facultyremove/:id',(req,res)=>{

id = req.params.id;
Facultydata.findByIdAndDelete({"_id":id})
.then(()=>{
    console.log('success')
    res.send();
})
})
// -------------------------------SECTION FACULTY ENDS------------------------------------


//for alumni



app.post('/insert', function (req, res) {

    console.log(req.body);

    var alumni = {
        uname: req.body.alumni.uname,
        email: req.body.alumni.email,
        password: req.body.alumni.password,
        hq: req.body.alumni.hq,
        city: req.body.alumni.city,


    }
    var alumni = new alumnidata(alumni);
    alumni.save();
});


// app.get('/:id',  (req, res) => {

//     const id = req.params.id;
//       alumnidata.findOne({"_id":id})
//       .then((alumni)=>{
//           res.send(alumni);
//       });
//  })

//alumni login
app.post('/login', async(req, res) => {
    const userrole = 0;
    const email = req.body.email;
    const password = req.body.password;
    const udata = await alumnidata.findOne({ email: email })


    if (udata == null) {
        return res.status(404).send("userdata not present");
    }

 if(udata.email === email && udata.password === password) {

    let payload = { subject: email + password }
    let token = jwt.sign(payload, 'secretKey')
    res.status(200).send({ token })
}
else {
    res.status(405).send("something Went Wrong Try Again");
}
        
})

app.get('/alumni', function (req, res) {

    alumnidata.find()
        .then(function (alumni) {
            res.send(alumni);
        });
});


app.post("/alumni/login", async (req, res) => {



    const userrole = 0;
    const email = req.body.email;
    const password = req.body.password;
    const udata = await alumnidata.findOne({ email: email })

    if (udata == null) {
        return res.status(404).send("userdata not present");
    }

    if (email === admin && password === adminPwd) {

        return res.status(200).send({ email });
    } if (udata.email === email && udata.password === password) {

        res.status(200).send({ email });
    }
    else {
        res.status(405).send("something Went Wrong Try Again");
    }





})



// ------Alumni Verification




app.put("/alumni/save",async(req,res)=>{
    console.log(req.body)
    let user = await alumnidata.findById(req.body._id);
    user = req.body;
    
    const editUser = new alumnidata(user);
    console.log(editUser)
    try{
        await alumnidata.updateOne({_id: req.body._id}, editUser);
        res.status(201).json(editUser);
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
    })

//-----Almni Verifcation  ends




// ------------JOB SECTION STARTS------------------- 


app.post('/postjob',async(req,res)=>{

    console.log(req.body);

const user = req.body;

console.log(user);
const newUser = new Jobdata(user);
try{
    await newUser.save();
    res.status(201).json(newUser);
} catch (error){
    res.status(409).json({ message: error.message});     
}

})


app.get("/getjobs",async(req,res)=>{
    

    
        Jobdata.find()
        .then(function(products){
            res.send(products);
        
        });
    
})


app.post("/applyjob",async(req,res)=>{
    

    
    console.log(req.body);

    const user = req.body;
    
    console.log(user);
    const newUser = new Jobdata(user);
    try{
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error){
        res.status(409).json({ message: error.message});     
    }

})

app.delete('/deletejobpost/:id',(req,res)=>{

    id = req.params.id;
Jobdata.findByIdAndDelete({"_id":id})
.then(()=>{
    console.log('success')
    
})


ApplyJobdata.findByIdAndDelete({"job_id":id})
.then(()=>{
    console.log('success')
    res.send();
})

})




app.get("/applicant/:id",async(req,res)=>{

console.log(req.params.id);

const user = req.params.id;

console.log(user);
ApplyJobdata.find({job_id:user})
.then(function (alumni) {

console.log(alumni);
res.send(alumni);
});


})


// ------------JOB SECTION STARTS------------------- 

//---------Employer section Starts------------------
//Posting Employer details into database
app.post("/postEmployer",function(req,res){
    console.log(req.body);
    var item={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        company:req.body.company,
        password:req.body.password,
        compdesc:req.body.compdesc
    }
    var employer= new employerdata(item);
    employer.save();;
    
})

//log in of employer

app.post("/loginemployer",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password 
    console.log(email);
    console.log(password);
    let udata= await employerdata.findOne({email:email})

    if(udata==null){
        console.log("null")
        return res.status(404).send("userdata does not present") 
    }else if(udata.email===email && udata.password===password){
        
          res.status(200).send({email})
    }else{
        
        return res.status(401).send("Something went wrong..Try again")
    }
})

app.get("/getEmployer/:id",async(req,res)=>{
    const email=req.params.id;
    console.log(email)
    employerdata.findOne({"email":email})
    .then((singleEmployer)=>{
        res.send(singleEmployer)
    })
})

//---------Employer section Ends------------------


app.listen(3000, function () {
    console.log('listening to port 3000');
});