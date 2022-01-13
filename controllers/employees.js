const { response, request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Employee = require("../models/employee");

const employeeGet = async (req = request, res = response) => {
  const { from = 0 } = req.query;
  const query = { state: true };

  const [total, employee] = await Promise.all([
    Employee.countDocuments(query),
    Employee.find(query).skip(Number(from)),
  ]);

  res.json({
    total,
    employee,
    msg: "Lista obtenida con exito",
  });
};

const employeePost = async (req, res = response) => {
  //Guardar imagen
  const { tempFilePath } = req.files.img;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  const img = secure_url;

  const { name, email, telephone } = req.body;
  const employee = new Employee({ name, email, telephone, img });
  // Guardar en BD
  await employee.save();

  res.json({
    employee,
    msg: "Empleado agregado",
    status: "200",
  });
};

const employeePut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...rest } = req.body;

  const employee = await Employee.findByIdAndUpdate(id, rest);

  res.json({ employee, msg: "Empleadoa acutlizado", status: "200" });
};

const employeePatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const employeeDelete = async (req, res = response) => {
  const { id } = req.params;
  const employee = await Employee.findByIdAndUpdate(id, { state: false });

  res.json({ employee, msg: "Empleado eliminado", status: "200" });
};

module.exports = {
  employeeGet,
  employeePost,
  employeePut,
  employeePatch,
  employeeDelete,
};
