var Calculadora = require('../index');
var assert = require('assert');
var chai = require('chai');
var should = require('chai').should();
var chaiHttp = require('chai-http');
var server = 'http://localhost:8082';

chai.use(chaiHttp);

describe('Calculadora', function(){
    describe('InteresSimple(Capital, TasaDeInteres, Tiempo)', function(){
        it('Cuando-La-Capital-Sea-10000-Y-La-TasaDeInteres-5-Y-Los-Años-5-Debe-Retornar-2500', function() {
            //assert.equal(Calculadora.InteresSimple(Capital, TasaDeInteres, Tiempo);
            var result = Calculadora.InteresSimple(10000, 5, 5);
            result.should.be.a('number');
            result.should.be.equal(2500);
        });
    }),
    describe('InteresTotal(Capital, InteresSimple)', function(){
        it('Cuando-El-Interes-Simple-Sea-2500-Y-La-Capital-Sea-10000-Debe-Retornar-125000', function() {
            //assert.equal(Calculadora.InteresTotal(Capital, InteresSimple);
            var result = Calculadora.InteresTotal(10000, 2500);
            result.should.be.a('number');
            result.should.be.equal(12500);
        });
        describe('Calcular interes', function(){
            var Calculo = {
                Capital: 10000,
	            TasaDeInteres: 5,
	            Tiempo : 5
            }
            it('Hacer-El-Calculo-De-Interes', (done) => {
                chai.request(server)
                .post('/api/calculo/tasaInteres')
                .send(Calculo).then((res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('success');
                    res.body.should.have.property('interesSimple').be.equal(2500);
                    res.body.should.have.property('interesTotal').be.equal(12500);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
        });
    })
})