const background = document.getElementById('modal-background');
const modalContainer = document.getElementById('modal-container');
const overlay = document.getElementById('modal-overlay')

// Funcao para ocultar o modal e nao aparecer eternamente
function backgroundClickHandler() {
    overlay.classList.remove('open');
}

// Habilitar o botao de finalizar pagamento
habilitarConfirma = (bool) => {
    btnConfirma = document.getElementById("btnFinalizar");
    if (bool){
        btnConfirma.disabled = false;
    } else {
        btnConfirma.disabled = true;
    }
}

// Habilitar o botao de metodo de pagamento
habilitarMetodo = (bool) => {
    btnMetodo = document.getElementById("btnMetodo");
    if (bool){
        btnMetodo.disabled = false;
    } else {
        btnMetodo.disabled = true;
    }
}

// Cria o modal de pagamento no HTML
criarModal = () => {
    overlay.classList.add('open');
    modalContainer.innerHTML = `
        <form name="pagamento">
        <h2>Pagamento</h2>
        <div class="cep">
            <h3>Calcular Frete</h3>
            <input type="" name="cep" id="cep" placeholder="CEP" maxlength="5"> - 
            <input type="text" name="cepDig" id="cepDig" placeholder="Díg." maxlength="3">
            <input type="button" id="btnFrete" value="Calcular Frete" onClick="validaCep();">
        </div>
        <div class="total" id="total-modal">
            <p>Total: R$ ${totalPagamento.toFixed(2).replace(".",",")}</p>
            <p>Frete: Insira o seu CEP</p>
        </div>
        <div class="metodo">
            <h3>Metodo de Pagamento</h3>
            <select id="forma">
                <option> Forma de pagamento
                <option id="pix">Pix
                <option id="boleto">Boleto
                <option id="debito">Débito
                <option id="credito">Crédito
            </select>
            <input type="button" id="btnMetodo" value="Selecionar" onclick="funMetodo();" disabled>
            <div class="credd" id="credd">
            </div>
            <div class="finalizar">
                <input type="button" id="btnFinalizar" value="Finalizar Pagamento" onclick="confirmaMetodo()" disabled>
            </div>
        </div>
    </form>`
    
}

// Calcular o frete apos digitar o cep
calcularFrete = (tot) => {
    var freteContainer = document.getElementById("total-modal");
    var frete = 100.00;

    if( tot <= 500 ) {
        freteContainer.innerHTML = `
            <p>Subtotal: R$ ${totalPagamento.toFixed(2).replace(".",",")}</p>
            <p>Frete: R$ ${frete.toFixed(2).replace(".",",")}</p>
            <hr><hr>
            <p>Total: R$ ${(totalPagamento + frete).toFixed(2).replace(".",",")}</p>`
    } else {
        freteContainer.innerHTML = `
            <p>Subtotal: R$ ${totalPagamento.toFixed(2).replace(".",",")}</p>
            <p>Frete: R$ ${frete.toFixed(2).replace(".",",")}</p>
            <s>Desconto: - R$ ${frete.toFixed(2).replace(".",",")}</s>
            <hr><hr>
            <p>Total: R$ ${totalPagamento.toFixed(2).replace(".",",")}</p>`;
    }    
}

// Validar se o cep inserido respeita o pattern definido
validaCep = () => {
    var cep = document.getElementById('cep').value;
    var cepDig = document.getElementById('cepDig').value;
    var cepPattern = /^(?=.*[0-9])[0-9]{5}$/;
    var cepDigPattern = /^(?=.*[0-9])[0-9]{3}$/;

    if (cep.match(cepPattern) && cepDig.match(cepDigPattern)){
        calcularFrete(totalPagamento)

        habilitarMetodo(1);
    }else{
            alert("Cep Inválido!");
            
            console.log('Cep Inválido')
        }
}

// Alterar o campo titular do cartao para maiusculo
maiuscula = (texto) => {
    texto.value = texto.value.toUpperCase();
}

// Habilita os campos do cartao apos selecionar a bandeira
habilitarDados = (bool) => {
    if (document.getElementById("band").value == "Bandeira"){
        alert("Selecione uma bandeira");
        document.pagamento.titular.disabled = true;
        document.pagamento.numero.disabled = true;
        document.pagamento.validade.disabled = true;
        document.pagamento.cvv.disabled = true;
    } else {
        if(bool){
        document.pagamento.titular.disabled = false;
        document.pagamento.numero.disabled = false;
        document.pagamento.validade.disabled = false;
        document.pagamento.cvv.disabled = false;
        }
    }
}

// Incluir as opcoes ao selecionar metodo cartao
opcaoCartao = (containerCartao,opcao) => { 
    return containerCartao.innerHTML+= `
    <form name="pagamento" id="forma-pagamento">
        <h3> Cartão de ${opcao}</h3>
        <select id="band">
            <option> Bandeira
            <option id="visa">Visa
            <option id="master">Mastercard
            <option id="ame">American Express
        </select>
        <input type="button" id="btnMetodo" value="Selecionar" onclick="habilitarDados(1);habilitarConfirma(1)">
        <div name="cartao" class="cartao">
            <label>Número do cartão
                <input autocomplete="off" class="cartao" type="text" id="ncard" name="numero" placeholder="0000 0000 0000 0000" maxlength="16" disabled>
            </label>
            <label>Nome do titular
                <input autocomplete="off" class="cartao" type="text" id="titular" name="titular" placeholder="Nome Titular" maxlength="19" onKeyUp="maiuscula(this)" disabled>
            </label>
            <label>Validade
                <input autocomplete="off" class="cartao" type="text" id="validade" name="validade" placeholder="mm/aa"  maxlength="5" disabled></label>
            <label>CVV
                <input autocomplete="off" class="cartao" type="password" id="cvv" name="cvv" placeholder="CVV" maxlength="3" disabled></label>
        </div>
    </form>
`}

