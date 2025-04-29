
document.getElementById('creation-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const campo = document.getElementById('creation-input');
    const novaTarefa = campo.value.trim();

    if (!novaTarefa) {
        alert("Crie uma atividade");
        return;
    }

    const tarefaBody = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tarefa: novaTarefa })
    };
    
    fetch("/tarefas/adicionar", tarefaBody).then(async (result) => {
        if (!result.ok) {
            const erro = await result.json();
            console.error(`ERRO AO CRIAR TAREFA PELO FRONT: ${JSON.stringify(erro)}`);
            campo.value = "";
            return;
        }

        var tarefaCriada = await result.json();
        if (tarefaCriada && tarefaCriada._id) {
            var tarefa = document.createElement('ul');
                tarefa.classList.add('tarefa-content');
                tarefa.dataset.id = tarefaCriada._id;
            
            var titulo = document.createElement('li');
                titulo.classList.add('tarefa');
                titulo.textContent = tarefaCriada.Tarefa;
                titulo.dataset.id = tarefaCriada._id;
            tarefa.appendChild(titulo);

            var tarefaButtons = document.createElement('div');
                tarefaButtons.classList.add('tarefa-buttons');
                    
                    var editBtn = document.createElement('button');
                        editBtn.classList.add('edit-button');
                            var editImg = document.createElement('img');
                                editImg.src = '/assets/icons/editar.svg';
                                editBtn.appendChild(editImg);
                            editBtn.onclick = function () {
                                const id = titulo.dataset.id;
                                editarTarefa(id);
                            }; tarefaButtons.appendChild(editBtn);
                            
                    var deleteBtn = document.createElement('button');
                            deleteBtn.classList.add('delete-button');
                                var deleteImg = document.createElement('img');
                                    deleteImg.src = '/assets/icons/lixeira.svg';
                                    deleteBtn.appendChild(deleteImg);
                                deleteBtn.onclick = function () {
                                    const id = tarefa.dataset.id;
                                    excluirTarefa(id);
                                }; tarefaButtons.appendChild(deleteBtn);
        
                tarefa.appendChild(tarefaButtons);
                document.getElementById('container-lista').appendChild(tarefa);
        }
        campo.value = "";
    });
            
});


function editarTarefa(id) {
    
    var lista = document.getElementsByClassName('tarefa');
    var tarefaEscolhida = null;

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].dataset.id === id.toString()) {
                tarefaEscolhida = lista[i];
            }
        };
        const tituloOriginal = tarefaEscolhida.textContent;
    
    const input = document.createElement('input');
    input.value = tarefaEscolhida.textContent;
    tarefaEscolhida.replaceWith(input);
    input.focus();
    
    function cancelarEdicao() {
        input.replaceWith(tarefaEscolhida);
    }
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            enviarAlteracao(input.value.trim());
        }

        
    });
    

    async function enviarAlteracao(dadosEditados) {
        const url = `tarefas/editar/${id}`;
        const tarefaBody = {
            method : "PUT",
            headers : { "content-type" : "application/json" },
            body : JSON.stringify({ tarefa : dadosEditados})
    }
        try {         
            await fetch(url, tarefaBody).then(async (result) => {
                if(!result.ok) {
                    const erro = await result.json();
                    console.error(`Erro ao editar Tarefa Pelo front: ${JSON.stringify(erro)}`);
                    cancelarEdicao();
                    return;
                    }
            });
            const li = document.createElement("li");
                li.classList.add("tarefa");
                li.textContent = dadosEditados;
                li.dataset.id = id;
                input.replaceWith(li);
            
            

                
        } catch (erro) {
            console.log(`ERRO NA EDIÇÃO DE TAREFA: ${erro.message}`);
        }
    }
    }


async function excluirTarefa(id) {
        var tarefaEscolhida = null;
        const div = document.getElementById("container-lista");

        var lista = document.getElementsByClassName('tarefa-content');
            for (let i = 0; i < lista.length; i++) {
                if (lista[i].dataset.id === id.toString()) {
                    tarefaEscolhida = lista[i];
                    break;
                }   
            }

        const url = `tarefas/excluir/${id}`;
        await fetch(url, { method : "DELETE" }).then( async (result) => {
            const erro = await result.json();
            if(!result.ok) {
            console.error(`Erro ao excluir tarefa pelo front: ${JSON.stringify(erro)}`);
            return window.location.reload();
        }
        tarefaEscolhida.remove();
        });  
}