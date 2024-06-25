package exame.dsa.services;

import exame.dsa.models.Graphs;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GraphServices {
    private Graphs graph = new Graphs();

    public Graphs getGraph() {
        return graph;
    }

    public void addEdge(int source, int destination) {
        graph.addEdge(source, destination);
    }

    public String printGraph() {
        StringBuilder sb = new StringBuilder();
        Map<Integer, List<Integer>> adjacencyList = graph.getAdjacencyList();

        if (adjacencyList != null) {
            ((Map<?, ?>) adjacencyList).forEach((key, value) -> {
                sb.append(key).append(": ").append(value).append("\n");
            });
        } else {
            sb.append("No edges in the graph.");
        }

        return sb.toString();
    }
}
