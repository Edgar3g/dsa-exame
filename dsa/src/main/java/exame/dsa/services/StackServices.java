package exame.dsa.services;


import exame.dsa.models.Stacks;
import org.springframework.stereotype.Service;

@Service
public class StackServices {

    private Stacks stackNode = new Stacks();

    public Stacks getStack() {
        return stackNode;
    }

    public void push(int value) {
        stackNode.push(value);
    }

    public Integer pop() {
        return stackNode.pop();
    }

    public String printStack() {
        return stackNode.getStack().toString();
    }
}
