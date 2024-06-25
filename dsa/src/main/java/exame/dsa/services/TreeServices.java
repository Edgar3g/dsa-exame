package exame.dsa.services;

import exame.dsa.models.Trees;
import org.springframework.stereotype.Service;

@Service
public class TreeServices {
    private Trees root;

    public Trees getRoot() {
        return root;
    }

    public void addNode(int value) {
        root = addRecursive(root, value);
    }

    private Trees addRecursive(Trees current, int value) {
        if (current == null) {
            return new Trees(value);
        }

        if (value < current.getValue()) {
            current.setLeft(addRecursive(current.getLeft(), value));
        } else if (value > current.getValue()) {
            current.setRight(addRecursive(current.getRight(), value));
        }

        return current;
    }

    public String printTree(Trees node, String prefix) {
        if (node == null) {
            return prefix + "null\n";
        }
        return prefix + node.getValue() + "\n" +
                printTree(node.getLeft(), prefix + "L- ") +
                printTree(node.getRight(), prefix + "R- ");
    }
}
