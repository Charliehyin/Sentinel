module.exports = {
    config: {
        name: 'mute',
        description: 'Mute a member,',
        usage: `mute <member> <duration> <reason>`,
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
        //if member is already muted
        if(message.member.roles.cache.has(role.id)) {
            message.channel.send(`${member} is already muted.`);
        }
        //add muted role
        if(!message.member.roles.cache.has(role.id)) {
            member.roles.add(role).catch(console.error);
            var duration = args[1];
            var reason = args[2];
            message.channel.send(`Muted ${member} for ${duration} with reason "${reason}".`);
        }
        
        
    }
}