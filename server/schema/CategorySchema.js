import mongoose, { Schema, model } from "mongoose";

const Feature = new Schema({
  feature_name: { type: String, required: true },
  feature_type: {
    type: String,
    enum: ["input", "select", "checkbox", "radio", "url"],
    required: true,
  },
  ordering: { type: Number, required: true },
  status: { type: String, enum: ["Yes", "No"], default: "Yes" },
  sub_features: [String],
});

const User = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
});
const Icon = new Schema({
  url: { type: String, required: true },
  id: { type: String, required: true },
});
const SubCategory = new Schema({
  sub_category_name: { type: String, required: true },
  free_post: { type: Number, required: true },
  ordering: { type: Number, required: true },
  status: { type: String, enum: ["Yes", "No"], default: "Yes" },
  buttons: { type: [String], required: true },
  active_features: { type: [Feature], required: true },
});

const CategorySchema = new Schema({
  parent_category: { type: String, required: true },
  category_name: { type: String, required: true },
  ordering: { type: Number, required: true },
  status: { type: String, enum: ["Yes", "No"], default: "Yes" },
  sub_category: { type: [SubCategory], required: true },
  features: { type: [Feature], required: true },
  icon: { type: Icon, required: true },
  created_by: { type: User, required: true },
  created_at: { type: Date, required: true },
});

const Category = mongoose.models.Category || model("Category", CategorySchema);
export default Category;
