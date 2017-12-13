import moment from "moment";

export default (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  })
  .sort((a, b) => {
    if (sortBy === "date") {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === "amount") {
      return a.totalCost < b.totalCost ? 1 : -1;
    }
  });
}

// ------------- Expense Date Filter -------------

// Tests if the expense.createdAt date is inbetween the startDate and endDate specified, if it is return true, if not return false.
// If no startDate/endDate has been set return true, this means if the startDate/endDate filters get removed, display all expenses.
// startDateMatch, endDateMatch and textMatch all need to be true for the expense to be added to the new filtered array. 

// --- Example 1 ---
// startDate = 01/11
// endDate = 30/11
// createdAt = 20/10

// if 01/11 is the same or before 20/10 return true else return false - returns false.
// if 31/11 is the same or after 20/10 return true else return false - returns true.
// Both values need to be true for the expense to be returned. 

// --- Example 2 ---
// startDate = 01/11
// endDate = 30/11
// createdAt = 03/12

// if 01/11 is the same or before the 03/12 return true else return false - returns true.
// if 30/11 is the same or after the 03/12 return true else return false - returns false.
// Both values need to be true for the expense to be returned.

// --- Example 3 ---
// startDate = 01/11
// endDate = 30/11
// createdAt = 10/11

// if 01/11 is the same or before 10/11 return true else return false - returns true.
// if 31/11 is the same or after 10/11 return true else return false - returns true.
// Expense is added to the new filtered array because both values are true.


// ------------- Text Filter -------------

// By default text is set to "" so all expenses get returned as "" is nothing. 
// When you specify a text value the description of each result is checked to see if it contains the value 
// of text passed in. If the description contains the value of text, textMatch gets returned as true.
// If startDateMatch, endDateMatch and textMatch all equal true the expense will be added to the new filtered array. 


// ------------- Sort -------------
// .sort is a JavaScript function which takes 2 values and compares them, the values will be each expense in the filtered array.
// Each expense will be compared to the last and be sorted accordingly.
// if the createdAt value of the current expense is greater than the previous, 1 will be returned meaning this has a
// higher position in the sorted list, else -1 gets returned meaning that expense has a lower position. 
// The same goes for the totalCost value of each expense.
