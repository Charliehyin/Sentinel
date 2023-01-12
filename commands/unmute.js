module.exports = {
    config: {
        name: 'unmute',
        description: 'Unmutes a member by mention, username, nickname, or id',
        usage: `unmute <member>`,
    },
    async run (bot,message,args) {
        //fetch muted role
        let role = message.guild.roles.cache.find(role => role.name === "Muted");
        //retreive member by mention
        let member = message.mentions.members.first()
        if(member === undefined) { //retreive member by display name
            member = message.guild.members.cache.find(user => user.displayName == args[0]);
        }
        if(member === undefined) { //retreive member by id
            member = message.guild.members.cache.get(args[0]);
        }
        if(member === undefined) {
            message.channel.send(`Could not find user ${args[0]}`);
            return;
        }
        //end the command if the member is not manageable
        //if(!(member.moderateable)) {
            //message.channel.send(`Unable to unmute. Your highest role is lower than or equal to ${member}'s. `)
            //return;
        //}
        //if member is not muted
        if(!message.member.roles.cache.has(role.id)) {
            message.channel.send(`${member} is not muted.`);
        }
        //remove muted role
        if(message.member.roles.cache.has(role.id)) {
            member.roles.remove(role).catch(console.error);
            message.channel.send(`Unmuted ${member}.`);
        }
    }
}