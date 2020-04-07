export default function currencyFilter(value, currency = 'EUR') {
    return new Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency
    }).format(value)
}