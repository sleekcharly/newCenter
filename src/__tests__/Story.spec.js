import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Story } from "../components/Story";
import { singularStory } from "../fixtures";
import { getStory } from "../services/hnApi";

//cleanup the DOM before each test
beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

// set up initial mock
jest.mock("../services/hnApi", () => ({
  getStory: jest.fn(),
}));

test("renders the story component with content", async () => {
  getStory.mockImplementation(() => Promise.resolve(singularStory));

  const { getByText, getByTestId } = render(<Story storyId="1" />);
  await waitFor(() => [
    expect(getByTestId("story")).toBeTruthy(),
    expect(getByText("Tarnshed: Google Responds")).toBeTruthy(),
    expect(getByTestId("story-by").textContent).toEqual(
      "By: Charles Ukasoanya"
    ),
  ]);
});
