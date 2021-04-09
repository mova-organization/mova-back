const BaseRoleAccess = require('./BaseRoleAccess');

class RoleAdminAccess extends BaseRoleAccess {
  static get can() {
    return { ...this.basePermissions, 'users:promote': true };
  }
}

module.exports = RoleAdminAccess;
