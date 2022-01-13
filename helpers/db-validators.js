const { Employee } = require("../models");

const existsEmployeeById = async (id) => {
  const existsEmployee = await Employee.findById(id);
  if (!existsEmployee) {
    throw new Error(`El id no existe ${id}`);
  }
};

const emailExists = async (email = "") => {
  const existsEmail = await Employee.findOne({ email });
  if (existsEmail) {
    throw new Error(`El correo: ${email}, ya esta registrado`);
  }
};

module.exports = {
  existsEmployeeById,
  emailExists,
};
