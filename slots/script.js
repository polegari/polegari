function limparCampoBusca() {
  document.getElementById("campoBusca").value = ""; // Limpa o campo de busca
  atualizarListaCadastros(); // Exibe todos os cadastros
}

      // Função para salvar o cadastro no LocalStorage
  function salvarCadastro() {
    const plataforma = document.getElementById("plataforma").value;
    const linkCadastro = document.getElementById("linkCadastro").value;
    const linkTelegram = document.getElementById("linkTelegram").value;
    const hora = document.getElementById("hora").value;
    const bonus = document.getElementById("bonus").value;
    const depositoMinimo = document.getElementById("depositoMinimo").value;
    const saqueMinimo = document.getElementById("saqueMinimo").value;
    const numeroAfiliados = document.getElementById('numeroAfiliados').value;

    const cadastro = {
        plataforma: plataforma,
        linkCadastro: linkCadastro,
        linkTelegram: linkTelegram,
        hora: hora,
        bonus: parseFloat(bonus.replace(/[^\d,-]/g, '').replace(',', '.')), // Converte para número
        depositoMinimo: parseFloat(depositoMinimo.replace(/[^\d,-]/g, '').replace(',', '.')), // Converte para número
        saqueMinimo: parseFloat(saqueMinimo.replace(/[^\d,-]/g, '').replace(',', '.')), // Converte para número
        numeroAfiliados: parseFloat(numeroAfiliados.replace(/[^\d,-]/g, '').replace(',', '.'))
    };

    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.push(cadastro);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    atualizarListaCadastros();
    limparFormulario();
  }

  // Função para atualizar a lista de cadastros na tabela
function atualizarListaCadastros() {
    const listaCadastros = document.getElementById("listaCadastros").getElementsByTagName("tbody")[0];
    listaCadastros.innerHTML = "";

    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.forEach((cadastro, index) => {
        const row = listaCadastros.insertRow();
        const plataformaCell = row.insertCell();
        const linkCadastroCell = row.insertCell();
        const linkTelegramCell = row.insertCell();
        const horaCell = row.insertCell();
        const bonusCell = row.insertCell();
        const depositoMinimoCell = row.insertCell();
        const saqueMinimoCell = row.insertCell();
        const numeroAfiliadosCell = row.insertCell();
        const actionsCell = row.insertCell();

        plataformaCell.textContent = cadastro.plataforma;
        horaCell.textContent = cadastro.hora;


        const linkElement = document.createElement("a");
        linkElement.href = cadastro.linkCadastro;
        linkElement.textContent = cadastro.linkCadastro;
        linkElement.target = "_blank";
        linkCadastroCell.appendChild(linkElement);

        const linkTelegramElement = document.createElement("a");
        linkTelegramElement.href = cadastro.linkTelegram;
        linkTelegramElement.textContent = cadastro.linkTelegram;
        linkTelegramElement.target = "_blank";
        linkTelegramCell.appendChild(linkTelegramElement);

        // Formatação da moeda
        const formatacaoMoeda = { style: 'currency', currency: 'BRL' };
        bonusCell.textContent = new Intl.NumberFormat('pt-BR', formatacaoMoeda).format(cadastro.bonus);
        depositoMinimoCell.textContent = new Intl.NumberFormat('pt-BR', formatacaoMoeda).format(cadastro.depositoMinimo);
        saqueMinimoCell.textContent = new Intl.NumberFormat('pt-BR', formatacaoMoeda).format(cadastro.saqueMinimo);
        numeroAfiliadosCell.textContent = cadastro.numeroAfiliados;


        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        editarButton.onclick = () => editarCadastro(index);
        actionsCell.appendChild(editarButton);

        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.onclick = () => excluirCadastro(index);
        actionsCell.appendChild(excluirButton);
    });
}

  // Função para editar um cadastro
  function editarCadastro(index) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[index];

    document.getElementById("plataforma").value = cadastro.plataforma;
    document.getElementById("linkCadastro").value = cadastro.linkCadastro;
    document.getElementById("linkTelegram").value = cadastro.linkTelegram;
    document.getElementById("hora").value = cadastro.hora;
    document.getElementById("bonus").value = cadastro.bonus;
    document.getElementById("depositoMinimo").value = cadastro.depositoMinimo;
    document.getElementById("saqueMinimo").value = cadastro.saqueMinimo;
    document.getElementById("numeroAfiliados").value = cadastro.numeroAfiliados;


    // Oculta o botão "Salvar"
    document.getElementById("salvarButton").style.display = "none";

    // Cria o botão "Salvar Edição"
    const salvarEdicaoButton = document.createElement("button");
    salvarEdicaoButton.textContent = "Salvar Edição";
    salvarEdicaoButton.id = "salvarEdicaoButton"; // Adiciona um ID para facilitar a remoção posterior
    salvarEdicaoButton.onclick = () => {
      cadastros[index] = {
        plataforma: document.getElementById("plataforma").value,
        linkCadastro: document.getElementById("linkCadastro").value,
        linkTelegram: document.getElementById("linkTelegram").value,
        hora: document.getElementById("hora").value,
        bonus: document.getElementById("bonus").value,
        depositoMinimo: document.getElementById("depositoMinimo").value,
        saqueMinimo: document.getElementById("saqueMinimo").value,
        numeroAfiliados: document.getElementById("numeroAfiliados").value
      };
      localStorage.setItem("cadastros", JSON.stringify(cadastros));
      atualizarListaCadastros();
      limparFormulario();

      // Exibe o botão "Salvar" novamente
      document.getElementById("salvarButton").style.display = "block";
      

      // Remove o botão "Salvar Edição"
      document.getElementById("cadastroForm").removeChild(salvarEdicaoButton);
    };

    // Adiciona uma quebra de linha antes do botão
    const quebraLinha = document.createElement("br");
    document.getElementById("cadastroForm").appendChild(quebraLinha);
    document.getElementById("cadastroForm").appendChild(salvarEdicaoButton);
  }

  // Função para excluir um cadastro
  function excluirCadastro(index) {
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.splice(index, 1);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));
    atualizarListaCadastros();
  }

  // Função para limpar o formulário após salvar ou editar
  function limparFormulario() {
    document.getElementById("plataforma").value = "";
    document.getElementById("linkCadastro").value = "";
    document.getElementById("linkTelegram").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("bonus").value = "";
    document.getElementById("depositoMinimo").value = "";
    document.getElementById("saqueMinimo").value = "";
    document.getElementById("numeroAfiliados").value = "";
  }

  // Inicializar a lista de cadastros ao carregar a página
  atualizarListaCadastros();

  function buscarCadastro() {
  const termoBusca = document.getElementById("campoBusca").value;
  const resultados = realizarBusca(termoBusca);
  atualizarTabela(resultados);
}

