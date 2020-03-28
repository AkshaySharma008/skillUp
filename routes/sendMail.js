const sqlstring = require("sqlstring");
const axios = require('axios');
const nodemailer = require("nodemailer");

module.exports = {
    sendMail: async (req, res) => {
        let email = req.body.email;
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAILEMAIL,
                pass: process.env.GMAILPASSWORD
            }
        });
        let info = await transporter.sendMail({
            from: '"AIT CodeDown" <codedown2020@gmail.com>',
            to: email,
            subject: "CodeDown 2020",
            html: `
            <h2>Congratulations!! You have registered for CodeDown 2020</h2>
            <b>This is an intra-AIT competition. You will be developing your projects in the given 30 days period.
                This has to be done on github, your contributions would be collected form github and you will also be
                awarded mentor points.<br>
                A leaderboard will be live for you to see your rank.<br>
                Older Contribution in github would be counted but main points will be considered for these 30 days.<br><br>
                Happy Coding!!<br><br>

                For any queries Contact:<br>
                Email: codedown2020@gmail.com<br>
                Phone : 9325611554
            </b>
            `
        });
        if (info.messageId)
            res.send({ mail: true });
        else
            res.send({ mail: false });
    }
}

