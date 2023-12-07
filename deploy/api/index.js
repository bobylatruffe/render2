const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const checkJwt = require("./middleware/checkJwt")
app.use(checkJwt);

const loginRoute = require("./routes/utilisateurs/login.js");
app.use("/api", loginRoute);

const catalogueRoute = require("./routes/catalogue/catalogue.js");
app.use("/api", catalogueRoute);

// set port, listen for requests
const PORT = 443;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
