const chai = require('chai');
const chaiHttp = require('chai-http');
const {arr, app}= require('../app');

const {expect} = chai;

chai.use(chaiHttp);

describe('Testing book apis', () => {
    it('testing GET /books api', (done) => {
        chai.request(app)
            .get('/books')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            })
    })

    it('testing POST /books api', (done) => {
        chai.request(app)
            .post('/books')
            .send({name: "Samaresh Maity", year: "1923"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res).to.be.an('object');
                expect(res.body).to.have.all.keys(['msg', 'book'])
                done();
            })
    })

    it('testing PUT /books/:id apis', (done) => {
        arr.push({name: "Samaresh", year: 1292, id: 0});
        chai.request(app)
            .put('/books/0')
            .send({name: "Pranjal"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.msg).to.be.equal("update successful")
                done();
            })
    })

    it('testing DELETE /books/:id apis', (done) => {
        arr.push({name: "Samaresh", year: 1292, id: 0});
        chai.request(app)
            .delete('/books/0')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.msg).to.be.equal("successfully deleted")
                done();
            })
    })
})


