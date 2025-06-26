const inputTarefa = document.getElementById('novaTarefa');
const botaoAdicionar = document.getElementById('addTarefa');
const listaDeTarefas = document.getElementById('listaDeTarefas');

function criarItemDeTarefa(textoTarefa, concluida = false) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkboxTarefa');
    checkbox.checked = concluida;

    const span = document.createElement('span');
    span.textContent = textoTarefa;
    if (concluida) {
        span.classList.add('concluida');
    }

    checkbox.addEventListener('change', function () {
        span.classList.toggle('concluida', checkbox.checked);
        salvarTarefas();
    });

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'remover'
    botaoRemover.onclick = function() {
        listaDeTarefas.removeChild(li);
        salvarTarefas(); 
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(botaoRemover);
    listaDeTarefas.appendChild(li);
}

function addTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    if (textoTarefa === ''){
        alert("Por favor, adicione uma tarefa!");
        return;
    }

    criarItemDeTarefa(textoTarefa, false);
    inputTarefa.value = '';
    
    salvarTarefas(); 
}

function salvarTarefas() {
    const tarefas = document.querySelectorAll('#listaDeTarefas li');
    const listaParaSalvar = [];

    tarefas.forEach(function(item) {
        const texto = item.querySelector('span').textContent;
        const concluida = item.querySelector('input').checked;
        listaParaSalvar.push({ texto: texto, concluida: concluida });
    });

    localStorage.setItem('minhas_tarefas', JSON.stringify(listaParaSalvar));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('minhas_tarefas');

    if (tarefasSalvas) {
        const listaDeInformacoes = JSON.parse(tarefasSalvas);

        listaDeInformacoes.forEach(function(tarefa) {
            criarItemDeTarefa(tarefa.texto, tarefa.concluida);
        });
    }
}

botaoAdicionar.addEventListener('click', addTarefa);

inputTarefa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTarefa();
    }
});

carregarTarefas();
