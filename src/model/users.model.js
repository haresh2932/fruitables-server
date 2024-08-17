const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        address: {
            type: String,
            trim: true,
            lowercase: true,
            // required: true
        },
        role: {
            type: String,
            trim: true,
            lowercase: true,
            // required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            // required: true
        },
        mobile_no: {
            type: Number,
            // required:true,

        },
        role: {
            type: String,
            // required: true
        },
        password: {
            type: String,
        },
        avtar: {
            type: String,
        },
        refreshToken: {
            type: String,
            // required: true
        },
        googleId: {
            type: String,
        },
        facebookId:{
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Users = mongoose.model('Users', usersSchema);
module.exports = Users