function realizarBusca(termo) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    return cadastros.filter(cadastro => {
        return (
            cadastro.plataforma.toLowerCase().includes(termo.toLowerCase()) ||
            cadastro.linkCadastro.toLowerCase().includes(termo.toLowerCase()) ||
            cadastro.linkTelegram.toLowerCase().includes(termo.toLowerCase()) ||
            cadastro.hora.toLowerCase().includes(termo.toLowerCase()) ||
            cadastro.bonus.toString().includes(termo) || // Agora é número, converte para string para busca
            cadastro.depositoMinimo.toString().includes(termo) || // Agora é número, converte para string para busca
            cadastro.saqueMinimo.toString().includes(termo) || // Agora é número, converte para string para busca
            cadastro.numeroAfiliados.toString().includes(termo) // Agora é número, converte para string para busca
        );
    });
}

function atualizarTabela(resultados) {
  const listaCadastros = document.getElementById("listaCadastros").getElementsByTagName("tbody")[0];
  listaCadastros.innerHTML = ""; // Limpa a tabela

  resultados.forEach((cadastro, index) => {
    const row = listaCadastros.insertRow();
    const plataformaCell = row.insertCell();
    const linkCadastroCell = row.insertCell();
    const linkTelegramCell = row.insertCell();
    const horaCell = row.insertCell();
    const bonusCell = row.insertCell();
    const depositoMinimoCell = row.insertCell();
    const saqueMinimoCell = row.insertCell();
    const numeroAfiliadosCell = row.insertCell();
    const actionsCell = row.insertCell();

    plataformaCell.textContent = cadastro.plataforma;
    horaCell.textContent = cadastro.hora;
	
	const formatacaoMoeda = { style: 'currency', currency: 'BRL' };
    bonusCell.textContent = new Intl.NumberFormat('pt-BR', formatacaoMoeda).format(cadastro.bonus);
    depositoMinimoCell.textContent = new Intl.NumberFormat('pt-BR', formatacaoMoeda).format(cadastro.depositoMinimo);
    saqueMinimoCell.textContent = new Intl.NumberFormat('pt-BR', formatacaoMoeda).format(cadastro.saqueMinimo);
    numeroAfiliadosCell.textContent = cadastro.numeroAfiliados;

    const linkElement = document.createElement("a");
    linkElement.href = cadastro.linkCadastro;
    linkElement.textContent = cadastro.linkCadastro;
    linkElement.target = "_blank";
    linkCadastroCell.appendChild(linkElement);

    const linkTelegramElement = document.createElement("a");
    linkTelegramElement.href = cadastro.linkTelegram;
    linkTelegramElement.textContent = cadastro.linkTelegram;
    linkTelegramElement.target = "_blank";
    linkTelegramCell.appendChild(linkTelegramElement);

    bonusCell.textContent = cadastro.bonus;
    depositoMinimoCell.textContent = cadastro.depositoMinimo;
    saqueMinimoCell.textContent = cadastro.saqueMinimo;

    const editarButton = document.createElement("button");
    editarButton.textContent = "Editar";
    editarButton.onclick = () => editarCadastro(index);
    actionsCell.appendChild(editarButton);

    const excluirButton = document.createElement("button");
    excluirButton.textContent = "Excluir";
    excluirButton.onclick = () => excluirCadastro(index);
    actionsCell.appendChild(excluirButton);
  });
}

$(document).ready(function () {
  $('#depositoMinimo').mask('000.000.000,00', { reverse: true });
  $('#saqueMinimo').mask('000.000.000,00', { reverse: true });
  $('#numeroAfiliados').mask('000.000.000,00', { reverse: true });
  $('#bonus').mask('000.000.000,00', { reverse: true }); // Máscara opcional para bônus
  $('#linkCadastro').mask('https://' + 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', {
      translation: {
          X: { pattern: /./, recursive: true } // Aceita qualquer caractere
      }
  });
});


