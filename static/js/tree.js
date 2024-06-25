//ÁRVORE//
var arvoreElement = document.getElementById("arvore");


    class NoArvore {
        constructor(dado) {
            this.dado = dado;
            this.esquerda = null;
            this.direita = null;
        }
    }
    
    class ArvoreBinaria {
        constructor() {
            this.raiz = null;
        }
    
        adicionar(dado) {
            const novoNo = new NoArvore(dado);
            if (this.raiz === null) {
                this.raiz = novoNo;
            } else {
                this.inserirNo(this.raiz, novoNo);
            }
            this.desenharArvore();
        }
    
        inserirNo(noAtual, novoNo) {
          if (novoNo.dado < noAtual.dado) {
              if (noAtual.esquerda === null) {
                  noAtual.esquerda = novoNo;
              } else {
                  this.inserirNo(noAtual.esquerda, novoNo);
              }
          } else if (novoNo.dado > noAtual.dado) {
              if (noAtual.direita === null) {
                  noAtual.direita = novoNo;
              } else {
                  this.inserirNo(noAtual.direita, novoNo);
              }
          } else {
              console.log(`O nó com dado ${novoNo.dado} já existe na árvore.`);
          }
      }
    
        desenharArvore() {
            const container = document.getElementById('arvoreBinaria');
            container.innerHTML = '';
            if (this.raiz !== null) {
                this.desenharNo(container, this.raiz, container.clientWidth / 2, 50, container.clientWidth / 4);
            }
        }
    
        desenharNo(container, no, x, y, espacamento) {
            const noElement = document.createElement('div');
            noElement.className = 'no';
            noElement.style.left = `${x}px`;
            noElement.style.top = `${y}px`;
            noElement.innerHTML = `<span>${no.dado}</span>`;
            container.appendChild(noElement);
    
            if (no.esquerda !== null) {
                const linhaEsquerda = this.desenharLinha(x, y, x - espacamento, y + 80);
                container.appendChild(linhaEsquerda);
                this.desenharNo(container, no.esquerda, x - espacamento, y + 80, espacamento / 2);
            }
            if (no.direita !== null) {
                const linhaDireita = this.desenharLinha(x, y, x + espacamento, y + 80);
                container.appendChild(linhaDireita);
                this.desenharNo(container, no.direita, x + espacamento, y + 80, espacamento / 2);
            }
        }
    
        desenharLinha(x1, y1, x2, y2) {
            const angulo = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    
            const comprimento = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    
            const linha = document.createElement('div');
            linha.className = 'linha';
            linha.style.position = 'absolute';
            linha.style.left = `${x1}px`;
            linha.style.top = `${y1}px`;
            linha.style.width = `${comprimento}px`;
            linha.style.height = '0';
            linha.style.borderTop = '2px solid #333';
            linha.style.transformOrigin = 'left center';
            linha.style.transform = `rotate(${angulo}deg)`;
    
            return linha;
        }
    
        remover(dado) {
            this.raiz = this.removerNo(this.raiz, dado);
            this.desenharArvore();
        }
    
        removerNo(no, dado) {
            if (no === null) {
                return null;
            }
            if (dado < no.dado) {
                no.esquerda = this.removerNo(no.esquerda, dado);
                return no;
            } else if (dado > no.dado) {
                no.direita = this.removerNo(no.direita, dado);
                return no;
            } else {
                if (no.esquerda === null && no.direita === null) {
                    return null;
                } else if (no.esquerda === null) {
                    return no.direita;
                } else if (no.direita === null) {
                    return no.esquerda;
                } else {
                    const menorNoDireita = this.encontrarMinimo(no.direita);
                    no.dado = menorNoDireita.dado;
                    no.direita = this.removerNo(no.direita, menorNoDireita.dado);
                    return no;
                }
            }
        }
    
        preOrdem(no, resultado) {
            if (no === null) return;
            resultado.push(no.dado);
            this.preOrdem(no.esquerda, resultado);
            this.preOrdem(no.direita, resultado);
        }
    
        emOrdem(no, resultado) {
            if (no === null) return;
            this.emOrdem(no.esquerda, resultado);
            resultado.push(no.dado);
            this.emOrdem(no.direita, resultado);
        }
    
        posOrdem(no, resultado) {
            if (no === null) return;
            this.posOrdem(no.esquerda, resultado);
            this.posOrdem(no.direita, resultado);
            resultado.push(no.dado);
        }
    
        encontrarMinimo(no) {
            while (no.esquerda !== null) {
                no = no.esquerda;
            }
            return no;
        }
    }
    
    const arvoreBinaria = new ArvoreBinaria();
    
    function adicionarNoArvore() {
        const dado = parseInt(document.getElementById('entradaArvore').value);
        if (!isNaN(dado)) {
            arvoreBinaria.adicionar(dado);
            document.getElementById('entradaArvore').value = '';
        }
    }
    
    function removerNoArvore() {
        const dado = parseInt(document.getElementById('removerArvore').value);
        if (!isNaN(dado)) {
            arvoreBinaria.remover(dado);
            document.getElementById('removerArvore').value = '';
        }
    }
    
    function mostrarPreOrdem() {
        const resultado = [];
        arvoreBinaria.preOrdem(arvoreBinaria.raiz, resultado);
        document.getElementById('resultadoArvore').innerText = 'Pré-Ordem: ' + resultado.join(', ');
    }
    
    function mostrarEmOrdem() {
        const resultado = [];
        arvoreBinaria.emOrdem(arvoreBinaria.raiz, resultado);
        document.getElementById('resultadoArvore').innerText = 'Em-Ordem: ' + resultado.join(', ');
    }
    
    function mostrarPosOrdem() {
        const resultado = [];
        arvoreBinaria.posOrdem(arvoreBinaria.raiz, resultado);
        document.getElementById('resultadoArvore').innerText = 'Pós-Ordem: ' + resultado.join(', ');
    }
    