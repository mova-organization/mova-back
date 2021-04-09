const { RequestRule, BaseAction } = require('../../../../root');
const { UserSchema } = require('../../../schemas/UserSchema');
const { UserModel } = require('../../../models/UserModel');
const { adminPolicy } = require('../../../../policy');
const { moderator } = require('../../../../permissions/roles');

class PromoteUserAction extends BaseAction {
  static get accessTag() {
    return 'users:promote';
  }

  static get validationRules() {
    return {
      body: {
        username: new RequestRule(UserSchema.schema.obj.name),
      },
      params: {
        id: new RequestRule(UserSchema.schema.obj.id, { required: true }),
      },
    };
  }

  static async run(ctx) {
    const { currentUser, params } = ctx;
    const { id } = params;

    adminPolicy(currentUser);

    const data = await UserModel.findByIdAndUpdate(id, { role: moderator });

    return this.result({ data });
  }
}

module.exports = { PromoteUserAction };