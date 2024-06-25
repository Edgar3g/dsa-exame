package exame.dsa.services;

import exame.dsa.models.Graphs;
import org.springframework.stereotype.Service;

@Service
public class GraphServices {

    private Graphs graph;

    public GraphServices() {
        this.graph = new Graphs();
    }

    public Graphs getGraph() {
        return graph;
    }

    public void addEdge(int source, int destination) {
        graph.addEdge(source, destination);
    }

    public void removeEdge(int source, int destination) {
        graph.removeEdge(source, destination);
    }

    public boolean hasEdge(int source, int destination) {
        return graph.hasEdge(source, destination);
    }

    public String printGraph() {
        StringBuilder sb = new StringBuilder();
        graph.getAdjacencyList().forEach((key, value) -> {
            sb.append(key).append(": ").append(value).append("\n");
        });
        return sb.toString();
    }
}