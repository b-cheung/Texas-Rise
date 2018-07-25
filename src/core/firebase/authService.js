import { auth, firestore } from '../../core/firebase/FirebaseConfig';
import * as fbAPI from './fbAPI';

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

function isLoggedIn() {
  if (fbAPI.getCurrentUser()) {
    return true;
  } 
  return false;
}
