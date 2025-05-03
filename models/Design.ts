import mongoose from "mongoose";

const FurnitureSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: [Number], default: [0, 0, 0] },
  rotation: { type: [Number], default: [0, 0, 0] },
  color: { type: String, default: "#A1887F" },
  scale: { type: Number, default: 1 },
  metalness: { type: Number, default: 0 },
  roughness: { type: Number, default: 0.5 },
});

const DesignSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  roomType: { type: String, required: true },
  roomDimensions: {
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  wallColor: { type: String, required: true },
  furniture: { type: [FurnitureSchema], default: [] },
  sceneAmbientLight: { type: Number, default: 0.5 },
  sceneShadowIntensity: { type: Number, default: 0.8 },
  showShading: { type: Boolean, default: true },
  thumbnail: { type: String }, // Add thumbnail field to store base64 string
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Design || mongoose.model("Design", DesignSchema);