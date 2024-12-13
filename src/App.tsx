import { useEffect, useState } from 'react'


import ExpenseForm from './components/expensForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import ExpenseTracking from './components/expense-tracking'
import Category from './components/expense-category'


interface Expense {
    id: number;
    expense: string;
    amount: number;
    date: string;
    category: string;
}
function App() {
  
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const [expenses, setExpenses] = useState<Expense[]>([ ])

 
  useEffect(() => {
    setExpenses([...expenses,
      { id: 1, expense: "Groceries", amount: 50, date: "2023-01-01", category: "Food" },
    { id: 2, expense: "Movie", amount: 20, date: "2023-01-02", category: "Entertainment" },
    { id: 3, expense: "Gas", amount: 30, date: "2023-01-03", category: "Transportation" },
    { id: 4, expense: "Dinner", amount: 40, date: "2023-01-04", category: "Food" },
    { id: 5, expense: "Concert", amount: 60, date: "2023-01-05", category: "Entertainment" },
    { id: 6, expense: "Parking", amount: 10, date: "2023-01-06", category: "Transportation" },
    { id: 7, expense: "Lunch", amount: 25, date: "2023-01-07", category: "Food" },
    { id: 8, expense: "Theater", amount: 35, date: "2023-01-08", category: "Entertainment" },
    { id: 9, expense: "Tolls", amount: 15, date: "2023-01-09", category: "Transportation" },
    { id: 10, expense: "Breakfast", amount: 45, date: "2023-01-10", category: "Food" },
    { id: 11, expense: "Concert", amount: 55, date: "2023-01-11", category: "Entertainment" },
    { id: 12, expense: "Taxi", amount: 20, date: "2023-01-12", category: "Transportation" },
    { id: 13, expense: "Dinner", amount: 40, date: "2023-01-13", category: "Food" }
    ] )
  }, [])
  const visibleExpenses = selectedCategory ? expenses.filter(expense => expense.category.toLowerCase( ) === selectedCategory.toLowerCase( )) : expenses
  return (
    <>
    <h1>Expense Tracker</h1>
      
      
      <div >
        <ExpenseForm onSubmitHandler={(expense) => setExpenses([...expenses, expense])} expenseId={expenses.length + 1} />
      </div>
      <div className='mb-3'>
        <Category onSelect={(category) => setSelectedCategory(category)} />
      </div>
     <div className='mb-3'>
        <ExpenseTracking expenses={visibleExpenses} onDelete={(id) => setExpenses(expenses.filter(expense => expense.id !== id))} />
      </div>
    </>
  )
}

export default App

