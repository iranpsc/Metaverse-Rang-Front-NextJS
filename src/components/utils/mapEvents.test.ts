import { describe, expect, it } from "vitest";
import { mapEvents, type EventItem } from "./mapEvents";

const validEvent: EventItem = {
  id: 1,
  title: "Sandbox event",
  description: "A deterministic event fixture",
  starts_at: "1405/08/10 12:00",
  ends_at: "1405/08/10 13:00",
  btn_link: "/events/1",
  btn_name: "View event",
  color: "#123456",
  dislikes: 2,
  likes: 8,
  image: "/event.webp",
  views: 30,
  user_interaction: { has_liked: true, has_disliked: false },
};

describe("mapEvents", () => {
  it("maps the backend event contract without losing fields", () => {
    expect(mapEvents([validEvent])).toEqual([
      {
        id: 1,
        title: "Sandbox event",
        image: "/event.webp",
        link: "/events/1",
        desc: "A deterministic event fixture",
        start: "1405/08/10 12:00",
        end: "1405/08/10 13:00",
        color: "#123456",
        views: 30,
        likes: 8,
        disLikes: 2,
        userLiked: true,
        userDisLiked: false,
        btnName: "View event",
      },
    ]);
  });

  it("maps nullable user interaction to false flags", () => {
    expect(mapEvents([{ ...validEvent, user_interaction: null }])[0]).toMatchObject({
      userLiked: false,
      userDisLiked: false,
    });
  });

  it("returns an empty array for a valid empty API collection", () => {
    expect(mapEvents([])).toEqual([]);
  });

  it.each([undefined, null, {}, "events"])(
    "rejects a non-array API payload (%s)",
    (payload) => {
      expect(() => mapEvents(payload as EventItem[])).toThrow(
        /expected an events array/,
      );
    },
  );

  it("rejects an event missing required backend fields", () => {
    expect(() => mapEvents([{ id: 1, title: "Incomplete" } as EventItem])).toThrow(
      /event at index 0 is missing required fields/,
    );
  });
});
