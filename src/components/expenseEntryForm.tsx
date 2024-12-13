import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FiDollarSign } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { categories } from "../App";

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
const ExpenseEntryForm = ({onSubmitHandler,expenseId}:Readonly<Props>) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data:FieldValues) => {
    const expense: Expense = {
      id: expenseId,
      expense: data.description,
      amount: data.amount,
      date: data.date.toISOString(),
      category: data.category
    };
    onSubmitHandler(expense);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Expense Entry
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Track your expenses efficiently
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <input
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 3,
                      message: "Description must be at least 3 characters"
                    }
                  })}
                  type="text"
                  id="description"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter expense description"
                />
                {errors.description && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <MdError className="mr-1" />
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  {...register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid amount"
                    },
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0"
                    }
                  })}
                  type="number"
                  step="0.01"
                  id="amount"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
                {errors.amount && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <MdError className="mr-1" />
                    {errors.amount.message}
                  </div>
                )}
              </div>
            </div>
<div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <div className="mt-1">
                <input
                  {...register("date", {
                    required: "Date is required"
                  })}
                  type="date"
                  id="date"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.date && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <MdError className="mr-1" />
                    {errors.date.message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                id="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value=""></option>
                 {categories.map((category) => (
                     <option key={category} value={category}>
                        {category}
                      </option>
                 ))}
              </select>
              {errors.category && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <MdError className="mr-1" />
                  {errors.category.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Submit Expense
            </button>
          </div>
        </form>

        {isSubmitted && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
            Expense submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseEntryForm;