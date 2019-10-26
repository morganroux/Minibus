const express = require('express');
const authRoutes = require('./routes/authRoutes');
//const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth')

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
// app.use(trackRoutes);

app.get('/', requireAuth, (req, res) => {
    res.send(`Your Email is : ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
