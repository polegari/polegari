document.addEventListener('DOMContentLoaded', function() {
    // ... (seu código existente) ...

    let currentPage = 1;
    const itemsPerPage = 5; // Número de itens por página

    function atualizarTabela() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPagePlataformas = plataformas.slice(startIndex, endIndex);

        tabelaPlataformas.innerHTML = '';
        currentPagePlataformas.forEach((plataforma, index) => {
            const row = tabelaPlataformas.insertRow();
            // ... (seu código para criar as linhas da tabela) ...
        });

        atualizarPaginacao();
    }

    function atualizarPaginacao() {
        const totalPages = Math.ceil(plataformas.length / itemsPerPage);
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

    // Adicione a div de paginação ao seu HTML:
    // <div id="paginacao"></div>

    // ... (seu código existente) ...
});