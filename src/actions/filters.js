// SET_TEXT_FILTER 
export const setTextFilter = (text) => ({
  type: "SET_TEXT_FILTER",
  text
});

// SORT_BY_DATE
export const setSortBy = (sortBy) => ({
  type: "SET_SORT_BY",
  sortBy
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate
});