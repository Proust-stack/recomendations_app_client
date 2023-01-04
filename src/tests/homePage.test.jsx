import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "react-redux";
import * as actions from "../slices/reviewSlice";
import HomePage from "../pages/HomePage";
jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

const reviewsAll = {
  hottestReviews: [
    {
      markdown:
        "Dark Souls 2 is a challenging and atmospheric action role-playing game set in a dark",
    },
  ],
  lattestReviews: [
    {
      markdown:
        "Dark Souls 2 is a challenging and atmospheric action role-playing game set in a dark",
    },
  ],
};
const selectedTags = [" begood", "strange"];

describe("HomePage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });
  it("page snapshot", () => {
    mockedUseSelector.mockReturnValue({ reviewsAll });
    mockedUseSelector.mockReturnValue({ selectedTags });
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    const view = render(<HomePage />);
    expect(view).toMatchSnapshot();
  });
  it("render tags", () => {
    mockedUseSelector.mockReturnValue({ reviewsAll });
    mockedUseSelector.mockReturnValue({ selectedTags });
    mockedDispatch.mockResolvedValue(jest.fn());
    const dispatch = jest.fn();
    screen.findByText(/strange/i).to;
  });
  it("render reviews", () => {
    mockedUseSelector.mockReturnValue({ reviewsAll });
    mockedUseSelector.mockReturnValue({ selectedTags });
    mockedDispatch.mockResolvedValue(jest.fn());
    const dispatch = jest.fn();
  });
  it("reviews dispatch to have been called", () => {
    mockedUseSelector.mockReturnValue({ reviewsAll });
    mockedUseSelector.mockReturnValue({ selectedTags });
    mockedDispatch.mockResolvedValue(jest.fn());
    const dispatch = jest.fn();
    expect(dispatch).toHaveBeenCalled();
  });
});
