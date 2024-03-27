

console.log(document.querySelector("#jsVlPago").value)

var valorPago = 0;

var valorFinal = 0;


document.querySelector("#jsVlPago").addEventListener("change", () => 
{
    valorPago = document.querySelector("#jsVlPago").value;
})


document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do envio do formulário

    calcular();
});

calcular = () => {
    
    var valorFinal = Number(valorPago);

    if(valorFinal <= 0){
        alert("Necessário adicionar o valor pago.");
        return;
    }
    var select = document.querySelector("#tempUso");
    var selectedValue = select.value;

    //VERIFICA TEMPO DE USO
    vlTotalDescontoTempUso = 0;
    switch(selectedValue)
    {
        case '0':
            vlTotalDescontoTempUso = 0.3;
            break;
        case '1':
            vlTotalDescontoTempUso = 0.4;
            break; 
        case '2':
            vlTotalDescontoTempUso = 0.5;
            break;
        case '3':
            vlTotalDescontoTempUso = 0.6;
            break;  
    }
    
    //VERIFICA SE ESTÁ MANCHADO
    var vlRadioManchado = "";
    var isManchado = false;
    const itemsManchado = document.getElementsByName('mancha');
    for (var i = 0; i < itemsManchado.length; i++) {
        if (itemsManchado[i].checked) {
            vlRadioManchado = itemsManchado[i].value
            break;
        }
    }  

    if(vlRadioManchado === "sim")
        isManchado = true;

    //VERIFICA SE ESTÁ RASGADO
    var vlRadioRasgado = "";
    var isRasgado = false;
    const itemsRasgo = document.getElementsByName('rasgo');
    for (var i = 0; i < itemsRasgo.length; i++) {
        if (itemsRasgo[i].checked) {
            vlRadioRasgado = itemsRasgo[i].value
            break;
        }
    }  

    if(vlRadioRasgado === "sim")
        isRasgado = true;


    //CALCULO   
    var descontoSobreMancha = 0; 
    var descontoSobreRasgo = 0; 
    var descontoSobreTempoDeUso = 0;
    
    if(isRasgado)
        descontoSobreRasgo = valorPago * 0.4;

    if(isManchado)
        descontoSobreMancha = valorPago * 0.4;
    
    descontoSobreTempoDeUso = valorPago * vlTotalDescontoTempUso;

    debugger;

    valorFinal = valorPago - (descontoSobreMancha + descontoSobreRasgo + descontoSobreTempoDeUso);

    if(valorFinal <= 0)
        alert("Não é possível realizar um orçamento, pois o valor final seria menor que 0");
    else
        document.querySelector("#jsPrecoFinal").innerText = "R$ " + valorFinal;
}
