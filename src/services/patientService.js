import db from "../models/index";
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let postBookAppoitment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.timeType ||
        !data.doctorId ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address ||
        !data.reason
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          reason: data.reason,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        //upsert
        let user = await db.User.findOrCreate({
          where: { firstName: data.fullName, email: data.email },
          // emailL:data.email
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
          },
        });
        console.log("hung check user patient", user[0]);
        if (user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
              reason: data.reason,
            },
          });
        }
        resolve({
          data: user,
          errCode: 0,
          errMessage: "Create user Patient Success!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postVerifyBookAppoitment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
          // raw = false ms dung dc hanm update
          // raw = false trả ra 1 seuqelize object
          // raw - true trả ra 1 object của javascript
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();

          resolve({
            errCode: 0,
            errMessage: "Update appointment success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "The activated appointment does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  //   getProfileDoctorById: getProfileDoctorById,
  postBookAppoitment: postBookAppoitment,
  postVerifyBookAppoitment: postVerifyBookAppoitment,
};