// Habilitar os campos do cartao
habilitarDados = (bool) => {
    if (document.getElementById("band").value == "Bandeira"){
        alert("Selecione uma bandeira");
        document.pagamento.titular.disabled = true;
        document.pagamento.numero.disabled = true;
        document.pagamento.validade.disabled = true;
        document.pagamento.cvv.disabled = true;
    } else {
        if(bool){
        document.pagamento.titular.disabled = false;
        document.pagamento.numero.disabled = false;
        document.pagamento.validade.disabled = false;
        document.pagamento.cvv.disabled = false;
        }
    }
}

// Funcao para definir o metodo de pagamento e alterar a tela
funMetodo = () => {
    var opcao = document.getElementById("forma").value;
    var containerMetodo = document.getElementById('credd');

    if (opcao == 'Pix') {
        containerMetodo.innerHTML = "";
        var i = 1;
        
        let pixRandom = Math.random().toString(36).slice(2)+"-"+Math.random().toString(36).slice(2)+"-"+Math.random().toString(36).slice(2)+"-"+Math.random().toString(36).slice(2)
        
        while(i<=1){
            containerMetodo.innerHTML+= `
                <h4>Instruções para pagamento com ID:</h4>
                <div class="instrucoes">
                    <p class="instrucoes">1. Copie o ID da transação</p>
                    <p class="instrucoes">2. Use o ID para identificar seu pagamento PIX no aplicativo do seu banco.</p>
                    <br>
                    <p class="instrucoes">Copiar código: </p>
                    <p class="instrucoes">${pixRandom}</p>
                </div>
                <div id="qrcode">
                    <img alt="QRCODE" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pixRandom}">
                </div>`
            habilitarConfirma(1);
            i ++;
        }

    } else if (opcao == 'Boleto') {
        containerMetodo.innerHTML = "";
        var i = 1;
        
        var boletoRandom = Math.random()+"."+Math.random()+" "+Math.random()+"."+Math.random()

        while(i<=1){
            containerMetodo.innerHTML+= `
            <div class="instrucoes">
                <h4 class="instrucoes">Boleto gerado!</h4>
                <p class="instrucoes">Código para pagamento:</p>
                <p class="instrucoes">${boletoRandom}</p>
            </div>`
            habilitarConfirma(1);
            i ++;
        }

    }  else if (opcao == 'Débito') {
        containerMetodo.innerHTML = "";
        var i = 1;

        while(i<=1){
            opcaoCartao(containerMetodo,opcao);
            i ++;
            habilitarConfirma(0);
        }
        
    }  else if (opcao == 'Crédito') {
        containerMetodo.innerHTML = "";
        var i = 1;

        while(i<=1){
            opcaoCartao(containerMetodo,opcao);
            i ++;
            habilitarConfirma(0);
        }

    } else {
        alert('Forma de pagamento não selecionada.')
    }
}

// Validar o cartao de acordo com sua bandeira, e os campos nome, validade e cvv
validaCartao = () => {
    var optionBand = document.getElementById("band").value;
    var numCard = document.getElementById("ncard");
    var nomeTitular = document.getElementById("titular");
    var numValidade = document.getElementById("validade");
    var numCVV = document.getElementById("cvv");
    var testVisa = /^4[0-9]{12,15}$/;
    var testMast = /^5[1-5]{1}[0-9]{14}$/;
    var testAmex =/^3(4|7){1}[0-9]{13}$/;
    var testValidade = /^(?=.*[0-9])[0-9]{2}\/(?=.*[0-9])[0-9]{2}$/;
    var testCVV = /^(?=.*[0-9])[0-9]{3}$/;
    let valida = true;
    
    if (optionBand == 'Visa') {
        if (!numCard.value.match(testVisa)) {
            alert('Número incorreto. Verifique a bandeira.')
            document.pagamento.numero.focus();
            valida = false;
        }
    } else if (optionBand == 'Mastercard') {
        if (!numCard.value.match(testMast)) {
            alert('Número incorreto. Verifique a bandeira.')
            document.pagamento.numero.focus();
            valida = false;
        }
    } else if (optionBand == 'American Express') {
        if (!numCard.value.match(testAmex)) {
            alert('Número incorreto. Verifique a bandeira.')
            document.pagamento.numero.focus();
            valida = false;
        }
    }
    
    if (nomeTitular.value == "" || nomeTitular.value.indexOf(" ") == -1) {
        alert("Preencha o titular corretamente. (Nome e sobrenome)")
        nomeTitular.focus()
        valida = false;
    }

    if (!numValidade.value.match(testValidade)) {
        alert("Preencha a validade corretamente (mm/aa)")
        numValidade.focus()
        valida = false;
    }

    if (!numCVV.value.match(testCVV)) {
        alert("Preencha o CVV corretamente. (Apenas números)")
        numCVV.focus()
        valida = false;
    }

    if (valida){
        alert("Compra confirmada! Volte sempre!!");
        window.location.replace('index.html');
    }
}

// Funcao para finalizar o pagamento
confirmaMetodo = () => {
    metodo = document.getElementById("forma").value;
    
    if (metodo == "Pix"){
        alert("Compra confirmada! Volte sempre!!");
        window.location.replace('index.html');
    } else if (metodo == "Boleto"){
        alert("Compra confirmada! Volte sempre!!");
        window.location.replace('index.html');
    } else if (metodo == "Débito"){
        validaCartao();
    } else if (metodo == "Crédito"){
        validaCartao();
    } else {
        alert("Selecione um método de pagamento.")
    }
}

// Acionar a função de ocultar modal
background.addEventListener('click', backgroundClickHandler);
