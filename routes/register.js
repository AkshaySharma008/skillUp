const sqlstring = require("sqlstring");
const axios = require('axios');
const cheerio = require('cheerio');

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
                throw 'User Not Found';
            let site = `https://github.com/users/${username}/contributions`;
            const result = await axios.get(site);
            let data = cheerio.load(result.data);
            data = data('body > div > div > h2').text();
            data = data.split(" ");
            contribution = data[6];
            let query = `insert into Registration values (${sqlstring.escape(name)},${sqlstring.escape(username)},${sqlstring.escape(contribution)},${sqlstring.escape(year)},${sqlstring.escape(techStack)},${sqlstring.escape(email)},${sqlstring.escape(mentor)});`;
            db.query(query, (err, result) => {
                if (err || result.rowsAffected[0] == 0) throw err;
                res.send({ sucess: true });
            })
        } catch (err) {
            console.log(err)
            res.end({ sucess: false });
        }
    },
    leaderboard: async (req, res) => {
        let query = 'select github_username,contributions from Registration;';
        try {
            db.query(query, (err, result) => {
                if (err) throw err;
                res.send({ success: result.recordset })
            })
        } catch (err) {
            console.log(err);
            res.send({ success: false });
        }
    }
}

//https://githubcontriscrape.herokuapp.com/api/scrape