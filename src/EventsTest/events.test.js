/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-debugging-utils */
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Events testing", () => {
  xit("checkbox click", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  xit("double click", () => {
    const onChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={onChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  xit("input focus", () => {
    const { getByTestId } = render(
      <input type="text" data-testid="simple-input" />
    );
    const input = getByTestId("simple-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  xit("focus", () => {
    const { getAllByTestId } = render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  xit("select option", () => {
    const { getByRole, getByText } = render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    userEvent.selectOptions(getByRole("combobox"), "1");
    expect(getByText("A").selected).toBeTruthy();

    userEvent.selectOptions(getByRole("combobox"), "2");
    expect(getByText("B").selected).toBeTruthy();
    expect(getByText("A").selected).toBeFalsy();
  });
});
