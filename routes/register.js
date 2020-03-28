const sqlstring = require("sqlstring");
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");

module.exports = {
    register: async (req, res) => {

        let name = req.body.name;
        let username = req.body.username;
        let year = req.body.year;
        let techStack = req.body.techStack;
        let email = req.body.email;
        let mentor = req.body.mentor;
        let response;
        let contribution;

        try {
            response = await axios.get(`https://api.github.com/users/${username}`);
            if (!response.data.login)
                throw new Error('User Not Found');
            let site = `https://github.com/users/${username}/contributions?to=2020-03-28`;
            const result = await axios.get(site);
            let data = cheerio.load(result.data);
            data = data('body > div > div > h2').text();
            console.log(data);
            data = data.split(" ");
            contribution = data[6];

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

            let query = `insert into Registration values (${sqlstring.escape(name)},${sqlstring.escape(username)},${sqlstring.escape(contribution)},${sqlstring.escape(year)},${sqlstring.escape(techStack)},${sqlstring.escape(email)},${sqlstring.escape(mentor)},0);`;
            db.query(query, (err, result) => {
                if (err)
                    res.send({ success: false });
                else
                    res.send({ success: true });
            })
        } catch (err) {
            console.log(err);
        }
    },
    leaderboard: async (req, res) => {
        let query = 'select github_username,contributions,year,mentor_points from Registration;';
        try {
            db.query(query, (err, result) => {
                if (err) throw err;
                sortArrayOfObjects = (arr, key) => {
                    return arr.sort((a, b) => {
                        return b[key] - a[key];
                    });
                };
                sortArrayOfObjects(result.recordsets[0], "contributions");
                res.send({ success: result.recordsets })
            })
        } catch (err) {
            console.log(err);
            res.send({ success: false });
        }
    },
    getLeaderboard: async (req, res) => {
        res.render('leaderboard');
    }
}

//https://githubcontriscrape.herokuapp.com/api/scrape