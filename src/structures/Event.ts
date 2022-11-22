import { ClientEvents } from 'discord.js'

export default class Event<K extends keyof ClientEvents> {
    constructor(
        public name: K,
        public main: (...args: ClientEvents[K]) => any
    ) {}
}
