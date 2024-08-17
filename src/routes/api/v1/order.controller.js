const express = require('express')
const { registerController } = require("../../../controller")
const passport = require('passport')
const sendmail = require('../../../utils/sendmail')
const pdfmail = require('../../../utils/pdfmail')
const router = express.Router()

router.post(
    "/register",
    registerController.registerUsers
)


router.post(
    "/login",
    registerController.login
)

router.get('/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("Successful authentication");
        res.send("<h1>ok<h1/>")
        // Successful authentication, redirect home.
        // res.redirect('/');
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

router.get('/sendmail',sendmail);
router.post(
    "/refresh",
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


