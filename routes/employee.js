const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares");

const { existsEmployeeById, emailExists } = require("../helpers/db-validators");

const {
  employeeGet,
  employeePut,
  employeePost,
  employeePatch,
  employeeDelete,
} = require("../controllers/employees");

const router = Router();

router.get("/", employeeGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsEmployeeById),
    validarCampos,
  ],
  employeePut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExists),
    check("telephone", "El telefono es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  employeePost
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsEmployeeById),
    validarCampos,
  ],
  employeeDelete
);

router.patch("/", employeePatch);

module.exports = router;
