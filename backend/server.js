

require("dotenv").config({ path: "./.env" });
const express = require("express");
const session = require("express-session");
var cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT;

// databaseconnection
require("./Models/db").databaseconnection();

const indexRouter = require("./routes/indexRoutes");



app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
 
// app.use(
//     session({
        
//         resave: false,
//         saveUninitialized: false,
//         secret: "jk43t9",
        
//     })
// );
app.use(
    session({
        // cookie: {
        //     secure: true,
        //     maxAge: 86400,
        //     sameSite: "none",
        // },
        secret: "jk43t9",
        resave: false,
        saveUninitialized: false,
    })
);


app.use("/", indexRouter);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));