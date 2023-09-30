// criando uma constante que é um array de objetos
// cada objeto possui as propriedades id, nome, img e quantidade
const itens = [ 
    {
        id: 0,
        nome: 'Uniforme Seleção',
        img: './images/uniforme_brasil_1.webp',
        img2: './images/uniforme_brasil_2.webp',
        preco: 199.99,
        quantidade: 0 
    },
    {
        id: 1,
        nome: 'Bermuda Nike',
        img: './images/bermuda_nike_1.jpg',
        img2: './images/bermuda_nike_2.jpg',
        preco: 149.99,
        quantidade: 0
    },
    {
        id: 2,
        nome: 'Nike Jordan',
        img: './images/tenis_nike_1.webp',
        img2: './images/tenis_nike_2.webp',
        preco: 1199.99,
        quantidade: 0
    },
    {
        id: 3,
        nome: 'Short Nike',
        img: './images/short_nike_1.jpg',
        img2: './images/short_nike_2.jpg',
        preco: 114.99,
        quantidade: 0
    },
    {
        id: 4,
        nome: 'Tênis Adidas',
        img: './images/tenis_adidas_1.webp',
        img2: './images/tenis_adidas_2.webp',
        preco: 349.99,
        quantidade: 0
    }
]

// Função para dar boas vindas de acordo com o usuário
boasVindas = () => {
    var containerBoasVindas = document.getElementById('msg')
    containerBoasVindas.innerHTML = `Bem-vindo(a) ${localStorage.getItem('usuarioLogado')}`
}

boasVindas()

inicializarLoja = () => { 
    //seleciona o elemento HTML com o atributo "id" igual a "produtos" e o armazena na variável "containerProdutos"
    var containerProdutos = document.getElementById('produtos');

    // Para cada item (representado como "item"), o código dentro do bloco de função é executado.
    itens.map((item)=>{         
        containerProdutos.innerHTML+= `
        <div class="produto-single">
            <img src="${item.img}" onMouseOver="passarMouse(this, ${item.id});" onMouseOut="tirarMouse(this, ${item.id});"/>
            <p>${item.nome}</p>
            <p>R$ ${item.preco.toFixed(2).replace(".",",")}</p>
            <a class="adicionar" key="${item.id}" href="#">Adicionar ao Carrinho!<a/>
        </div>`;
    })        
}

inicializarLoja();

// Função para mudar a imagem ao passar o mouse
passarMouse = (imagem, idProduto) => {
    itens.map((item)=>{
        if (item.id == idProduto){
        imagem.src = item.img2
        }
    })   
}

// Função para voltar a imagem ao tirar o mouse
tirarMouse = (imagem, idProduto) => {
    itens.map((item)=>{
        if (item.id == idProduto){
        imagem.src = item.img
        }
    })
}

atualizarCarrinho = () => {
    //seleciona o elemento HTML com o atributo "id" igual a "carrinho" e o armazena na variável "containerCarrinho"
    var containerCarrinho = document.getElementById('carrinho');

    containerCarrinho.innerHTML = "";

    // Para cada item (representado como "item"), o código dentro do bloco de função é executado.
    itens.map((item)=>{
        if(item.quantidade > 0) {
        containerCarrinho.innerHTML+= `
        <div class='produto-carrinho'>
            <img src="${item.img}" onMouseOver="passarMouse(this,${item.id});" onMouseOut="tirarMouse(this,${item.id});"/>
            <p>${item.nome} | Quantidade: ${item.quantidade}</p>
            <p>${item.preco.toFixed(2).replace(".",",")} | R$ ${(item.quantidade * item.preco).toFixed(2).replace(".",",")}</p>
            <button class="remover" key="${item.id}" onclick="removerItem()"><i class="bi bi-trash-fill"></i></button>
            <hr>
        </div>`;
        }
    })
}

// <img src="./images/trash-can.png" alt="botão remover" id="trash">

var links = document.getElementsByClassName('adicionar');
var linksRemove = document.getElementsByClassName('remover');
var totalPagamento = 0
var qtdCarrinho = 0

// Percorre os links dos produtos para adicionar no carrinho e exibir na tela
for(var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function(){
        let key = this.getAttribute('key');
        if (itens[key].quantidade < 9){
            itens[key].quantidade++;
            totalPagamento += itens[key].preco;
            atualizaTotal();
            atualizarCarrinho();
            qtdCarrinho += 1;
            habilitarProsseguir(qtdCarrinho);
            return false;
        }else{
            alert("Quantidade máxima atingida.")
            return
        }
    })
}

// Percorre os links dos produtos para remover do carrinho
removerItem = () => {
    for(var i = 0; i < linksRemove.length; i++) {
        linksRemove[i].addEventListener("click", function(){
            let key = this.getAttribute('key');
            itens[key].quantidade--;
            totalPagamento -= itens[key].preco;
            atualizaTotal();
            atualizarCarrinho();
            qtdCarrinho -= 1;
            habilitarProsseguir();
            return false;
        })
    }
}

// Função para atualizar o subtotal do carrinho
atualizaTotal = () => {
    var containerTotal = document.getElementById('subtotal');

    containerTotal.innerHTML = `<div id="pagamento">
        <p>Subtotal: R$ ${totalPagamento.toFixed(2).replace(".",",")}</p>
    </div>`;
}

// Condição para habilitar o botão de prosseguir para a compra
var btnProsseguir = document.getElementById("btnProsseguir");
habilitarProsseguir = () => {
    if (qtdCarrinho > 0){
        btnProsseguir.disabled = false;
    } else {
        btnProsseguir.disabled = true;
    }
}