const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/models');
const userRoutes = require('./app/routes/userRoutes');
const eventRoutes = require('./app/routes/eventRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sequelize.sync();

app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

