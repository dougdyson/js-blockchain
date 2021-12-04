const formatTransaction = (toAddress, fromAddress, amount) => {
  const timestamp = Date.now()
  return {toAddress, fromAddress, amount, timestamp}
}

module.exports = { formatTransaction };