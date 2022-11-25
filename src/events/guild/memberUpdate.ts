import { TextChannel } from 'discord.js'
import { CONFIG, EMOJIS } from '../../constants'
import Event from '../../structures/Event'

export default new Event('guildMemberUpdate', (oldMember, newMember) => {
    if (
        !oldMember.roles.cache.has(CONFIG.roles.booster) &&
        newMember.roles.cache.has(CONFIG.roles.booster)
    ) {
        const welcomeChannel = newMember.guild.channels.cache.find(
            (f) => f.id === CONFIG.channels.welcome
        ) as TextChannel
        if (!welcomeChannel) return
        welcomeChannel.send({
            content: `${EMOJIS.badge_booster} <@${newMember.user.id}> has boosted! We now current have **${newMember.guild.premiumSubscriptionCount}** boosts.`,
        })
    }
})
