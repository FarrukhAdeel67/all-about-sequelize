const Sequelize = require("sequelize");
const Students = require("../models/student")
const sequelize = require('../models/index')
const moment = require("moment");
// async function createtable(req,res){
//   sequelize
//   .sync({force:true})
//   .then((result)=>{
//     return Students.create({
//       name:'farrukh adeel',email:'m.farrukhadeel@gmail.com',writer:'frk', 
//     }).then((customer)=>{
//       console.log('first entry added to database',customer);
//     }).catch((err)=>{
//       console.log(err);
//     })
//   })
// }

async function post(req, res) {
  try {
    const { name, email,writer } = req.body;
    if (!name || !email) {
      return res.status(400).send("Required fields can't be empty");
    }

   const emailfound =  await Students.findOne({
      where: {
        email:email,
      }
    })
    if(emailfound){
      return res.status(409).send("email already exists...")
    }
  const student = await Students.create({
    name: name,
    email: email,
    writer: writer,

   });
    res.status(200).send({student});
    console.log({student})
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong....");
  }
}

async function getAll(req, res) {
  try {
     const students = await Students.findAll()
    res.status(200).send({ students});
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}

async function getSingle(req, res) {
  try {
    const { studentId } = req.params;
    const student = await Students.findOne({
      where:{id: studentId},
    })
    res.status(200).send({student});
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}

async function updated(req, res) {
  console.log('farrukh')
  try {
    const { name } = req.body;
    const { studentId } = req.params;
    //console.log(name);
    if (!name) {
      return res.status(400).send("Name is required");
    }
    const studentFound = await Students.findOne({
      where: {
        id: studentId
      },
    });
    console.log(studentFound);
    const student = await Students.update({
      name: name,
      
    },{
      where: {id:studentId },
      individualHooks:true
    })
    res.status(200).send({ student });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}

async function deleteStudent(req, res) {
  try {
    const { studentId } = req.params;
    await Students.destroy({
      where:{id:studentId},
    });
    res.status(200).send("Student deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Required fields can't be empty");
    }

    let student = await Students.findOne({
      where:{ email }
    });
    if(!student) {
      return res.status(404).send("Email doesn't exist");
    }

    const result = await bcrypt.compare(password, student.password);
    if(!result) {
      return res.status(401).send("Password is incorrecct");
    }

    student = student.toJSON();
    delete student.password;
    const token = jwt.sign({
      student: student
    }, "first-token")

    res.status(200).send({
      token, student
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}
//hooks: to run a function at a specific time
module.exports = {
 // createtable,
  post,
  getAll,
  getSingle,
  updated,
  deleteStudent,
  login
};
