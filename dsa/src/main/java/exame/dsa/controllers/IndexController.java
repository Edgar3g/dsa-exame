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

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("tree", treeService.printTree(treeService.getRoot(), ""));
        model.addAttribute("graph", graphService.printGraph());
        model.addAttribute("stack", stackService.printStack());
        return "index";
    }

    @PostMapping("/tree/add")
    public String addTreeNode(@RequestParam int value) {
        treeService.addNode(value);
        return "redirect:/";
    }

    @PostMapping("/graph/addEdge")
    public String addGraphEdge(@RequestParam int source, @RequestParam int destination) {
        graphService.addEdge(source, destination);
        return "redirect:/";
    }

    @PostMapping("/stack/push")
    public String pushStack(@RequestParam int value) {
        stackService.push(value);
        return "redirect:/";
    }
}
