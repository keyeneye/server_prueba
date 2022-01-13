const { Schema, model } = require("mongoose");

const EmployeeSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  telephone: {
    type: String,
    required: [true, "El telefono es obligatorio"],
    unique: true,
  },
  img: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Employee", EmployeeSchema);
