const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    student_id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true }
},{
    collection: 'data'
});

const student = mongoose.model('Student', schema);

module.exports = student;