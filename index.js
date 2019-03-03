const Docker = require('dockerode')
const docker = new Docker()

const [ id, token ] = process.env.WEBHOOK_URL.split('/').slice(5, 7)

const Discord = require('discord.js')
const hook = new Discord.WebhookClient(id, token)
let last

setInterval(async () => {
  const containers = await docker.listContainers()
  const list = containers.map(({ Names: [ name ], State: state }) => ({ name, state }))
  console.dir(list)
  hook.send(JSON.stringify(list, null, 2), { code: true })
}, 1000)
