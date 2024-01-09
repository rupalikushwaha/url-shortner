//importing Schema and model from mongoose
import {Schema, model} from "mongoose"

//creating schema
const analyticSchema = new Schema({
    urlId: { type: Schema.Types.ObjectId, ref: 'Url', required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now },
  });

//exporting model as default
export default model("Analytic", analyticSchema);