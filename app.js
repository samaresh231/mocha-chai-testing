const express = require('express');
const app = express();

let arr = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/books', (req, res) => {
    res.status(200).json(arr);
})

app.post('/books', (req, res) => {
    const {name, year} = req.body;
    arr.push({name, year, id: arr.length});

    res.status(201).json({
        msg: "success",
        book: {name, year, id: arr.length - 1}
    })
})

app.delete('/books/:id', (req, res) => {
    const {id} = req.params;

    const book = arr.find(book => book.id == id);
    if(!book) {
        return res.status(404).json({
            msg: `${id} is not available`
        })
    }   

    arr = arr.filter(book => book.id != id);
    res.status(200).json({
        msg: "successfully deleted"
    })
})

app.put('/books/:id', (req, res) => {
    const {id} = req.params;
    const {name, year} = req.body;

    const book = arr.find(book => book.id == id);
    if(!book) {
        return res.json({
            msg: `${id} is not available`
        })
    }

    if(name != undefined) {
        arr[id].name = name;
    }
    if(year != undefined) {
        arr[id].year = year;
    }
    res.status(201).json({
        msg: "update successful"
    })
})

app.listen(3000, _ => console.log('listening on port 3000'));

module.exports = {
    app,
    arr 
}