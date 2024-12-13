import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import  categories  from "./global";


interface Expense {
    id: number;
    expense: string;
    amount: number;
    date: string;
    category: string;
}

interface Props{
  onSubmitHandler:(expense :Expense)=>void;
  expenseId:number;
}

const schema = z.object({
    expense: z.string().min(3, { message: "Expense must be at least 3 characters" }).max(50, { message: "Expense must be at most 50 characters" }),
    amount: z.number().gt(0, { message: "Amount must be greater than 0" }),
    date: z.date().min(new Date("2023-01-01"), { message: "Date must be after 2023-01-01" }),
    // category: z.string().min(1, { message: "Category must be selected" })
    category : z.enum(categories, {
        errorMap: () => ({ message: "Category must be selected" })
    })
})
type FormData = z.infer<typeof schema>;
function ExpenseForm({onSubmitHandler,expenseId}:Readonly<Props>) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    
    const onSubmit = (data: FieldValues) => {
      const expense: Expense = {
        id: expenseId,
        expense: data.expense,
        amount: data.amount,
        date: data.date.toISOString(),
        category: data.category
      };
      onSubmitHandler(expense);
      reset();
    };
    return (
    
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="expense" className="form-label">Expense</label>
          <input {...register("expense")} type="text" className="form-control" id="expense" />
          {errors.expense && <p className="text-danger">{errors.expense.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input {...register("amount", { valueAsNumber: true })} type="number" className="form-control" id="amount" />
          {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input {...register("date", { valueAsDate: true })} type="date" className="form-control" id="date" />
          {errors.date && <p className="text-danger">{errors.date.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select {...register("category")} className="form-select" id="category">
            <option value="" selected> Choose a category</option>
            {categories.map((category: string) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-danger">{errors.category.message}</p>}
        </div>
        <button  type="submit" className="btn btn-primary">Submit</button>
      </form>

  );
}

export default ExpenseForm;