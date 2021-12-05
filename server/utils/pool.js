let clients = {};

const subscribe = (id, res) => {
  clients[id] = res;
}

const publishFor = (id, data) => {

  if (clients[id])
    clients[id].send(data)

}

module.exports = {
  subscribe,
  publishFor
}