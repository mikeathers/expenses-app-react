import React from "react";
import { shallow } from "enzyme";

import ExpenseSummary from "../../components/ExpenseSummary";

test("should render ExpenseSummary correctly", () => {
  const wrapper = shallow(<ExpenseSummary />);
  expect(wrapper).toMatchSnapshot();
});