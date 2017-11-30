import React from "react";
import { shallow } from "enzyme";

import AddExpensePage from "../../components/AddExpensePage";

test("should render AddExpensePage correctly", () => {
  const wrapper = shallow(<AddExpensePage />);
  expect(wrapper).toMatchSnapshot();
});