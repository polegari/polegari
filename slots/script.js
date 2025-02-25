document.addEventListener('DOMContentLoaded', function() {
    const cadastrarBtn = document.getElementById('cadastrar');
    const modalCadastro = document.getElementById('modal-cadastro');
    const modalEditar = document.getElementById('modal-editar');
    const fecharModalBtns = document.querySelectorAll('.fechar-modal');
    const formularioCadastro = document.getElementById('formulario-cadastro');
    const formularioEditar = document.getElementById('formulario-editar');
    const tabelaPlataformas = document.getElementById('tabela-plataformas');
    const barraPesquisa = document.getElementById('barra-pesquisa');

    let currentPage = 1;
    const itemsPerPage = 5;

    function getCookies() {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return cookies;
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }

    function getPlataformas() {
        const cookies = getCookies();
        return cookies.plataformas ? JSON.parse(cookies.plataformas) : [];
    }

    function setPlataformas(plataformas) {
        setCookie('plataformas', JSON.stringify(plataformas), 30);
    }

    let plataformas = getPlataformas();

    function atualizarTabela() {
        const termoPesquisa = barraPesquisa.value.toLowerCase();
        const plataformasFiltradas = plataformas.filter(plataforma => {
            return plataforma.plataforma.toLowerCase().includes(termoPesquisa) ||
                   plataforma.link.toLowerCase().includes(termoPesquisa) ||
                   plataforma.linktelegram.toLowerCase().includes(termoPesquisa) ||
                   plataforma.bonus.toLowerCase().includes(termoPesquisa) ||
                   plataforma.deposito.toString().includes(termoPesquisa);
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPagePlataformas = plataformasFiltradas.slice(startIndex, endIndex);

        tabelaPlataformas.innerHTML = '';
        currentPagePlataformas.forEach((plataforma, index) => {
            const row = tabelaPlataformas.insertRow();
            row.innerHTML = `
                <td>${plataforma.plataforma}</td>
                <td><a href="${plataforma.link}" target="_blank">${plataforma.link}</a></td>
                <td><a href="${plataforma.linktelegram}" target="_blank">${plataforma.linktelegram}</a></td>
                <td>${plataforma.bonus}</td>
                <td>${plataforma.deposito}</td>
                <td>
                    <button class="editar-btn" data-index="${index}">Editar</button>
                    <button class="excluir-btn" data-index="${index}">Excluir</button>
                </td>
            `;
        });

        document.querySelectorAll('.editar-btn').forEach(btn => {
            btn.addEventListener('click', editarPlataforma);
        });

        document.querySelectorAll('.excluir-btn').forEach(btn => {
            btn.addEventListener('click', excluirPlataforma);
        });

        atualizarPaginacao(plataformasFiltradas.length);
    }

    function atualizarPaginacao(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginacaoDiv = document.getElementById('paginacao');
        paginacaoDiv.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const paginaBtn = document.createElement('button');
            paginaBtn.textContent = i;
            paginaBtn.addEventListener('click', () => {
                currentPage = i;
                atualizarTabela();
            });
            paginacaoDiv.appendChild(paginaBtn);
        }
    }

    function abrirModal(modal) {
        modal.style.display = 'block';
    }

    function fecharModal(modal) {
        modal.style.display = 'none';
    }

    cadastrarBtn.addEventListener('click', () => abrirModal(modalCadastro));

    fecharModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fecharModal(modalCadastro);
            fecharModal(modalEditar);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalCadastro) {
            fecharModal(modalCadastro);
        }
        if (event.target === modalEditar) {
            fecharModal(modalEditar);
        }
    });

    formularioCadastro.addEventListener('submit', (event) => {
        event.preventDefault();
        const plataforma = {
            plataforma: document.getElementById('plataforma').value,
            link: document.getElementById('link').value,
            linktelegram: document.getElementById('linktelegram').value,
            bonus: document.getElementById('bonus').value,
            deposito: document.getElementById('deposito').value
        };
        plataformas.push(plataforma);
        setPlataformas(plataformas);
        atualizarTabela();
        formularioCadastro.reset();
        fecharModal(modalCadastro);
    });

    function editarPlataforma(event) {
        const index = parseInt(event.target.dataset.index);
        const plataforma = plataformas[index];

        document.getElementById('id-plataforma').value = index;
        document.getElementById('plataforma-editar').value = plataforma.plataforma;
        document.getElementById('link-editar').value = plataforma.link;
        document.getElementById('linktelegram-editar').value = plataforma.linktelegram;
        document.getElementById('bonus-editar').value = plataforma.bonus;
        document.getElementById('deposito-editar').value = plataforma.deposito;

        abrirModal(modalEditar);
    }

    formularioEditar.addEventListener('submit', (event) => {
        event.preventDefault();
        const index = parseInt(document.getElementById('id-plataforma').value);
        plataformas[index] = {
            plataforma: document.getElementById('plataforma-editar').value,
            link: document.getElementById('link-editar').value,
            linktelegram: document.getElementById('linktelegram-editar').value,
            bonus: document.getElementById('bonus-editar').value,
            deposito: document.getElementById('deposito-editar').value
        };
        setPlataformas(plataformas);
        atualizarTabela();
        fecharModal(modalEditar);
    });

    function excluirPlataforma(event) {
        const index = parseInt(event.target.dataset.index);
        plataformas.splice(index, 1);
        setPlataformas(plataformas);
        atualizarTabela();
    }

    barraPesquisa.addEventListener('input', () => {
        currentPage = 1;
        atualizarTabela();
    });

    atualizarTabela();
});