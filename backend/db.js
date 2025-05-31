const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@recipes.wubssts.mongodb.net/${process.env.MONGO_DATABASE}`)