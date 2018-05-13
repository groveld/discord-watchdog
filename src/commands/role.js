/**
 * role.js
 * 
 * Add and remove roles.
 * Should only add/remove roles lower than highest role assigned to the user executing the command.
 * ex. Admin can assign and remove the moderator role but not the administrator role.
 */

exports.run = async (client, message, args, level) => {
  let perms = message.member.permissions;
  
  // const user = message.mentions.users.first();
  // const amount = Math.min((!!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1])), 100);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 3 // Moderator
};

exports.help = {
  name: "role",
  description: "Add or remove roles to users.",
  usage: "role <add/remove> <role> <@user>"
};
