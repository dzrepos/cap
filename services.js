const userModel = require('../Model/userSchema');
const bookingModel = require('../Model/bookingSchema');
const helper = require('../Utilities/helper');
const validator = require('../Utilities/validator');

exports.userRegister = async (req, res, next) => {
  try {
    if (
      validator.validateName(req.body.name) &&
      validator.validatePassword(req.body.password) &&
      validator.validatePhone(req.body.mobileNumber) &&
      validator.validateEmail(req.body.email) &&
      validator.validateDateOfBirth(req.body.dateOfBirth) &&
      validator.validateGender(req.body.gender) &&
      validator.validatePinCode(req.body.pincode) &&
      validator.validatePlace(req.body.city) &&
      validator.validatePlace(req.body.state) &&
      validator.validatePlace(req.body.country)
    ) {
      const emailDuplicateCheck = await userModel.find({
        email: req.body.email,
      });
      if (emailDuplicateCheck.length <= 0) {
        const userid = await helper.generateUserId();
        const user = await userModel.create({
          id: userid,
          name: req.body.name,
          password: req.body.password,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,
          mobileNumber: req.body.mobileNumber,
          email: req.body.email,
          pincode: req.body.pincode,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
        });
        res.status(201).json({
          message: `Thanks for registering. Your user Id is ${userid}`,
        });
      } else {
        const err = new Error('User already exists with this email id');
        err.status = 401;
        throw err;
      }
    } else if (!validator.validateName(req.body.name)) {
      const err = new Error(
        'Name should have minimum 3 and maximum 50 characters'
      );
      err.status = 401;
      throw err;
    } else if (!validator.validatePassword(req.body.password)) {
      const err = new Error(
        'Password should have minimum 5 and maximum 10 characters'
      );
      err.status = 401;
      throw err;
    } else if (!validator.validatePhone(req.body.mobileNumber)) {
      const err = new Error('Mobile Number should have 10 digits');
      err.status = 401;
      throw err;
    } else if (!validator.validateEmail(req.body.email)) {
      const err = new Error('Email should be in a valid email format');
      err.status = 401;
      throw err;
    } else if (!validator.validateDateOfBirth(req.body.dateOfBirth)) {
      const err = new Error('Age should be greater than 20 and less than 100');
      err.status = 401;
      throw err;
    } else if (!validator.validateGender(req.body.gender)) {
      const err = new Error('Gender should be either M or F');
      err.status = 401;
      throw err;
    } else if (!validator.validatePinCode(req.body.pincode)) {
      const err = new Error('Pincode should have 6 digits');
      err.status = 401;
      throw err;
    } else if (!validator.validatePlace(req.body.city)) {
      const err = new Error(
        'City should have minimum 3 and maximum 20 characters'
      );
      err.status = 401;
      throw err;
    } else if (!validator.validatePlace(req.body.state)) {
      const err = new Error(
        'State should have minimum 3 and maximum 20 characters'
      );
      err.status = 401;
      throw err;
    } else if (!validator.validatePlace(req.body.country)) {
      const err = new Error(
        'Country should have minimum 3 and maximum 20 characters'
      );
      err.status = 401;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const userArr = await userModel.find({
      id: req.body.id,
      password: req.body.password,
    });
    if (userArr.length > 0) {
      res.json({ message: 'Welcome to WeCare. Login Successful' });
    } else {
      const err = new Error('Incorrect user Id or Password');
      err.status = 400;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

exports.viewUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({}, { _id: 0, __v: 0 });
    if (user.length > 0) {
      res.send(user);
    } else {
      const err = new Error('Could not find any user');
      err.status = 400;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

//Show booking details for the user id passed as parameter.
//If booking doesn't exist throw error {"message" : "Could not find any appointment details with the user Id <id_passed_as_parameter>"}  with the status code 400.
exports.viewAppointmentDetails = async (req, res, next) => {
  try{
    let id = req.params.userId
    const user = await bookingModel.find({id:id},
    {_id : 0,_v : 0});
    if(user.length > 0){
      res.status(200);
      res.send(user);
    }
    else{
      res.status(400).json({
          status : "fail",
          message : `Could not find any appointment details with the user Id ${id}`
      });
    }
  }
  catch(err){
    next(err)
  }
};
 
//Book appointment and send response as {"message" : "Booking confirmed"} with status 200 if the user Id exists, and the slot is available for the next 7 days.
//Else throw error "User Id does not exist" or "There is an appointment in this slot already" with status code 400 respectively.
//Validate slot and appointmentDate with messages "Slot should be a valid one" and "Date should be any upcoming 7 days" with status code 400
exports.confirmAppointment = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findOne({ id : userId });
    console.log(user);
    const date = new Date(req.body.appointmentDate);
    const slot = await bookingModel.findOne({
      slot: req.body.slot,
      appointmentDate: date,
    });
    if (
      user &&
      !slot &&
      validator.validateSlot(req.body.slot) &&
      validator.validateAppointmentDate(date)
    ) {
      const Id = await helper.generateBookingId();
      await bookingModel.create({
        id: Id,
        userId: userId,
        appointmentDate: req.body.appointmentDate,
        slot: req.body.slot,
      });
      res.status(201).json({
        message: "booking confirmed",
      });
      res.send(true);
    } else if (!user) {
      res.status(400).json({
        results: "User Id does not exist",
      });
    } else if (slot) {
      res.status(400).json({
        message: "There is an appointment in this slot already",
      });
    } else if (!validator.validateSlot(req.body.Slot)) {
      res.status(400).json({
        message: "Slot should be a valid one",
      });
    } else if (!validator.validateAppointmentDate(date)) {
      res.status(400).json({
        message: "Date should be any upcoming 7 days",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      message: err,
    });
  }
};

exports.invalid = async (req, res, next) => {
  try {
    const err = new Error('Invalid path');
    err.status = 404;
    throw err;
  } catch (err) {
    next(err);
  }
};
