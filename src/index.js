//requeriments
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { nextTick } = require('process');
//initializations

const app = express();

//settings

app.set('views', path.join(__dirname, 'views'));
app.set('port',process.env.PORT || 4000);
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


//middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//global variables

app.use((req,res,next)=>{
    next();
});

//routes

app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//public

app.use(express.static(path.join(__dirname, 'public')));

//starting the server with "npm run dev" in terminal

app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
})