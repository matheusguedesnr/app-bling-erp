module.exports = situacao => {
  console.log('situacao pedido bling: ', situacao)
  let financialStatus, fulfillmentStatus
  switch (situacao) {
    case 'venda agenciada':
    case 'aprovado':
    case 'pronto para emitir nf-e':
      financialStatus = 'paid'
      break
    case 'em andamento':
      fulfillmentStatus = 'in_separation'
      break
    case 'em tratativa com o cliente':
    case 'correção de itens':
    case 'aguardando ressarcimento':
    case 'alterar transportador':
    case 'pendente':
    case 'aguardando devolução':
    case 'em tratativa com transportadora':
    case 'aguardando ressarcimento':
      fulfillmentStatus = undefined
      break
    case 'faturado':
    case 'atendido':
      fulfillmentStatus = 'invoice_issued'
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
