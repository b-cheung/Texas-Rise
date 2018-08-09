import * as fbAPI from './fbAPI';

export function fetchAnnouncementsAuth(userRole) {
  switch (userRole) {
    case 'admin':
      return 'audience'
  }
}

export function isAdminOrOfficer(user) {
  const allowedRoles = ['admin', 'officer'];
  return checkAuthorization(user.role, allowedRoles);
}

export function isAdmin(user) {
  const allowedRoles = ['admin'];
  return checkAuthorization(user.role, allowedRoles);
}

export function isOfficer(user) {
  const allowedRoles = ['officer'];
  return checkAuthorization(user.role, allowedRoles);
}

export function isMember(user) {
  const allowedRoles = ['member'];
  return checkAuthorization(user.role, allowedRoles);
}

export function isStudent(user) {
  const allowedRoles = ['student'];
  return checkAuthorization(user.role, allowedRoles);
}

function checkAuthorization(userRole, allowedRoles) {
  if (!isLoggedIn) return false;
  for (const role of allowedRoles) {
    if (userRole === role) {
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
