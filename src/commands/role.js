/**
 * role.js
 *
 * Add and remove roles.
 * Should only add/remove roles lower than highest role assigned to the user executing the command.
 * ex. Admin can assign and remove the moderator role but not the administrator role.
 */

module.exports = {
  name: 'role',
  description: 'Add or remove roles to users.',
  usage: 'role <add/remove> <role> <@user>',
  execute(message, args) {},
};