package exame.dsa.models;

public class Trees {
    private int value;
    private Trees left;
    private Trees right;

    public Trees(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Trees getLeft() {
        return left;
    }

    public void setLeft(Trees left) {
        this.left = left;
    }

    public Trees getRight() {
        return right;
    }

    public void setRight(Trees right) {
        this.right = right;
    }
}
