const mongoose = require('mongoose');
console.log(process.env.MONGO_USER);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@recipes.wubssts.mongodb.net/${MONGO_DATABASE}`)