

export default function formatCurrency(currencyString: string) {
    let convertNumber = currencyString.toString()
    let firstHalf = convertNumber.substring(0, convertNumber.length - 2);
    let secondHalf = convertNumber.substring(convertNumber.length - 2, convertNumber.length);
    return parseFloat(`${firstHalf}.${secondHalf}`).toLocaleString('en-EN', { style: 'currency', currency: 'USD' });
}