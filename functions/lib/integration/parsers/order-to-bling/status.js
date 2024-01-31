module.exports = order => {
  let financialStatus = order.financial_status && order.financial_status.current
  if (!financialStatus) {
    const paymentsHistory = order.payments_history
    if (paymentsHistory && paymentsHistory.length) {
      financialStatus = paymentsHistory[paymentsHistory.length - 1].status
    }
  }

  switch (financialStatus) {
    case 'pending':
    case 'under_analysis':
    case 'unknown':
    case 'authorized':
    case 'partially_paid':
      return 'em aberto'
    case 'voided':
    case 'refunded':
    case 'in_dispute':
    case 'unauthorized':
    case 'partially_refunded':
      return 'cancelado'
  }

  switch (order.fulfillment_status && order.fulfillment_status.current) {
    case 'in_production':
      return ['em produção']
    case 'in_separation':
      return ['em separação']
    case 'invoice_issued':
      return ['faturado']
    case 'ready_for_shipping':
      return ['pronto para envio', 'pronto envio']
    case 'shipped':
    case 'partially_shipped':
      return ['enviado']
    case 'delivered':
      return ['entregue']
  }

  if (financialStatus && financialStatus === 'paid') {
    return ['pronto para emitir nf-e']
  }
  return 'em aberto'
}