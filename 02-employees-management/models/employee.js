import mongoose from "mongoose";

const Schema = mongoose.Schema;
const options = {
    toJSON: {
        virtuals: true
    }
};

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Firstname cannot be empty"]
    },
    lastName: {
        type: String,
        required: [true, "Lastname cannot be empty"]
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"]
    },
    did: {
        type: String,
        ref: "Department",
        required: [true, "DepartmentNo cannot be empty"]
    }
}, options);

employeeSchema.virtual('eid').get(function (){
    return this.id;
});


export default mongoose.model('Employee', employeeSchema);