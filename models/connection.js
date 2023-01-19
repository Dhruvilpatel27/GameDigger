const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rsvp = require('./Rsvp');

const connectionSchema = new Schema({
    name: {type: String, required: [true, 'Title is required'],
            minLength: [3, 'The Title should have at least 3 characters']},
    topic: {type: String, required: [true, 'Topic is required'],
            minLength: [3, 'The Topic should have at least 3 characters']},
    details: {type: String, required: [true, 'Detail is required'], 
            minLength: [3, 'The Detail should have at least 3 characters']},
    hostname: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {
        type: Date, required: [true, 'Date is required'],
        validate: {
           validator: function (v) {
              return (
                 v && // check that there is a date object
                 v.getTime() > Date.now()
              );
           },
           message: "An event should be at least 1 day later.",
        }
     },
    startTime: {type: String, required: [true, 'Start time is required']},
    endTime: {type: String, required: [true, 'End Time is required']},
    image: {type: String, required: [true, 'Image is required']},
},
{timestamps: true}
);

connectionSchema.pre('deleteOne', function(next) {
    let id = this.getQuery()['_id'];
    Rsvp.deleteMany({ connection: id}).exec();
    next();
});

module.exports = mongoose.model('Connection', connectionSchema);


