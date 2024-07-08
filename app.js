// const express = require("express");
// const db = require('./app/models');
// const userRoutes = require('./app/routes/userRoutes');
// const eventRoutes = require('./app/routes/eventRoutes');
// const verifyToken = require('./middleware/auth');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Routes
// app.use('/users', userRoutes);
// app.use('/events', eventRoutes);

// // Database connection
// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// });

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/models');
const userRoutes = require('./app/routes/userRoutes');
const eventRoutes = require('./app/routes/eventRoutes.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sequelize.sync();

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
