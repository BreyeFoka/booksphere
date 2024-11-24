const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        avatar: {type: String, default:""},
        bio: {type: String, maxlength: 500},
        favoriteGenres: [String],
        currentlyReading: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
        roles: { type: [String], default: ["user"] }, 
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  module.exports = mongoose.model("User", userSchema);