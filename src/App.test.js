import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders GREYHOUND", () => {
  render(<App />);
  const linkElement = screen.getByText(/GREYHOUND/i);

  expect(linkElement).toBeInTheDocument();
});
