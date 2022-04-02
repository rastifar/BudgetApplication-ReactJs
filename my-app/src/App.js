import { Button, Stack } from "react-bootstrap";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
//Components
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal"; 
import ViewExpenseModal from "./components/ViewExpenseModal";
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from "./components/TotalBudgetCard";
//context
import { useBudgets,UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetContext";
const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();
  
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  
  
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Buggets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Bugget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "reapeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={()=>setViewExpenseModalBudgetId(budget.id)}
              />
             
            );
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={()=>setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetCard/>
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
       <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId ={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
         <ViewExpenseModal
        budgetId = {viewExpenseModalBudgetId}
       
        handleClose={() => setViewExpenseModalBudgetId()}
      />
    </>
  );
};

export default App;
