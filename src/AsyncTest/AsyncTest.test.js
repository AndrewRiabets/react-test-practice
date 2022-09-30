/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import axios from "axios";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncTest from "./AsyncTest";

jest.mock("axios");
const hits = [
  { objectID: "1", title: "Angular" },
  { objectID: "2", title: "React" },
];

describe("async test", () => {
  xit("fetch news from API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    const { getByRole, findAllByRole } = render(<AsyncTest />);
    userEvent.click(getByRole("button"));
    const items = await findAllByRole("listitem");
    expect(items).toHaveLength(2);
    // Additional
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "http://hn.algolia.com/api/v1/search?query=React"
    );
  });

  xit("fetches news from an API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    const { getByRole, findByText } = render(<AsyncTest />);
    userEvent.click(getByRole("button"));
    const message = await findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });

  xit("fetches news from an API (alternative)", async () => {
    const promise = Promise.resolve({ data: { hits } });
    axios.get.mockImplementationOnce(() => promise);
    const { getByRole, getAllByRole } = render(<AsyncTest />);
    userEvent.click(getByRole("button"));
    await act(() => promise);
    expect(getAllByRole("listitem")).toHaveLength(2);
  });
});
