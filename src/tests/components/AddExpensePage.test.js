import React from "react";
import { shallow } from "enzyme";

import { AddExpensePage } from "../../components/AddExpensePage";
import expenseForms from "../fixtures/expenseForms";

test("should render AddExpensePage correctly", () => {
  const wrapper = shallow(<AddExpensePage expenseForm={expenseForms[0]} />);
  expect(wrapper).toMatchSnapshot();
});