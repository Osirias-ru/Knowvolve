const allRoles = {
  user: ['createCourse', 'manageCourse', 'getUsers'],
  admin: ['createCourse', 'manageCourse', 'getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
