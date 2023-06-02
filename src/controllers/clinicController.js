import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let clinics = await clinicService.createClinic(req.body);

    return res.status(200).json(clinics);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    let clinics = await clinicService.getAllClinic();

    return res.status(200).json(clinics);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let clinics = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(clinics);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
