const { authJwt, verifyGroup, verifyUser } = require("../middlewares");
const controller = require("../controllers/group.controller");

module.exports = function(app) {
  app.get(
    '/dominicall/group',
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
    ],
    controller.userGroups
  );

  app.post(
    "/dominicall/group",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
      verifyGroup.verifyGroupDuplicity,
    ],
    controller.create
  );

  app.put(
    "/dominicall/group",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
    ],
    controller.update
  );

  app.delete(
    "/dominicall/group/:id",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
    ],
    controller.remove
  );

  app.get(
    "/dominicall/group/member",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
    ],
    controller.groupMembers
  );

  app.post(
    "/dominicall/group/member",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
      verifyGroup.verifyGroupMemberDuplicity,
    ],
    controller.createMember
  );

  app.delete(
    "/dominicall/group/member/:id",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
    ],
    controller.removeMember
  );
};