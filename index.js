const fromEntries = require('./fromEntries')
const Docker = require('dockerode')
const docker = new Docker()

const [ id, token ] = process.env.WEBHOOK_URL.split('/').slice(5, 7)

const Discord = require('discord.js')
const hook = new Discord.WebhookClient(id, token)
let last

const send = m => { hook.send(m); console.log(m) }

setInterval(async () => {
  const containers = await docker.listContainers({ all: true })
  const list = containers.map(({ Names: [ name ], State: state }) => ({ [name.slice(1, name.length)]: state })).reduce((prev, curr) => ({ ...prev, ...curr }), {})
  if (!last) {
    last = list
    return
  }
  Object.keys(last).forEach(name => {
    if (!list[name]) {
      send(`${name} was removed!`)
      return
    }
    if (last[name] !== list[name]) send(`${name}'s state changed! ${list[name]}`)
  })
  // const newContainers = fromEntries(Object.entries(list).filter(([name]) => !last[name]))
  // console.log(JSON.stringify(newContainers, null, 2))
  last = list
}, 5000)
