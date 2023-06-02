const db = require("../models");
let createHandbook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paremeter!",
        });
      } else {
        await db.Handbook.create({
          name: data.name,

          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Ok create a handbook success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllHandbook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll({
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
let getDetailHandbookById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters!",
        });
      } else {
        let data = await db.Handbook.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown", "name"],
        });

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
  createHandbook: createHandbook,
  getAllHandbook: getAllHandbook,
  getDetailHandbookById: getDetailHandbookById,
};
