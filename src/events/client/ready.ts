import { ActivityType } from 'discord.js'
import { client } from '../..'
import Event from '../../structures/Event'
import logger from '../../utils/logger'

export default new Event('ready', () => {
    logger(`Client is now online, ${client.user?.tag}`).info()
    client.user?.setActivity({
        type: ActivityType.Listening,
        name: `#scrapbook`,
    })
})
