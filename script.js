const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id != ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')


    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>        
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x    
    </button>`

    transactionsUl.append(li)

}

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(transaction => transaction.amount)
    const total = transactionsAmounts.reduce((accumulator, transaction) => transaction + accumulator, 0).toFixed(2)
    const income = transactionsAmounts.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    const expense = transactionsAmounts.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    const WithoutMinus = or = Math.abs(expense)

    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${WithoutMinus}`
    balanceDisplay.textContent = `R$ ${total}`

}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()

}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)


form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmout = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmout === '') {
        alert('Por favor, preencha o nome e o valor da transação')
        return
    }

    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmout)
       
    }
    
    
    transactions.push(transaction)
    init()
    updateLocalStorage()
   

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})
