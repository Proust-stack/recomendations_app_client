import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "react-redux";
import HomePage from "../pages/HomePage";

jest.mock("react-redux");

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

const mockState = {
  review: {
    reviewsAll,
  },
  tag: {
    selectedTags,
  },
};

const mockedUseSelector = jest
  .spyOn(reduxHooks, "useSelector")
  .mockImplementation((cb) => cb(mockState));
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("HomePage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });
  it("page snapshot", () => {
    const { reviewsAll } = mockedUseSelector.mockReturnValue(mockState.review);
    const { selectedTags } = mockedUseSelector.mockReturnValue(mockState.tag);
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const view = render(<HomePage />);

    expect(view).toMatchSnapshot();
  });
  // it("render tags", () => {
  //   const view = render(<HomePage />);
  //   mockedUseSelector.mockReturnValue({ reviewsAll });
  //   mockedUseSelector.mockReturnValue({ selectedTags });
  //   const dispatch = jest.fn();
  //   mockedDispatch.mockReturnValue(dispatch);

  //   const textElement = screen.getByText(/strange/i);
  //   expect(textElement).toBeInTheDocument();
  // });
  // it("render reviews", () => {
  //   const view = render(<HomePage />);
  //   mockedUseSelector.mockReturnValue({ reviewsAll });
  //   mockedUseSelector.mockReturnValue({ selectedTags });
  //   const dispatch = jest.fn();
  //   mockedDispatch.mockReturnValue(dispatch);

  //   const textElement = screen.getByText(/Dark Souls/i);
  //   expect(textElement).toBeInTheDocument();
  // });
  // it("reviews dispatch to have been called", () => {
  //   const view = render(<HomePage />);
  //   mockedUseSelector.mockReturnValue({ reviewsAll });
  //   mockedUseSelector.mockReturnValue({ selectedTags });
  //   const dispatch = jest.fn();
  //   mockedDispatch.mockReturnValue(dispatch);
  //   expect(dispatch).toHaveBeenCalled();
  // });
});
