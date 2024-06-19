document.addEventListener('DOMContentLoaded', () => {
    const kmDia = document.getElementById('km');
    const ganhos = document.getElementById('ganhos');
    const alcool = document.getElementById('alcool');
    const gastos = document.getElementById('gastos');
    const divResul = document.getElementById('resultContainer')
    const p = document.getElementById('result')
    const mediaPorL = 11.80
    const precoGNV = 3.70

   
    const form = document.getElementById('uberForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const kmValue = kmDia.value;
        const ganhosValue = Number(ganhos.value);
        const alcoolValue = Number(alcool.value);
        const gastosValue = Number(gastos.value);

        let resultado = Math.floor(((kmValue / mediaPorL) * precoGNV))
        resultado += alcoolValue
        resultado += gastosValue

        console.log(`Km do dia: ${kmValue}`);
        console.log(`resultado: ${resultado}`);
        console.log(`Ganhos do dia: ${ganhosValue}`);
        console.log(`Álcool: ${alcoolValue}`);
        console.log(`Gastos: ${gastosValue}`);
        console.log(`Lucro Líquido: ${ganhosValue - resultado}`);

        divResul.style.display = 'block'
        p.innerHTML = `Sobrou Líquido: <strong>${ganhosValue - resultado} </strong>`


        
    });
});