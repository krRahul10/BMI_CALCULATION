const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reuired: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Valid Email Address");
      }
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const generate_token = jwt.sign({ _id: this._id }, secretKey ,{
      expiresIn:"1d"
    });
    this.tokens = this.tokens.concat({ token: generate_token });
    await this.save();
    return generate_token;
  } catch (err) {
    console.log(err);
  }
};

// userSchema.methods.addCartData = async function (cart) {
//   try {
//     this.carts = this.carts.concat(cart);
//     await this.save()
//     return this.carts
//   } catch (err) {console.log("err",err);}
// };

const USER = new mongoose.model("USER", userSchema);

module.exports = USER;
