const getAppData = require('./../../lib/store-api/get-app-data')
const updateAppData = require('../store-api/update-app-data')

module.exports = async ({ appSdk }) => {
  const d = new Date()
  d.setHours(d.getHours() - 12)
  const storeId = 51266
  const endpoint = '/orders.json' +
    '?financial_status.current=paid&fulfillment_status.current=null' +
    `&financial_status.updated_at>=${d.toISOString()}` +
    `&updated_at<=${(new Date(Date.now() - 1000 * 60 * 5).toISOString())}` +
    '&fields=_id,number' +
    '&sort=created_at'
  const { response } = await appSdk.apiRequest(storeId, endpoint, 'GET')
  const { data: { result } } = response
  console.log('Pedidos buscados', JSON.stringify(result))
  const ordersToQueue = []
  for (let i = 0; i < result.length; i++) {
    const orderId = result[i]._id
    ordersToQueue.push(orderId)
  }
  console.log('Antes da fila', ordersToQueue.length)
  if (ordersToQueue.length) {
    const appData = await getAppData({ appSdk, storeId })
    const action = 'exportation'
    const queue = 'order_ids'
    let queueList = appData[action] && appData[action][queue]
    if (!Array.isArray(queueList)) {
      queueList = []
    }
    ordersToQueue.forEach((nextId) => {
      if (!queueList.includes(nextId)) {
        queueList.unshift(nextId)
      }
    })
  console.log('Já com a fila', queueList.length)
    await updateAppData({ appSdk, storeId }, {
      [action]: {
        ...appData[action],
        [queue]: queueList
      }
    })
  }
  console.log(`${ordersToQueue.length} orders to queue`, { ordersToQueue })
}
