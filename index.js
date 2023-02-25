const express = require("express");
const ytdl = require("ytdl-core");
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.static("public"));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get(`/validateVideoUrl`, async (req, res) => {
    const url = req.query.url;

    if(!ytdl.validateURL(url)) { return res.send(JSON.stringify({ isValid: false })); }

    try {
        await ytdl.getBasicInfo(url);
        return res.send(JSON.stringify({ isValid: true }));
    } catch (error) { 
        return res.send(JSON.stringify({ isValid: false }));
    }
});

app.get(`/getVideo`, (req, res) => {
    const url = req.query.url;

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(url, { format: "mp4" }).pipe(res);
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});