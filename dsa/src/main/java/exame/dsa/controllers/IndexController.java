package exame.dsa.controllers;


import exame.dsa.services.GraphServices;
import exame.dsa.services.StackServices;
import exame.dsa.services.TreeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexController {
    @Autowired
    private TreeServices treeService;

    @Autowired
    private GraphServices graphService;

    @Autowired
    private StackServices stackService;
    @GetMapping
    public String index(Model model) {
        try {
            model.addAttribute("tree", treeService.printTree(treeService.getRoot(), ""));
            model.addAttribute("graph", graphService.printGraph());
            model.addAttribute("stack", stackService.printStack());
        } catch (Exception e) {
            model.addAttribute("error", "Erro ao carregar os dados: " + e.getMessage());
        }
        return "index";
    }

    @PostMapping("/tree/add")
    public String addTreeNode(@RequestParam int value, Model model) {
        try {
            treeService.addNode(value);
        } catch (Exception e) {
            model.addAttribute("error", "Erro ao adicionar o nó na árvore: " + e.getMessage());
        }
        return "redirect:/";
    }

    @PostMapping("/tree/delete")
    public String deleteTreeNode(@RequestParam int value, Model model) {
        try {
            treeService.deleteNode(value);
        } catch (Exception e) {
            model.addAttribute("error", "Erro ao deletar o nó na árvore: " + e.getMessage());
        }
        return "redirect:/";
    }

    @PostMapping("/graph/addEdge")
    public String addGraphEdge(@RequestParam int source, @RequestParam int destination, Model model) {
        try {
            graphService.addEdge(source, destination);
        } catch (Exception e) {
            model.addAttribute("error", "Erro ao adicionar a aresta no grafo: " + e.getMessage());
        }
        return "redirect:/";
    }

    @PostMapping("/graph/removeEdge")
    public String removeGraphEdge(@RequestParam int source, @RequestParam int destination, Model model) {
        try {
            graphService.removeEdge(source, destination);
        } catch (Exception e) {
            model.addAttribute("error", "Erro ao remover a aresta no grafo: " + e.getMessage());
        }
        return "redirect:/";
    }

    @PostMapping("/stack/push")
    public String pushStack(@RequestParam int value, Model model) {
        try {
            stackService.push(value);
        } catch (Exception e) {
            model.addAttribute("error", "Erro ao adicionar ao stack: " + e.getMessage());
        }
        return "redirect:/";
    }

    @PostMapping("/stack/pop")
    public String popStack(Model model) {
        try {
            stackService.pop();
        } catch (Exception e) {
            model.addAttribute("error", "Erro ao remover do stack: " + e.getMessage());
        }
        return "redirect:/";
    }
}
