const express = require('express');
const app = express();
const axios = require('axios')
const path = require('path');
app.use(express.json());


app.use(express.static(path.join(__dirname, '/public')));

app.get('/' ,(req,res) => {
    res.sendFile(path.join(__dirname,'/public/html' ,'login.html'))
})


app.post('/api/v1/auth/Ad/verify', async (req, res) => {
    const { UserName, PassWord } = req.body;  // Get UserName and PassWord from request body

    if (!UserName || !PassWord) {
        return res.status(400).send('UserName and PassWord are required.');
    }

    try {
        console.log('Verifying credentials for UserName:', UserName);

        // Sending the POST request to the external API with the credentials
        const response = await axios.post(`https://restapi.tu.ac.th/api/v1/auth/Ad/verify`, {
            UserName,
            PassWord
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU129223f3173ed3c073e7a59c015f51ac7ddc894de3267b7f37a8b2b2050572c3204be11c64765eb33aeb6b8e532336c9'
            }
        });

        // Handle the response from the external API
        const apiData = response.data;

        // Create output object to send to the client
        const output = {
            timestamp: Date.now(),
            status: apiData.status,
            message: apiData.message,
            data: apiData
        };
        console.log(output)
        // console.log(PassWord,'and',UserName)

        // console.log(res.json(output))
        res.json(output)
    } catch (err) {
        console.error('Error verifying credentials:', err);

        // Handle errors from the external API
        if (err.response) {
            return res.status(err.response.status).send(err.response.data);
        }

        res.status(500).send('An error occurred while verifying credentials.');
    }
});


const port = 3000;
app.listen(port,() => {
    console.log(`Server is running at ${port}`);
    // console.log(path.join(__dirname,'/Frontend/public'))
})