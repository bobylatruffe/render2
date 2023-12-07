const express = require("express");
const fs = require("fs");
const path = require("path");
const {v4: uuidv4} = require("uuid");

const router = express.Router();

router.post("/login", (req, resp) => {
    const utilisateurRecu = {
        login: req.body.login, password: req.body.password,
    }

    let userValide = undefined;
    const listeUtilisateursInfos = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/utilisateurs/utilisateursInfos.json")));
    listeUtilisateursInfos.forEach((userInFile) => {
        if (userInFile.login === utilisateurRecu.login && userInFile.password === utilisateurRecu.password) {
            userValide = userInFile;
        }
    });

    if (userValide !== undefined) {
        const generateAccessToken = require("../../controllers/utilisateur.controllers")
        const accessToken = generateAccessToken(userValide);

        console.log(accessToken);
        resp.setHeader('Authorization', `Bearer ${accessToken}`);
        resp.send(userValide);
    } else {
        resp.status(403);
        resp.send({message: 'Erreur de connexion mon pote'});
    }
});

module.exports = router;