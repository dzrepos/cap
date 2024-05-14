const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

//Model
const bookingModel = mongoose.model('bookings', bookingSchema);

const booking = [
  {
    "appointmentDate": "2024-02-05",
    "slot": "10 AM to 11 AM",
    "userId": 1,
    "id": 1
  },
];

(async () => {
  const deleteCount = await bookingModel.deleteMany({});
  if (deleteCount) {
    console.log('Booking Collection Removed');
    const data = await bookingModel.insertMany(booking);
    if (data) {
      console.log('Booking Collection Created');
    }
  }
})();

module.exports = bookingModel;
