const db = require("../models");

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paremeter!",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Ok create a specialty success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({
        // attributes: {
        //   exclude: ["image"],
        // },
      });
      resolve({
        errCode: 0,
        errMessage: "Ok",
        data,
      });
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters!",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "descriptionHTML",
            "descriptionMarkdown",
            "name",
            "address",
            "image",
          ],
        });
        if (data && data.image) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
          data.image = Buffer.from(data.image, "base64").toString("binary");
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
