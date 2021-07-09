// подключение
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// ejs
app.set('view engine', 'ejs');

// ▼▼▼▼ body-parser ▼▼▼▼, теперь его не нужно импортировать отдельно, достаточно написать такой код:
app.use(express.urlencoded({
    extended: true
}));

// adding new stuff in list
let items = [];


// get
app.get('/', (req, res) => {

    let today = new Date();
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        newListItems: items
    });
});


// post
app.post("/", (req, res) => {
    let item = req.body.newItem;

    items.push(item);
    
    res.redirect('/');
});


// ▼▼▼▼ подключил css ▼▼▼▼
app.use(express.static(__dirname + '/public'));