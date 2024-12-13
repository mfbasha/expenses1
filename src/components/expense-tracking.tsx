


interface Expense {
    id: number;
    expense: string;
    amount: number;
    date: string;
    category: string;
}
interface Props {
    expenses: Expense[];
    onDelete: (id: number) => void;
}
function ExpenseTracking({expenses, onDelete}:Readonly<Props>) {
   if (expenses.length === 0) return null;
    return (
   <table className="table">
    <thead>
        <tr>
            <th scope="col">id</th>
            <th scope="col">Expense</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Category</th>
        </tr>
    </thead>
    <tbody>
        {expenses.map((expense) => (
            <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.expense}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>
                    <button className="btn btn-danger " onClick={() => onDelete(expense.id)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>${expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</td>
        </tr>
    </tfoot>
    </table>
  )
}export default ExpenseTracking