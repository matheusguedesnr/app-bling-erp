module.exports = situacao => {
  let financialStatus, fulfillmentStatus
  switch (situacao) {
    case 'venda agenciada':
    case 'aprovado':
    case 'pronto para emitir nfe-e':
      financialStatus = 'paid'
      break
    case 'em andamento':
      fulfillmentStatus = 'in_separation'
      break
    case 'faturado':
    case 'atendido':
      fulfillmentStatus = 'shipped'
      break
    case 'pronto para envio':
      fulfillmentStatus = 'ready_for_shipping'
      break
    case 'enviado':
    case 'despachado':
      fulfillmentStatus = 'shipped'
      break
    case 'entregue':
      fulfillmentStatus = 'delivered'
      break
    case 'cancelado':
      financialStatus = 'voided'
      break
  }
  return { financialStatus, fulfillmentStatus }
}
