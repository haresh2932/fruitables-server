


const sendOtp = (req, res, next) => {
    try {

        const accountSid = process.env.TWILIO_ACCOUNT_ID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const client = require('twilio')(accountSid, authToken);
        const otp = Math.floor(1000 + Math.random() * 9000)
        req.session.otp = otp

        client.messages
            .create({
                from: '+12512612523',
                to: '+919925983034',
                body: otp
            })
            .then(message => next())

    } catch (error) {
        console.log(error.message);
    }

}

const verifyOtp = (req, res, next) => {
    try {
        console.log("session_otp:", req.session.otp);
        const session_otp = req.session.otp
        const otp = req.body

        if (!session_otp == otp) {
            res.status(404).json({
                success: false,
                message: "Invalid otp",
            });
        }
        next()

    } catch (error) {
        console.log(error.message);
    }


}

module.exports = {
    sendOtp,
    verifyOtp
}