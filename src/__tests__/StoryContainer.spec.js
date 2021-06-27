import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { StoriesContainer } from "../containers/StoriesContainer";
import { storyIds, singularStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/hnApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";

//cleanup the DOM before each test
beforeEach(cleanup);

// set up initial mock
jest.mock("../hooks/useInfiniteScroll.js");

jest.mock("../services/hnApi", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

test("renders the stories container with a story", async () => {
  useInfiniteScroll.mockImplementation(() => ({
    count: STORY_INCREMENT,
  }));
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<StoriesContainer />);
  await waitFor(() => [
    expect(getByText("News Center Stories")).toBeTruthy(),
    expect(getByText("Tarnshed: Google Responds")).toBeTruthy(),
    expect(queryByTestId("story-by").textContent).toEqual(
      "By: Charles Ukasoanya"
    ),
  ]);
});
