let stack = [];
const stackContainer = document.getElementById('stack-container');

function updateStack() {
    stackContainer.innerHTML = '';
    stack.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'stack-item';
        div.style.height = '30px';
        div.style.width = '100px';
        div.style.border = '1px solid black';
        div.style.margin = '5px auto';
        div.style.backgroundColor = 'lightblue';
        div.innerHTML = item;
        stackContainer.appendChild(div);
    });
}

function push() {
    const item = Math.floor(Math.random() * 100);
    stack.push(item);
    updateStack();
}

function pop() {
    stack.pop();
    updateStack();
}
