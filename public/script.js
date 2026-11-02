
const API = '/leads';

let leads = [];

const formLead = document.getElementById('formLead');
const listaLeads = document.getElementById('listaLeads');
const pesquisa = document.getElementById('pesquisa');
const formularioCard = document.getElementById('formularioCard');

function escaparHTML(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caractere]);
}

async function carregarLeads() {
    try {
        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error('Não foi possível buscar os leads.');
        }

        leads = await resposta.json();

        atualizarIndicadores();
        mostrarLeads(leads);

    } catch (erro) {
        console.error(erro);

        listaLeads.innerHTML = `
            <tr>
                <td colspan="8" class="carregando">
                    Erro ao carregar os leads. Verifique o servidor.
                </td>
            </tr>
        `;
    }
}

function atualizarIndicadores() {
    document.getElementById('totalLeads').textContent = leads.length;

    const ativos = leads.filter(lead => Number(lead.ativo) === 1);
    document.getElementById('totalAtivos').textContent = ativos.length;

    const pacotes = leads.filter(
        lead => Number(lead.comprou_pacote) === 1
    );

    document.getElementById('totalPacotes').textContent = pacotes.length;
}

function formatarData(data) {
    if (!data) return '-';

    const dataObj = new Date(data);

    if (Number.isNaN(dataObj.getTime())) return '-';

    return dataObj.toLocaleDateString('pt-BR', {
        timeZone: 'UTC'
    });
}

function classeStatus(status) {
    if (status === 'Cliente') return 'status-cliente';
    if (status === 'Em Atendimento') return 'status-atendimento';

    return 'status-novo';
}

function mostrarLeads(lista) {
    if (lista.length === 0) {
        listaLeads.innerHTML = '';

        document.getElementById('mensagemVazia').hidden = false;

        return;
    }

    document.getElementById('mensagemVazia').hidden = true;

    listaLeads.innerHTML = lista.map(lead => {
        const situacao = Number(lead.ativo) === 1;
        const pacote = Number(lead.comprou_pacote) === 1;

        return `
            <tr>
                <td class="nome-lead">
                    ${escaparHTML(lead.nome)}
                </td>

                <td>${escaparHTML(lead.telefone)}</td>

                <td>${escaparHTML(lead.email || '-')}</td>

                <td>
                    <span class="etiqueta ${classeStatus(lead.status)}">
                        ${escaparHTML(lead.status)}
                    </span>
                </td>

                <td>
                    <span class="etiqueta ${situacao ? 'ativo' : 'inativo'}">
                        ${situacao ? 'Ativo' : 'Inativo'}
                    </span>
                </td>

                <td>
                    <span class="etiqueta ${pacote ? 'pacote-sim' : 'pacote-nao'}">
                        ${pacote ? 'Sim' : 'Não'}
                    </span>
                </td>

                <td>${formatarData(lead.data_cadastro)}</td>

                <td>
                    <div class="acoes">
                        <button
                            class="botao-editar"
                            onclick="editarLead(${Number(lead.id)})">
                            Editar
                        </button>

                        <button
                            class="botao-excluir"
                            onclick="excluirLead(${Number(lead.id)})">
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function mostrarFormulario() {
    formLead.reset();

    document.getElementById('leadId').value = '';
    document.getElementById('tituloFormulario').textContent =
        'Cadastrar novo lead';

    formularioCard.hidden = false;

    formularioCard.scrollIntoView({
        behavior: 'smooth'
    });
}

function fecharFormulario() {
    formularioCard.hidden = true;
    formLead.reset();
}

formLead.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const id = document.getElementById('leadId').value;

    const lead = {
        nome: document.getElementById('nome').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        email: document.getElementById('email').value.trim(),
        status: document.getElementById('status').value,
        ativo: Number(document.getElementById('ativo').value),
        comprou_pacote: Number(
            document.getElementById('comprou_pacote').value
        )
    };

    if (!lead.nome || !lead.telefone) {
        alert('Preencha o nome e o telefone.');
        return;
    }

    try {
        const resposta = await fetch(
            id ? `${API}/${id}` : API,
            {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lead)
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || 'Erro ao salvar lead.');
        }

        alert(resultado.mensagem);

        fecharFormulario();
        await carregarLeads();

    } catch (erro) {
        alert(erro.message);
        console.error(erro);
    }
});

function editarLead(id) {
    const lead = leads.find(item => Number(item.id) === Number(id));

    if (!lead) {
        alert('Lead não encontrado.');
        return;
    }

    document.getElementById('leadId').value = lead.id;
    document.getElementById('nome').value = lead.nome;
    document.getElementById('telefone').value = lead.telefone;
    document.getElementById('email').value = lead.email || '';
    document.getElementById('status').value = lead.status;
    document.getElementById('ativo').value = lead.ativo;
    document.getElementById('comprou_pacote').value =
        lead.comprou_pacote;

    document.getElementById('tituloFormulario').textContent =
        'Editar lead';

    formularioCard.hidden = false;

    formularioCard.scrollIntoView({
        behavior: 'smooth'
    });
}

async function excluirLead(id) {
    const confirmar = confirm(
        'Tem certeza que deseja excluir este lead?'
    );

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || 'Erro ao excluir lead.');
        }

        alert(resultado.mensagem);

        await carregarLeads();

    } catch (erro) {
        alert(erro.message);
        console.error(erro);
    }
}

pesquisa.addEventListener('input', function() {
    const termo = pesquisa.value.toLowerCase().trim();

    const resultado = leads.filter(lead => {
        return (
            String(lead.nome || '').toLowerCase().includes(termo) ||
            String(lead.telefone || '').toLowerCase().includes(termo) ||
            String(lead.email || '').toLowerCase().includes(termo) ||
            String(lead.status || '').toLowerCase().includes(termo)
        );
    });

    mostrarLeads(resultado);
});

carregarLeads();
