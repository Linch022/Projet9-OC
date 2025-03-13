import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

jest.mock("../../containers/Slider", () => () => <div data-testid="slider-mock">Slider mock</div>);

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-05-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
    it("a list of events is displayed", async () => {
      render(
        <Home />
    );   
      const events = await screen.findByTestId("eventList-testid");
      expect(events).toBeInTheDocument();
  })
  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleCards = screen.getAllByTestId("peoplecard-testid");
    expect(peopleCards.length).toBeGreaterThan(1);
    
  })
  it("a footer is displayed", () => {
    render(<Home />);
    const footer =  screen.getByTestId("footer-testid");    
    expect(footer).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockResolvedValue(data);
    render(
      <DataProvider>
      <Home />
    </DataProvider>
    );    
    const footer = screen.getByTestId("footer-testid");

    await waitFor(() => {
      expect(within(footer).getByText("Forum #productCON")).toBeInTheDocument();
    });
  });
});
