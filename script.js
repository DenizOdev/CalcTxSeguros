document.addEventListener('DOMContentLoaded', function() {
/////////////////////////////////////////////////////////////////////
    const resultElement = document.getElementById('result');
    const tooltipResult = document.getElementById('tooltipResult');
    const calcularButton = document.getElementById('calculateBtn');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const insuredAmountInput = document.getElementById('insuredAmount');
    const premiumInput = document.getElementById('premium');
/////////////////////////////////////////////////////////////////////////

    // Adicionando funcionalidade de cópia ao clicar no resultado
    resultElement.addEventListener('click', function() {
        const resultValue = resultElement.innerText;

        // Criando um elemento temporário (input) para copiar o texto
        const tempInput = document.createElement('input');
        tempInput.value = resultValue;
        document.body.appendChild(tempInput);

        // Selecionando e copiando o texto do input temporário
        tempInput.select();
        document.execCommand('copy');

        // Removendo o input temporário
        document.body.removeChild(tempInput);

        Toastify({
            text: 'Valor copiado!',
            duration: 1000,
            close: false,
            gravity: 'top', 
            position: 'center', 
            backgroundColor: '#ACF39D',
            style: {
                color: '#000000',
                borderRadius: '10px',
                fontFamily: 'Nunito, sans-serif',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)',
            }
        }).showToast();
    });

    calcularButton.addEventListener('click', function () {
        const dataInicialInput = startDateInput.value;
        const dataFinalInput = endDateInput.value;

        const dataInicial = new Date(dataInicialInput);
        const dataFinal = new Date(dataFinalInput);

        const diferencaEmMilissegundos = dataFinal - dataInicial;
        const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 360);

        const insuredAmount = parseFloat(insuredAmountInput.value.replace(',', '.'));
        const premium = parseFloat(premiumInput.value.replace(',', '.'));

        // Verifica se os valores são válidos antes de calcular
        if (!isNaN(insuredAmount) && !isNaN(premium) && diferencaEmDias > 0) {
            const result = (premium / insuredAmount / (diferencaEmDias)) * 100;
            resultElement.innerText = result.toFixed(2) + '%';

            //////////////////////////////////////////////////////////
            Toastify({
                text: 'Cálculo realizado com sucesso!',
                duration: 1000,
                close: false,
                gravity: 'top', 
                position: 'center', 
                backgroundColor: '#ACF39D',
                style: {
                    color: '#000000',
                    borderRadius: '10px',
                    fontFamily: 'Nunito, sans-serif',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)',
                }
            }).showToast();

        } else {
            resultElement.innerText = 'Erro: Verifique os campos.';
            Toastify({
                text: 'Erro!!!',
                duration: 1000,
                close: false,
                gravity: 'top', 
                position: 'center', 
                backgroundColor: '#722826',
                style: {
                    color: '#f0f0f0',
                    borderRadius: '10px',
                    fontFamily: 'Nunito, sans-serif',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)',
                }
            }).showToast();
        }
    });

    resetBtn.addEventListener('click', function () {
        // Limpa todos os campos de input
        startDateInput.value = '';
        endDateInput.value = '';
        insuredAmountInput.value = '';
        premiumInput.value = '';
        resultElement.innerText = '0'; // Limpa o resultado também
    });
////////////////////////////////////////////////////////////////////////////////////////
    resultElement.addEventListener('mouseenter', function () {
        // Exibe a mensagem flutuante ao passar o mouse sobre o elemento result
        showTooltip('Clique para copiar o valor!');
        
    });

    resultElement.addEventListener('mouseleave', function () {
        // Oculta a mensagem flutuante ao remover o mouse do elemento result
        hideTooltip();
        
    });

    function showTooltip(message) {
        tooltipResult.innerText = message;
        tooltipResult.style.opacity = '0.8';
        tooltipResult.style.visibility = 'visible';
    }

    function hideTooltip() {
        tooltipResult.style.opacity = '0';
        tooltipResult.style.visibility = 'hidden';
    }
});
