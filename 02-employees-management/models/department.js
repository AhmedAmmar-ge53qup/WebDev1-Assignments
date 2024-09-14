import mongoose from "mongoose";

const Schema = mongoose.Schema;
const options = {
    toJSON: {
        virtuals: true
    }
};

const departmentSchema = new Schema({
    name: {
        type: String,
        required: [true, "Department Name cannot be empty"]
    },
    location: {
        type: String,
        required: [true, "Department Location cannot be empty"]
    }
}, options);

departmentSchema.virtual('did').get(function (){
    if (this.name == "ITS")
        return "102";
    else if (this.name == "Administration")
        return "102";
    else if (this.name == "HR")
        return "103";
    else if (this.name == "Health and safety")
        return "104";
    else if (this.name == "Faculty")
        return "105";
});


export default mongoose.model('Department', departmentSchema);