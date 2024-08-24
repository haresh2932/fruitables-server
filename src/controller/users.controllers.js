var jwt = require('jsonwebtoken');
const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const sendmail = require('../utils/sendmail');

const getAccessToken = async (id) => {
    try {
        const user = await Users.findById(id)

        const accessToken = await jwt.sign({
            id: user._id,
            role: user.role,
            expiresIn: '1h'
        }, process.env.ACCESSTOKEN_SECRET_KEY, { expiresIn: process.env.ACCESSTOKEN_EXPIRY })

        const refreshToken = await jwt.sign({
            id: user._id,
            expiresIn: '2d'
        }, process.env.REFRESHTOKEN_SECRET_KEY, { expiresIn: process.env.REFRESHTOKEN_EXPIRY })

        console.log("reffresh", refreshToken, "access", accessToken);

        user.refreshToken = refreshToken,
            await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error.message);
    }
}

const registerUsers = async (req, res) => {
    try {
        console.log(req.file);

        const { email, password } = req.body;
        const user = await Users.findOne({ $or: [{ email }] })
        console.log(user, "jdfjd");

        if (user) {
            return res.status(405).json({
                success: false,
                message: "email is alrady exist",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword);

        if (!hashPassword) {
            return res.status(400).json({
                success: false,
                message: "Internal error in password incryption",
            });
        }
        const users = await Users.create({
            ...req.body, password: hashPassword
            // ,avtar:req.file.path
        })
        console.log(users);
        if (!users) {
            return res.status(400).json({
                success: false,
                message: "Internal error in registration",
            });
        }

        const userData = await Users.findById(users._id).select("-password")
        const mail = await sendmail(userData.email)
        console.log(userData, mail);

        return res.status(201).json({
            success: true,
            message: "User register successfully",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message,
        });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ $or: [{ email }] })

    if (!user) {
        return res.status(405).json({
            success: false,
            message: "email is not exist",
        });
    }

    const loginData = await bcrypt.compare(password, user.password)
    // console.log(loginData);

    if (!loginData) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credential",
        });
    }

    const accessOption = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 60 * 60 *1000
    }

    const refreshOption = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 60 * 60 * 24 * 10*1000
    }
    const { accessToken, refreshToken } = await getAccessToken(user._id)
    console.log(accessToken, "usgd", refreshToken, "hdfhfd");

    const userData = await Users.findById(user._id).select("-password -refreshToken")
    console.log("Login success:", userData, accessToken);

    return res.status(200)
        .cookie("accessToken", accessToken, accessOption)
        .cookie("refreshToken", refreshToken, refreshOption)
        .json({
            success: true,
            message: "User Login Successfully",
            data: { ...userData.toObject(), accessToken }
        })

}

const getNewtoken = async (req, res) => {
    try {
        console.log("haha", req.cookies.refreshToken)

        const checkToken = await jwt.verify(req.cookies.refreshToken, process.env.REFRESHTOKEN_SECRET_KEY)
        console.log(checkToken);

        if (!checkToken) {
            return res.status(401).json({
                success: false,
                message: "Token expier",
            });
        }

        const user = await Users.findById(checkToken.id)
        console.log(user);


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "invalid user",
            });
        }


        if (req.cookies.refreshToken !== user.toObject().refreshToken) {
            return res.status(400).json({
                success: false,
                message: "invalid RefreshToken",
            });
        }

        const { accessToken, refreshToken } = await getAccessToken(user._id)

        console.log("generate", accessToken, refreshToken);

        const accessOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 *1000
        }
    
        const refreshOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 24 * 10*1000
        }
        return res.status(200)
            .cookie("accessToken", accessToken, accessOption)
            .cookie("refreshToken", refreshToken, refreshOption)
            .json({
                success: true,
                message: "Token generate Successfully",
                data: { accessToken: accessToken }
            })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message,
        });
    }


}

const logout = async (req, res) => {
    try {
        console.log("idddddddddddddddd", req.body.id);
        
        const user = await Users.findByIdAndUpdate(
            req.body.id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        );

        console.log("ussss", user);
        

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not logout",
            });
        }

        console.log(user);
        const accessOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
    
        const refreshOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        return res.status(200)
            .clearCookie("accessToken",accessOption)
            .clearCookie("refreshToken",refreshOption)
            .json({
                success: true,
                message: "Logout Successfully."
            })
    } catch (error) {
        console.log("logout error: ", error);
        
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message,
        });
    }

}

const checkAuth = async (req, res) => {
    console.log("i am in", req);
    try {

        if (!req.cookies.accessToken) {
            return res.status(401).json({
                success: false,
                message: "unauthorized accesstoken"
            })
        }

        const cookieTokens = await jwt.verify(req.cookies.accessToken, process.env.ACCESSTOKEN_SECRET_KEY)
        console.log(cookieTokens, "accsesstoken");

        if (!cookieTokens) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user authorized",
            data: cookieTokens,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }

}

module.exports = {
    registerUsers,
    login,
    getNewtoken,
    logout,
    checkAuth,
    getAccessToken
}