//importing Schema and model from mongoose
import {Schema, model} from "mongoose"

//creating schema
const urlSchema = new Schema({
    original: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
    //to keep track of entry and update time
}, { timestamps: true });

//exporting model as default
export default model("Url", urlSchema);