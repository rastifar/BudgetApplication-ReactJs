import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormater } from "../utils";

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  onViewExpenseClick,
  hideButtons,
}) => {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }
  return (
    <Card>
      <Card.Body className={classNames.join(" ")}>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormater.format(amount)}/
            {max && (
              <span className="text-muted fs-6 ms-1">
                {currencyFormater.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expenses
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpenseClick}>View Expenses</Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

export default BudgetCard;
