import { JoinLeftSharp } from "@mui/icons-material";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "react-redux";
import * as actions from "../slices/reviewSlice";

import HomePage from "../pages/HomePage";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");
describe("HomePage", () => {
  //afterEach(cleanup);
  it("page snapshot", () => {
    const view = render(<HomePage />);
    expect(view).toMatchSnapshot();
  });
  it("render tags", () => {
    mockedUseSelector.mockReturnValue([]);
    mockedDispatch.mockResolvedValue(jest.fn());
    //expect(view).toMatchSnapshot();
  });
});
