import chalk from 'chalk'

export default (msg: string) => {
    return {
        warn: () => {
            console.log(`${chalk.yellowBright('phil')} ${msg}`)
        },
        info: () => {
            console.log(`${chalk.cyanBright('phil')} ${msg}`)
        },
        error: (exit?: boolean) => {
            console.log(`${chalk.redBright('phil')} ${msg}`)
            if (exit) {
                process.exit(0)
            }
        },
        api: () => {
            console.log(`${chalk.magentaBright('phil')} ${msg}`)
        },
    }
}
