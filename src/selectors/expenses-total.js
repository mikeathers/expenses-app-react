export default (expenses) => {
  return expenses
    .map((expense) => expense.totalCost)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
};