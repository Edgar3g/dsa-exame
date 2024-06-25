package exame.dsa.models;

import java.util.Stack;

public class Stacks {

    private Stack<Integer> stack;

    public Stacks() {
        this.stack = new Stack<>();
    }

    public void push(int value) {
        stack.push(value);
    }

    public Integer pop() {
        return stack.isEmpty() ? null : stack.pop();
    }

    public Stack<Integer> getStack() {
        return stack;
    }
}
