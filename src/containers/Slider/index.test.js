import { fireEvent, render, screen, act } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  beforeEach(() => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
  });

  it("a list card is displayed", async () => {
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });

  it("change slide when clicking on a radio button", async () => {
    const { container } = render(
      <DataProvider>
      <Slider />
    </DataProvider>
    );
    
    await screen.findByText("World economic forum");

    const buttons = container.querySelectorAll('input[type="radio"');
    expect(buttons.length).toBeGreaterThan(1);

    fireEvent.click(buttons[1]);
    await screen.findByText("World Gaming Day");
  });

  it("automatically change slide after 5sec", async () => {
    jest.useFakeTimers();
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    act(() => {
      jest.advanceTimersByTime(5000)
    });

    await screen.findByText("World Gaming Day");
  });
});
