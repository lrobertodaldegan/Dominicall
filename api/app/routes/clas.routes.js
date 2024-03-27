const { authJwt, verifyClas, verifyGroup, verifyUser } = require("../middlewares");
const controller = require("../controllers/clas.controller");

module.exports = function(app) {
  app.get(
    '/dominicall/class',
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
    ],
    controller.getClasses
  );

  app.post(
    "/dominicall/class",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyUser.justCoord,
      verifyClas.verifyDuplicationInGroup
    ],
    controller.create
  );

  app.put(
    "/dominicall/class",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyUser.justCoord,
      verifyClas.verifyId,
      verifyClas.verifyDuplicationInGroup,
    ],
    controller.update
  );

  app.delete(
    "/dominicall/class/:id",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyUser.justCoord,
      verifyClas.verifyId,
    ],
    controller.remove
  );

  app.delete(
    "/dominicall/class/event/:id",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyUser.justCoord,
      verifyClas.verifyId,
    ],
    controller.removeEvent
  );

  app.delete(
    "/dominicall/class/offer/:id",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyId,
    ],
    controller.removeOffer
  );

  app.delete(
    "/dominicall/class/presence/:id",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyId,
    ],
    controller.removePresence
  );

  app.delete(
    "/dominicall/class/student/:id",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyId,
    ],
    controller.removeStudent
  );

  app.delete(
    "/dominicall/class/visitor/:id",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyId,
    ],
    controller.removeVisitor
  );

  app.get(
    "/dominicall/class/visitor",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyDt,
    ],
    controller.getVisitors
  );

  app.get(
    "/dominicall/class/student",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
    ],
    controller.getStudents
  );

  app.get(
    "/dominicall/class/presence",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyDt,
    ],
    controller.getPresences
  );

  app.get(
    "/dominicall/class/offer",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyDt,
    ],
    controller.getOffers
  );

  app.get(
    "/dominicall/class/event",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
    ],
    controller.getEvents
  );

  app.get(
    "/dominicall/class/teachers",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
    ],
    controller.getClassTeachers
  );

  app.post(
    "/dominicall/class/event",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyUser.justCoord,
      verifyClas.verifyClassId,
      verifyClas.verifyEventDuplication,
    ],
    controller.createEvent
  );

  app.post(
    "/dominicall/class/offer",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyDt,
    ],
    controller.createOffer
  );

  app.post(
    "/dominicall/class/visitor",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyDt,
      verifyClas.verifyVisitorDuplication,
    ],
    controller.createVisitor
  );

  app.post(
    "/dominicall/class/presence",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyDt,
    ],
    controller.createPresence
  );

  app.post(
    "/dominicall/class/student",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyStudentDuplication,
    ],
    controller.createStudent
  );

  app.put(
    "/dominicall/class/teacher/:id",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyClassId,
      verifyClas.verifyId,
    ],
    controller.changeTeacherOrder
  );
};