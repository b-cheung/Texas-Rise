import * as fbAPI from './fbAPI';

export function isAdminOrOfficer(user) {
  const allowedRoles = ['admin', 'officer'];
  return checkAuthorization(user, allowedRoles);
}

export function isAdmin(user) {
  const allowedRoles = ['admin'];
  return checkAuthorization(user, allowedRoles);
}

export function isOfficer(user) {
  const allowedRoles = ['officer'];
  return checkAuthorization(user, allowedRoles);
}

export function isMember(user) {
  const allowedRoles = ['member'];
  return checkAuthorization(user, allowedRoles);
}

export function isStudent(user) {
  const allowedRoles = ['student'];
  return checkAuthorization(user, allowedRoles);
}

function checkAuthorization(user, allowedRoles) {
  if (!isLoggedIn || user == null) return false;
  for (const role of allowedRoles) {
    if (user.role === role) {
      return true;
    }
  }
  return false;
}

export function isLoggedIn() {
  if (fbAPI.getAuthUser()) {
    return true;
  } 
  return false;
}
