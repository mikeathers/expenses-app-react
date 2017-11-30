import { addExpense, editExpense, removeExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";

test("should generate addExpense action object", () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[0]
  });
});