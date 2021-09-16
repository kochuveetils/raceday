import { render, screen } from "@testing-library/react";
import App from "./App";
import { baseUrl } from "./static";

test("API Response", async () => {
  const response = await fetch(baseUrl)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    })
    .catch((error) => error);

  let expected = `PASS`;
  let actual = `FAIL`;
  if (response.ok) actual = `PASS`;
  console.warn(response);
  expect(expected).toEqual(actual);
});

test("renders GREYHOUND", () => {
  render(<App />);
  const linkElement = screen.getByText(/GREYHOUND/i);

  expect(linkElement).toBeInTheDocument();
});
