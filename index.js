const express = require("express")
const app = express()
const winston = require("winston")
const fs = require("fs")
const https = require("https")


require("./startup/logs")()
require("./startup/database")()
require("./startup/routes")(app)



// get the port number from environment variables. if not defined, set it to 3000
const PORT = process.env.PORT | 3000

// loading ssl key and certificate
const httpsOptions = {
    key: fs.readFileSync("./ssl/key.pem"),
    cert: fs.readFileSync('./ssl/cert.pem')
};

// An HTTPS listener that points to the Express app
https
    .createServer(httpsOptions, app)
    .listen(PORT, ()=>{
        winston.info(`Listening on port ${PORT}...`)
    });


