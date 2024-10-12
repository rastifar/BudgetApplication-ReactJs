import { Modal, Button, Stack } from "react-bootstrap";
//utils
import { currencyFormater } from "../utils";
//context
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";

const ViewExpenseModal = ({ budgetId, handleClose, defaultBudgetId }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {expenses.map((expense) => (
          <Stack direction="horizontal" gap="2" key={expense.id}>
            <div className="me-auto fs-4">{expense.description}</div>
            <div className="fs-5">
              {currencyFormater.format(expense.amount)}
            </div>
            <Button size="sm" variant="outline-danger" onClick={() => deleteExpense(expense)}>&times;</Button>
          </Stack>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpenseModal;
