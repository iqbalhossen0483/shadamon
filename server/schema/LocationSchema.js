import { Schema, model, models } from "mongoose";

const User = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
});

const LocationSchema = new Schema({
  location_name: { type: String, required: true },
  sub_location: { type: [String], required: true, default: [] },
  map_link: { type: String },
  ordering: { type: Number, required: true },
  created_at: { type: Date, required: true },
  created_by: { type: User, required: true },
  status: { type: String, enum: ["Yes", "No"], required: true },
});

const Location = models.Location || model("Location", LocationSchema);

export default Location;
