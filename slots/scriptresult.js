function salvarCadastro() {
    // ... sua lógica para salvar o cadastro ...
}

function buscarCadastro() {
    // ... sua lógica para buscar cadastros ...
}

function limparCampoBusca() {
    // ... sua lógica para limpar o campo de busca ...
}

function obterCadastros() {
    // Verifica se há dados salvos no localStorage
    const dadosSalvos = localStorage.getItem('cadastros');

    // Se houver dados, converte-os de JSON para array
    if (dadosSalvos) {
        return JSON.parse(dadosSalvos);
    } else {
        return []; // Retorna um array vazio se não houver dados
    }
}

// ... (outras funções do seu script.js)

function exibirCadastros() {
    const listaCadastros = document.getElementById('listaCadastros').getElementsByTagName('tbody')[0];
    listaCadastros.innerHTML = ''; // Limpa a tabela

    const cadastros = obterCadastros(); // Função do script.js para obter os dados

    cadastros.forEach(cadastro => {
        const row = listaCadastros.insertRow();
        const plataforma = row.insertCell();
        const linkCadastro = row.insertCell();
        const linkTelegram = row.insertCell();
        const hora = row.insertCell();
        const bonus = row.insertCell();
        const depositoMinimo = row.insertCell();
        const saqueMinimo = row.insertCell();
        const numeroAfiliados = row.insertCell();


        plataforma.textContent = cadastro.plataforma;
        hora.textContent = cadastro.hora;


        // Cria o elemento <a> para o link de cadastro
        const linkElement = document.createElement('a');
        linkElement.href = cadastro.linkCadastro;
        linkElement.textContent = `>>> CADASTRAR ${cadastro.plataforma} <<<`;
        linkElement.target = '_blank';
        linkCadastro.appendChild(linkElement);

        // Link do Telegram (novo código)
        if (cadastro.linkTelegram) {
            const linkTelegramElement = document.createElement('a');
            linkTelegramElement.href = cadastro.linkTelegram;
            linkTelegramElement.textContent = `>>> TELEGRAM ${cadastro.plataforma} <<<`;
            linkTelegramElement.target = '_blank';
            linkTelegram.appendChild(linkTelegramElement);
        } else {
            linkTelegram.textContent = "-"; // Ou outro valor padrão
        }

        bonus.textContent = cadastro.bonus;
        depositoMinimo.textContent = cadastro.depositoMinimo;
        saqueMinimo.textContent = cadastro.saqueMinimo;
        numeroAfiliados.textContent = cadastro.numeroAfiliados;
    });
}

// Atualiza a tabela a cada segundo
setInterval(exibirCadastros, 1000);