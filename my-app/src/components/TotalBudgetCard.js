import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = (props) => {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;
  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
};

export default TotalBudgetCard;
