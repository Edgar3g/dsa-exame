package exame.dsa.services;

import exame.dsa.models.Trees;
import org.springframework.stereotype.Service;

@Service
public class TreeServices {
    public Trees Trees;
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

    public boolean containsNode(int value) {
        return containsNodeRecursive(root, value);
    }

    private boolean containsNodeRecursive(Trees current, int value) {
        if (current == null) {
            return false;
        }
        if (value == current.getValue()) {
            return true;
        }
        return value < current.getValue()
                ? containsNodeRecursive(current.getLeft(), value)
                : containsNodeRecursive(current.getRight(), value);
    }

    public void deleteNode(int value) {
        root = deleteRecursive(root, value);
    }

    private Trees deleteRecursive(Trees current, int value) {
        if (current == null) {
            return null;
        }

        if (value == current.getValue()) {
            if (current.getLeft() == null && current.getRight() == null) {
                return null;
            }
            if (current.getRight() == null) {
                return current.getLeft();
            }
            if (current.getLeft() == null) {
                return current.getRight();
            }

            int smallestValue = findSmallestValue(current.getRight());
            current.setValue(smallestValue);
            current.setRight(deleteRecursive(current.getRight(), smallestValue));
            return current;
        }
        if (value < current.getValue()) {
            current.setLeft(deleteRecursive(current.getLeft(), value));
            return current;
        }

        current.setRight(deleteRecursive(current.getRight(), value));
        return current;
    }

    private int findSmallestValue(Trees root) {
        return root.getLeft() == null ? root.getValue() : findSmallestValue(root.getLeft());
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
