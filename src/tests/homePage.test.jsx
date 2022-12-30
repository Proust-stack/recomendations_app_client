import { JoinLeftSharp } from "@mui/icons-material";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "react-redux";

import HomePage from "../pages/HomePage";

jest.mock("react-redux");

describe("HomePage", () => {
  //afterEach(cleanup);
  it("page snapshot", () => {
    const view = render(<HomePage />);
    expect(view).toMatchSnapshot();
  });
  it("render tags", () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue([]);
    //expect(view).toMatchSnapshot();
  });
});
