import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    property_name: { type: String, required: true },
    description: { type: String, required: false },
    property_area: { type: Number, required: true },
    property_price: { type: Number, required: true },
    property_images: { type: [String], required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // Longitude, Latitude
    },
    property_address: { type: String, required: true },
    transaction_type: { type: String, enum: ["buy", "rent"], required: true },
    type: {
      type: String,
      enum: ["apartment", "house", "villa"],
      required: true,
    },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true, default: 1 },
    views: { type: Number, default: 0 },
    city: { type: String, required: true },
    property_id: { type: Number, required: true }, // 6 digit id for property
    postal_code: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure geospatial index for location search
propertySchema.index({ location: "2dsphere" });

const Property = mongoose.model("Property", propertySchema);

export default Property;
