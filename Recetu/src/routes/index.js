const { ok } = require('assert');
const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require("uuid");

const json_recetas = fs.readFileSync('src/recetas.json', 'utf-8');
let recetas = JSON.parse(json_recetas);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        recetas
    })
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry')
});

router.post('/new-entry', (req, res, next) => {
    const {title, description, preparation, ingredients, notes, image} = req.body;
    if (!title || !description || !preparation || !ingredients || !notes || !image) {
        res.status(400).send('Revisa los campos anteriores, deberían estar totalmente diligenciados');
        return ok();
    }
    let newrecetas = {
        id: uuid.v4(),
        title,
        description,
        preparation,
        ingredients,
        notes,
        image
    };

    recetas.push(newrecetas);

    const json_recetas = JSON.stringify(recetas);
    fs.writeFileSync('src/recetas.json', json_recetas, 'utf-8');
    res.redirect('/');
});

router.get('/delet/:id', (req, res) => {
    recetas = recetas.filter(recetas = recetas.id != req.params.id);
    const json_recetas = JSON.stringify(recetas);
    fs.writeFileSync('src/recetas.json', json_recetas, 'utf-8');
    res.redirect('/');
});

module.exports = router;
