const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const connectDatabase = require("./database/conn");
const User = require('./models/user');
const Event = require('./models/event');
const Admin = require('./models/admin')
const port = 5000;

// Generate a secure secret key
const secretKey = crypto.randomBytes(32).toString('hex');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


router.get('/checkAuth', async (req, res) => {
  console.log('/checkAuth');
  
  // Retrieve the token from the Authorization header
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(' ')[1];
  
  if (token === "null") {
    return res.json({ success: false, message: 'Not Logged In' });
  }  
  else {
    const decodedToken = jwt.decode(token);
    const adminType = decodedToken.adminType;
    const adminEmail = decodedToken.email;
    const admin = Admin.findOne({email: adminEmail});
    if(!admin){
      return res.json({success: false, message: 'User Not found'});
    }
    return res.json({ success: true, adminType: adminType, message: 'Already Logged In' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findAndValidate({ email, password });

  try {
    if (admin) {
      const token = jwt.sign(
        { email: admin.email, adminType: admin.adminType},
        secretKey,
        { expiresIn: '24h' } // Token expires in 24 hours
      );

          // // // Verify and decode the token
          // const decodedToken = jwt.verify(token, secretKey);
          // // Access the value of isAdmin from the decoded token
          // const isAdmin = decodedToken.adminType;
          // console.log(decodedToken, isAdmin);

      res.json({ success: true, message: 'Login successful', token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});


router.post('/addAdmin', async (req, res) => {
    console.log('Enters in /addAdmin Route');
    const {name, registrationNumber, email, adminType, position, course, branch, year} = req.body;
    const password = registrationNumber;
    try{
      let admin = new Admin({name, registrationNumber, email, password, position, adminType, course, branch, year});
      await admin.save();
      res.json({success: true, message:'Admin created successfully'});
    }
    catch(error) {
      res.json({success: false, message: 'Error occured'});
    }
});

router.post('/addUser', async (req, res) => {
  console.log('Enters in /addUser Route');
  const {name, registrationNumber, email, course, branch, year} = req.body;
  const password = registrationNumber;
  // console.log(name, registrationNumber, password, course, branch, year);
  try{
    let user = new User({name, registrationNumber, password, email, course, branch, year});
    console.log(user);
    await user.save();
    res.json({success: true, message:'User created successfully'});
  }
  catch(error) {
    res.json({success: false, message: 'Error occured'});
  }
});


router.put('/updateUser/:id', async (req, res) => {
  const {id} = req.params;
  
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Update the user properties
    user.name = req.body.name;
    user.registrationNumber = req.body.registrationNumber;
    user.email = req.body.email;
    user.course = req.body.course;
    user.branch = req.body.branch;
    user.year = req.body.year;

    await user.save();

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.log( "hey, error occurred");
    res.json({ success: false, message: 'Error occurred' });
  }
});

router.delete('/deleteUser/:id', async (req, res) => {
  const {id} = req.params; 
  console.log(id);

  try {
    const deletedUser = await User.findByIdAndRemove(id);

    if (deletedUser) {
      return res.json({ success: true, message: 'User deleted successfully' });
    } else {
      return res.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    return res.json({ success: false, message: 'Error occurred while deleting user' });
  }
});


router.put('/updateAdmin/:id', async (req, res) => {
  const {id} = req.params;
  console.log("/updateAdmin");
  
  try {
    const admin = await Admin.findOne({ _id: id });
    console.log(admin);

    if (!admin) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Update the user properties
    admin.name = req.body.name;
    admin.registrationNumber = req.body.registrationNumber;
    admin.email = req.body.email;
    admin.position = req.body.position;
    admin.adminType = req.body.adminType;
    admin.course = req.body.course;
    admin.branch = req.body.branch;
    admin.year = req.body.year;
    console.log(admin.name, admin.registrationNumber, admin.email, admin.adminType, admin.course, admin.branch, admin.year);
    

    await admin.save();

    res.json({ success: true, message: 'User updated successfully' });
  } 
  catch (error) {
    console.log( "hey, error occurred");
    res.json({ success: false, message: 'Error occurred' });
  }
});

router.delete('/deleteAdmin/:id', async (req, res) => {
  const {id} = req.params; 
  console.log(id);

  try {
    const deletedUser = await Admin.findByIdAndRemove(id);

    if (deletedUser) {
      return res.json({ success: true, message: 'User deleted successfully' });
    } else {
      return res.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    return res.json({ success: false, message: 'Error occurred while deleting user' });
  }
});


router.post('/addEvent', async(req, res) => {
  const {name, startDate, endDate} = req.body;
  let eventName = name;
  try{
    let event = new Event({eventName, startDate, endDate});
    await event.save();
    res.json({success: true, message: 'Event created successfully'});
  }
  catch(error) {
    res.json({success: false, message: 'Error occurred'});
  }
});


router.get('/showAdmins', async(req, res) => {
  const adminData = await Admin.find();
  if(adminData) {
    res.json(adminData);
  }
  else{
    res.json([]);
  }
})


router.get('/showUsers', async(req, res) => {
  const userData = await User.find();
  if(userData) {
    res.json(userData);
  }
  else{
    res.json([]);
  }
})


router.get('/showEvents', async(req, res) => {
  const eventData = await Event.find();
  if(eventData) {
    res.json(eventData);
  }
  else{
    res.json([]);
  }
})


router.post('/takeAttendance', async (req, res) => {
  // Retrieve the eventName and userEmail from the request body
  const { eventName, userEmail } = req.body;
  const user = await User.findOne({ email: userEmail });

  // Check if the eventName and userEmail are valid and not empty
  if (!eventName || !user) {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  const exist = user.events.includes(eventName);

  if (exist) {
    return res.json({ success: true, message: 'Attendance already recorded' });
  }

  user.events.push(eventName);
  await user.save();

  // Assuming the attendance logic is successful, send a success response
  res.json({ success: true, message: 'Attendance recorded successfully' });
});


router.post('/deleteAttendance', async(req, res) => {
  // Retrieve the studentID
  const {eventName, userEmail} = req.body;
  const user = await User.findOne({email: userEmail});

  if(!user || !eventName) {
    return res.status(400).json({success: false,  message: 'Error in deleting attendance'});
  }

  const exist = user.events.includes(eventName);
  if(!exist){
    return res.json({success:true,  message: 'Attendance already deleted'});
  }


  // Find the index of the element to delete
  let index = user.events.indexOf(eventName);
  
  if (index !== -1) {
    // Delete the element using splice()
    user.events.splice(index, 1);
  }
  await user.save();

  res.json({success:true, message: 'Deleted Successfully'});
});


app.use(router);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});