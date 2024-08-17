const express = require('express')
const { registerController } = require("../../../controller")
const passport = require('passport')
const sendmail = require('../../../utils/sendmail')
const pdfmail = require('../../../utils/pdfmail')
const upload = require('../../../middleware/upload')
const { getAccessToken } = require('../../../controller/users.controllers')

const router = express.Router()

router.post(
    "/register",
    // upload.single("avtar"),
    registerController.registerUsers
)


router.post(
    "/login",
    registerController.login
)

router.get(
    '/checkAuth',
    registerController.checkAuth
);

router.get('/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        console.log("Successful authentication");
        console.log(req.isAuthenticated());
        console.log(req.session.passport.user._id);

        if (req.isAuthenticated()) {
            const { accessToken, refreshToken } = await getAccessToken(req.session.passport.user._id)

            console.log("generate", accessToken, refreshToken);

            const option = {
                httpOnly: true,
                secure: true
            }
            return res.status(200)
                .cookie("accessToken", accessToken, option)
                .cookie("refreshToken", refreshToken, option)
                .redirect("http://localhost:3000/")
        }
    });

router.get('/facebookLogin',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("Successful authentication");
        res.send("<h1>ok<h1/>")
        // Successful authentication, redirect home.
        // res.redirect('/');
    });

router.get('/sendmail', sendmail);
router.post(
    "/getNewToken",
    registerController.getNewtoken
)

router.post(
    "/logout",
    registerController.logout
)

router.get(
    "/pdfmake",
    pdfmail
)






module.exports = router


