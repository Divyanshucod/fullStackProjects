const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
      userId: { type: Schema.Types.ObjectId, ref: 'users' },
      balance: Number
})
const Account = mongoose.model('accounts',accountSchema);
module.exports = {
    Account
}