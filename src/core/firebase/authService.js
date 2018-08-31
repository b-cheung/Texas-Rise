import * as fbAPI from './fbAPI';

const roles = {
  admin: 'admin',
  officer: 'officer',
  member: 'member',
  student: 'student'
};

export const error = new Error('Unauthorized access');

export function isAdminOrOfficer(user) {
  const allowedRoles = [roles.admin, roles.officer];
  return checkAuthorization(user, allowedRoles);
}

export function isAdmin(user) {
  const allowedRoles = [roles.admin];
  return checkAuthorization(user, allowedRoles);
}

export function isOfficer(user) {
  const allowedRoles = [roles.officer];
  return checkAuthorization(user, allowedRoles);
}

export function isMember(user) {
  const allowedRoles = [roles.member];
  return checkAuthorization(user, allowedRoles);
}

export function isStudent(user) {
  const allowedRoles = [roles.student];
  return checkAuthorization(user, allowedRoles);
}

function checkAuthorization(user, allowedRoles) {
  if (!isLoggedIn || user == null) return false;
  for (const role of allowedRoles) {
    if (user.role === role) {
      return true;
    }
  }
  console.tron.log('does not match role');
  return false;
}

export function isLoggedIn() {
  if (fbAPI.getAuthUser()) {
    return true;
  } 
  return false;
}
