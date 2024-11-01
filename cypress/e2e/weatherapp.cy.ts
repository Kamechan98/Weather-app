describe("Weather app tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should contain the button", () => {
    cy.get("button").should("contain.text", "Get weather");
  });
  it("should present the local weather", () => {
    cy.intercept("https://api.openweathermap.org/data/2.5/weather*", {
      weather: [
        {
          id: 800,
          main: "Det regnar här i Stockholm idag",
          description: "Du har det säkre bättre än jag",
          icon: "10d",
        },
      ],
      main: {
        temp: 30,
        feels_like: 100,
      },
      sys: {
        country: "SV",
        sunrise: 1730441278,
        sunset: 1730472912,
      },
      name: "Det regnar här i Stockholm idag",
    });

    cy.get("button").click();

    cy.get("h2").should("contain.text", "Det regnar här i Stockholm idag");
    cy.get("p").should("contain.text", "Du har det säkre bättre än jag");
    cy.get("span").should("contain.text", "30");
    cy.get("img").should("have.attr", "src").and("include", "10d");
  });
});
