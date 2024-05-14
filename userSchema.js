const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/weCare', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));
const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,     
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
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
const userModel = mongoose.model('users', userSchema);

const user = [
  {
    "id": 1,
    "name": "Maria",
    "password": "maria12345",
    "gender": "F",
    "dateOfBirth": "1996-01-01",
    "email": "maria@gmail.com",
    "mobileNumber": 1234567890,
    "pincode": 123456,
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India"
  },
];

(async () => {
  const deleteCount = await userModel.deleteMany({});
  if (deleteCount) {
    console.log('User Collection Removed');
    const data = await userModel.insertMany(user);
    if (data) {
      console.log('User Collection Created');
    }
  }
})();

module.exports = userModel;
