var jwt = require('jsonwebtoken');
const Users = require('../model/users.model');
const auth = (roles=[]) => async(req, res, next) => {
    try {

        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(400).json({
                success:false,
                message:"Please Provide Token"
            })
        }

        console.log("Authorization:", token);

        try {
            const validateToken=await jwt.verify(token,"sdbfdsfgsddsgygyddsd")
            console.log(validateToken);

            const user=await Users.findById(validateToken.id)

            console.log(user,roles);

            if(!roles.some((v)=>v===user.role)){
                res.status(400).json({
                    success: false,
                    message: "You have not access.",
                });
            }

            console.log("okk");

            req.user=user

            next()
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Invalid Token",
            });
            
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message,
        });
    }
}

module.exports = auth