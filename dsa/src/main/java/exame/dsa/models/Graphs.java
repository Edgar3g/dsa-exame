package exame.dsa.models;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class Graphs {
    private Map<Integer, List<Integer>> adjacencyList;

    public Graphs() {
        this.adjacencyList = new HashMap<>();
    }

    public void addEdge(int source, int destination) {
        adjacencyList.computeIfAbsent(source, k -> new ArrayList<>()).add(destination);
        adjacencyList.computeIfAbsent(destination, k -> new ArrayList<>()).add(source);
    }

    public void removeEdge(int source, int destination) {
        List<Integer> sourceList = adjacencyList.get(source);
        List<Integer> destinationList = adjacencyList.get(destination);
        if (sourceList != null) sourceList.remove((Integer) destination);
        if (destinationList != null) destinationList.remove((Integer) source);
    }

    public boolean hasEdge(int source, int destination) {
        List<Integer> sourceList = adjacencyList.get(source);
        return sourceList != null && sourceList.contains(destination);
    }

    public Map<Integer, List<Integer>> getAdjacencyList() {
        return adjacencyList;
    }
}

