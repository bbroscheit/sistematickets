const { Proveedor } = require("../../bd");

const postProveedor = async (
  name, description, address, zone
) => {
  try {
    let newProveedor = await Proveedor.create({
        name, description, address, zone
    });

    return newProveedor;
  } catch (e) {
    console.log(" error en controller postProveedor ", e.message);
  }
};

module.exports = postProveedor;