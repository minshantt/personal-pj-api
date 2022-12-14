//sync Db
const { sequelize } = require('./models');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoutes');
const postRoute = require('./routes/postRoute');
const hashtagRoute = require('./routes/hashtagRoute');
const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute); //ใช้ /auth เป็นลิ้งไปสู่ที่ิทาน
app.use('/post', postRoute);
app.use('/hashtag', hashtagRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
// sequelize.sync({ force: true }).then(() => console.log('DB SYNC SUCCESSFUL'));
app.listen(port, () => console.log(`server is running on port ${port}`));
