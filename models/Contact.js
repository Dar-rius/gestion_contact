import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  phone: String,
  email: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Contact = mongoose.models.Contact || mongoose.model("contact", ContactSchema);

export default Contact;