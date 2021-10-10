import reducer, { feedState, initialFeed } from "./postSlice";

describe("post slice", () => {
  describe("reducer, actions and selectors", () => {
    it("should update the feed", () => {
      // Arrange
      const data = {
        feed: [],
      };

      // Act
      const result = reducer(feedState, initialFeed(data));

      // Assert
      //   expect(result).toEqual(nextState);
    });
  });
});
