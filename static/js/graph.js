
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

let stackHead = null;  
let stackSet = new Set();  

function updateStackView() {
    const stackContainer = document.getElementById('stack-container');
    stackContainer.innerHTML = '';
    let currentNode = stackHead;
    while (currentNode !== null) {
        const stackItemElement = document.createElement('div');
        stackItemElement.classList.add('stack-item');
        stackItemElement.textContent = currentNode.value;
        stackContainer.appendChild(stackItemElement);
        currentNode = currentNode.next;
    }
}

function pushToStack() {
    const newItem = prompt('Digite um item para adicionar à pilha:');
    if (newItem !== null && newItem.trim() !== '') {
        if (!stackSet.has(newItem)) {
            const newNode = new Node(newItem);
            newNode.next = stackHead;
            stackHead = newNode;
            stackSet.add(newItem);
            updateStackView();
        } else {
            alert('Este item já está na pilha!');
        }
    } else {
        alert('Por favor, digite um item válido.');
    }
}

function popFromStack() {
    if (stackHead !== null) {
        const removedItem = stackHead.value;
        stackHead = stackHead.next;
        stackSet.delete(removedItem);
        updateStackView();
    } else {
        alert('A pilha está vazia!');
    }
}

let listHead = null;  
let linkedListSet = new Set(); 


function updateLinkedListView() {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '';
    let currentNode = listHead;
    while (currentNode !== null) {
        const listItemElement = document.createElement('div');
        listItemElement.classList.add('list-item');
        listItemElement.textContent = currentNode.value;
        listContainer.appendChild(listItemElement);
        currentNode = currentNode.next;
    }
}

function addToLinkedList() {
    const newValue = prompt('Digite um valor para adicionar à lista:');
    if (newValue && !linkedListSet.has(newValue)) {
        const newNode = new Node(newValue);
        newNode.next = listHead;
        listHead = newNode;
        linkedListSet.add(newValue);
        updateLinkedListView();
    } else if (linkedListSet.has(newValue)) {
        alert('Este valor já está na lista!');
    }
}

function removeFromLinkedList() {
    if (listHead !== null) {
        const removedValue = listHead.value;
        listHead = listHead.next;
        linkedListSet.delete(removedValue);
        updateLinkedListView();
    } else {
        alert('A lista está vazia!');
    }
}

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

let grafo = {};  
let nodes = [];  
let links = [];  

function adicionarVertice() {
    const vertice = document.getElementById('verticeInput').value.trim();
    if (vertice !== '') {
        if (!grafo.hasOwnProperty(vertice)) {
            grafo[vertice] = [];
            nodes.push({ id: vertice });
            atualizarGrafo();
            atualizarListaAdjacencias();
        } else {
            alert(`O vértice '${vertice}' já existe.`);
        }
        document.getElementById('verticeInput').value = '';
    }
}

function adicionarAresta() {
    const origem = document.getElementById('arestaOrigemInput').value.trim();
    const destino = document.getElementById('arestaDestinoInput').value.trim();
    if (origem !== '' && destino !== '') {
        if (grafo.hasOwnProperty(origem) && grafo.hasOwnProperty(destino)) {
            grafo[origem].push(destino);
            links.push({ source: origem, target: destino });
            atualizarGrafo();
            atualizarListaAdjacencias();
        } else {
            alert('Ambos os vértices devem existir.');
        }
        document.getElementById('arestaOrigemInput').value = '';
        document.getElementById('arestaDestinoInput').value = '';
    }
}

function atualizarGrafo() {
    svg.selectAll('*').remove();

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 2);

    const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 10)
        .attr('fill', '#007bff')
        .call(drag(simulation));

    node.append('title')
        .text(d => d.id);

    const label = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('class', 'node-label')
        .attr('text-anchor', 'middle')
        .attr('dy', -15)
        .text(d => d.id);

    simulation.nodes(nodes);
    simulation.force('link').links(links);
    simulation.alpha(1).restart();
}

function atualizarListaAdjacencias() {
    const adjListElement = d3.select('#adjList');
    adjListElement.selectAll('li').remove();

    for (const vertice in grafo) {
        const adjacencias = grafo[vertice].join(', ');
        adjListElement.append('li')
            .text(`${vertice} -> ${adjacencias}`);
    }
}

function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

function mouseover(event, d) {
    svg.selectAll('.node')
        .style('opacity', 0.2);
    svg.selectAll('.link')
        .style('opacity', link => link.source === d || link.target === d ? 1 : 0.2);
    d3.select(this)
        .style('opacity', 1);
}

function mouseout(event, d) {
    svg.selectAll('.node, .link')
        .style('opacity', 1);
}

const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(200))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', () => {
        svg.selectAll('.link')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        svg.selectAll('.node')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        svg.selectAll('.node-label')
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
