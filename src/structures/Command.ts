import { CommandProperties } from '../types'

export default class Command {
    constructor(options: CommandProperties) {
        Object.assign(this, options)
    }
}
