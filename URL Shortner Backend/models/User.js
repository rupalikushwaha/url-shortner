//importing Schema and model from mongoose
import {Schema, model} from "mongoose"

//creating schema
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    urls: [{
        type: Schema.Types.ObjectId,
        ref: "Urls",
    }]
    //to keep track of entry and update time
}, { timestamps: true });

//exporting model as default
export default model("User", userSchema);