import { render } from "@testing-library/react";
import Card from "../components/Card";

test("renders plain Card", () => {
  const { container } = render(<Card />);
  expect(container.firstChild).toMatchSnapshot();
});

test("renders Card with props", () => {
  const { container } = render(<Card background="white" />);
  expect(container.firstChild).toMatchSnapshot();
});
