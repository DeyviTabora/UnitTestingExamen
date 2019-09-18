var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/banco2', {useNewUrlParser: true});

//const Calculo = mongoose.model('calculo', { Capital: Number, TasaDeInteres: Number, Tiempo: Number});

var app = express();
app.use(bodyParser());

app.listen(8082, () => {
    console.log("Running port 8082");
});

module.exports = {
    InteresSimple(Capital, TasaDeInteres, Tiempo ) {
        return  Capital * (TasaDeInteres/100) * Tiempo;
    },
    InteresTotal(Capital, InteresSimple){
        return Capital + InteresSimple;
    }
};

app.post('/api/calculo/tasaInteres', (req, res) => {
    var Capital = req.body.Capital;
    var TasaDeInteres = req.body.TasaDeInteres;
    var Tiempo = req.body.Tiempo;

    var interesSimple = module.exports.InteresSimple(Capital, TasaDeInteres, Tiempo);

    var interesTotal = module.exports.InteresTotal(Capital, interesSimple);
        
    res.send({success : true , interesSimple: interesSimple, interesTotal: interesTotal});
});