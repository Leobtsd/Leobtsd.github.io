document.addEventListener('DOMContentLoaded', () => {
    const kmDia = document.getElementById('km');
    const ganhos = document.getElementById('ganhos');
    const alcool = document.getElementById('alcool');
    const gastos = document.getElementById('gastos');
    const divResul = document.getElementById('resultContainer');
    const p = document.getElementById('result');
    const mediaPorL = 11.80;
    const precoGNV = 4.70;

    const form = document.getElementById('uberForm');
    const historyContainer = document.getElementById('historyContainer');
    const historyList = document.getElementById('historyList');

    // Carregar histórico do localStorage
    const history = JSON.parse(localStorage.getItem('history')) || [];

    function getWeekNumber(d) {
        // Copia a data para não modificar o original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Define o início da semana como segunda-feira
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNum;
    }

    // Exemplo de uso
    const today = new Date();
    const weekNumber = getWeekNumber(today);
    console.log(`Semana do ano: ${weekNumber}`);

    // Função para formatar a data no formato dd/mm/yyyy
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para atualizar o histórico na página
    function updateHistoryDisplay() {
        historyList.innerHTML = '';

        // Agrupar histórico por mês
        const groupedHistory = {};
        history.forEach((item) => {
            const date = new Date(item.data);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            if (!groupedHistory[monthYear]) {
                groupedHistory[monthYear] = [];
            }
            groupedHistory[monthYear].push(item);
        });

        // Ordenar chaves por mês
        const sortedKeys = Object.keys(groupedHistory).sort((a, b) => {
            const [monthA, yearA] = a.split('/');
            const [monthB, yearB] = b.split('/');
            return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
        });

        // Criar itens no histórico com cabeçalho de mês
        sortedKeys.forEach((key) => {
            const monthYear = key;
            const items = groupedHistory[key];
            
            const monthName = new Date(items[0].data).toLocaleString('pt-br', { month: 'long' });

            const monthHeader = document.createElement('h3');
            monthHeader.textContent = monthName;

            historyList.appendChild(monthHeader);

            items.forEach((item) => {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.innerHTML = `Semana do ano: <strong>${item.Semana}</strong> Data: <strong>${formatDate(new Date(item.data))}</strong> Ganhos: <strong>${item.ganhos}</strong> Líquido: <strong>${item.resultado}</strong>`;
                const button = document.createElement('button');
                button.textContent = 'Apagar';
                button.addEventListener('click', () => {
                    removeHistoryItem(history.indexOf(item));
                });
                li.appendChild(span);
                li.appendChild(button);
                historyList.appendChild(li);
            });

            const spacer = document.createElement('div');
            spacer.style.marginBottom = '2rem'; // Espaço entre os meses
            historyList.appendChild(spacer);
        });
    }

    // Função para remover um item do histórico
    function removeHistoryItem(index) {
        history.splice(index, 1);
        localStorage.setItem('history', JSON.stringify(history));
        updateHistoryDisplay();
    }

    // Atualizar o histórico ao carregar a página
    updateHistoryDisplay();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const kmValue = parseFloat(kmDia.value);
        const ganhosValue = parseFloat(ganhos.value);
        const alcoolValue = parseFloat(alcool.value);
        const gastosValue = parseFloat(gastos.value);

        let resultado = Math.floor(((kmValue / mediaPorL) * precoGNV));
        resultado += alcoolValue;
        resultado += gastosValue;

        const lucroLiquido = ganhosValue - resultado;

        divResul.style.display = 'block';
        p.innerHTML = `Sobrou Líquido: <strong>${lucroLiquido}</strong>`;

        // Adicionar o novo resultado ao histórico
        history.push({ Semana: weekNumber, data: new Date(), ganhos: ganhosValue, resultado: lucroLiquido });
        localStorage.setItem('history', JSON.stringify(history));

        // Atualizar a exibição do histórico
        updateHistoryDisplay();
    });
});


