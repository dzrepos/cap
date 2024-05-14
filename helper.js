const userSchema = require('../Model/userSchema');
const bookingSchema = require('../Model/bookingSchema');

exports.generateUserId = async () => {
  const users = await userSchema.find({});
  let Id = users.length + 1  
  return Id;

};

exports.generateBookingId = async () => {
  const bookings = await bookingSchema.find({});
  let Id = bookings.length + 1
  return Id;  
};
