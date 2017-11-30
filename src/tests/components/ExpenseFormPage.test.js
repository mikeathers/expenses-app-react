import React from "react";
import { shallow } from "enzyme";

import { ExpenseFormPage } from "../../components/ExpenseFormPage";

test("should render ExpenseFormPage correctly", () => {
  const wrapper = shallow(<ExpenseFormPage expenseForm={{}}/>);
  expect(wrapper).toMatchSnapshot();
});