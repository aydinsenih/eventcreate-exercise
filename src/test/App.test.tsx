import App from "../App";
import TablePage from "../pages/TablePage";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { User } from "../components/Table";

HTMLCanvasElement.prototype.getContext = jest.fn();

test("demo", () => {
    expect(true).toBe(true);
});

test("Renders the main page", () => {
    render(<App />);
    expect(true).toBeTruthy();
});

describe("TablePage Component", () => {
    const mockData: User[] = [
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            age: 30,
            custom_field: { label: "", value: "" },
        },
        {
            id: "2",
            name: "Jane Doe",
            email: "jane@example.com",
            age: 25,
            custom_field: { label: "", value: "" },
        },
    ];
    const mockSetData = vi.fn();

    beforeAll(function () {
        render(<TablePage data={mockData} setData={mockSetData} />);
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders table with initial data", () => {
        render(<TablePage data={mockData} setData={mockSetData} />);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Doe")).toBeInTheDocument();
        expect(screen.getByTestId("add-button")).toBeInTheDocument();
    });

    it("opens modal when adding a member", () => {
        render(<TablePage data={mockData} setData={mockSetData} />);
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    it("validates form inputs on submission", () => {
        render(<TablePage data={mockData} setData={mockSetData} />);

        const addButton = screen.getByText("Add Member");
        fireEvent.click(addButton);

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(screen.getByText("Name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(
            screen.getByText("Age must be a positive number")
        ).toBeInTheDocument();
    });

    it("adds a new member when form is valid", () => {
        render(<TablePage data={mockData} setData={mockSetData} />);

        const addButton = screen.getByText("Add Member");
        fireEvent.click(addButton);

        const nameInput = screen.getByPlaceholderText("John Doe");
        fireEvent.change(nameInput, { target: { value: "Alice" } });

        const emailInput = screen.getByPlaceholderText("john@example.com");
        fireEvent.change(emailInput, {
            target: { value: "alice@example.com" },
        });

        const ageInput = screen.getByPlaceholderText("30");
        fireEvent.change(ageInput, { target: { value: "28" } });

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(mockSetData).toHaveBeenCalledWith([
            {
                id: expect.any(String),
                name: "Alice",
                email: "alice@example.com",
                age: 28,
                custom_field: { label: "", value: "" },
            },
            ...mockData,
        ]);
    });
});
