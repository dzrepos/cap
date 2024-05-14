// const userModel = require('../Model/userSchema');

exports.validateName = function (name) {
  if (name.length >= 3 && name.length <= 50) {
    return true;
  }
  return false;
};

exports.validatePlace = function (place) {
  if (place.length >= 3 && place.length <= 20) {
    return true;
  }
  return false;
};

exports.validateGender = function (gender) {
  if (gender === 'M' || gender === 'F') {
    return true;
  }
  return false;
};

exports.validatePhone = function (phoneNo) {
  if (phoneNo.toString().length === 10) {
    return true;
  }
  return false;
};

exports.validateDateOfBirth = function (dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const tod = new Date();
  const difference = tod.getTime() - dob.getTime();
  const age = Math.round(difference / (1000 * 60 * 60 * 24 * 365));
  if (age < 5 || age > 100) {
    return false;
  }

  return true;
};

exports.validatePinCode = function (pincode) {
  if (pincode.toString().length === 6) {
    return true;
  }
  return false;
};

exports.validateEmail = function (email) {
  const pattern = /^[a-z]+[A-Za-z0-9.-_]+@[a-z]+.[a-z]{2,}$/;
  if (pattern.test(email)) {
    return true;
  }
  return false;
};

exports.validatePassword = function (password) {
  if (password.length >= 5 && password.length <= 10) {
    return true;
  }
  return false;
};

exports.validateAppointmentDate = function (appointmentdate) {
  const dob = new Date(appointmentdate);
  const tod = new Date();
  const extra = tod.getHours() * 60 * 60 * 1000;
  const start = new Date(tod.getTime() - extra + 1 * 24 * 60 * 60 * 1000);
  const last = new Date(tod.getTime() + 7 * 24 * 60 * 60 * 1000);
  if (dob.getTime() < start.getTime() || dob.getTime() > last.getTime()) {
    return false;
  }
  return true;
};

exports.validateSlot = function (slot) {
  if (
    slot === '9 AM to 10 AM' ||
    slot === '10 AM to 11 AM' ||
    slot === '11 AM to 12 PM' ||
    slot === '2 PM to 3 PM' ||
    slot === '3 PM to 4 PM' ||
    slot === '4 PM to 5 PM'
  ) {
    return true;
  }
  return false;
};
