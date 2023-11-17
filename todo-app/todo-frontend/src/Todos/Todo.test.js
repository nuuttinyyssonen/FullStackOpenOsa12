import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from "./Todo";

test('todo is defined', () => {
    const todo = {
        text: "test todo",
        done: false
    };

    render(<Todo todo={todo}/>);
    const textElement = screen.getByText('test todo');
    expect(textElement).toBeDefined();
})