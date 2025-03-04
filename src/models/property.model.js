import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    property_name: { type: String, required: true },
    description: { type: String, required: true },
    property_area: { type: Number, required: true },
    property_price: { type: Number, required: true },
    property_images: { type: [String], required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // Longitude, Latitude
    },
    property_address: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
