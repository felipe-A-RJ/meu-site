const produtos = [

    {
        id: 1,
        nome: "Eau de Parfum Bloom",
        categoria: "Perfumes",
        preco: 159.90,
        antigo: 199.90,
        desconto: "-20%",
        imagem:
        "https://images.unsplash.com/photo-1541643600914-78b084683601"
    },

    {
        id: 2,
        nome: "Sérum Facial Glow",
        categoria: "Skincare",
        preco: 79.90,
        antigo: 99.90,
        desconto: "-20%",
        imagem:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
    },

    {
        id: 3,
        nome: "Batom Velvet Matte",
        categoria: "Maquiagem",
        preco: 49.90,
        antigo: null,
        desconto: null,
        imagem:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa"
    },

    {
        id: 4,
        nome: "Kit Skincare Premium",
        categoria: "Skincare",
        preco: 189.90,
        antigo: 249.90,
        desconto: "-24%",
        imagem:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },

    {
        id: 5,
        nome: "Máscara Capilar Repair",
        categoria: "Cabelos",
        preco: 69.90,
        antigo: null,
        desconto: null,
        imagem:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b"
    },

    {
        id: 6,
        nome: "Perfume Floral Essence",
        categoria: "Perfumes",
        preco: 129.90,
        antigo: 159.90,
        desconto: "-19%",
        imagem:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f"
    },

    {
        id: 7,
        nome: "Base Natural Glow",
        categoria: "Maquiagem",
        preco: 64.90,
        antigo: null,
        desconto: null,
        imagem:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31"
    },

    {
        id: 8,
        nome: "Creme Hidratante Facial",
        categoria: "Skincare",
        preco: 29.90,
        antigo: null,
        desconto: null,
        imagem:
        "https://6aaa2695ab59dba39cf0b1c1.imgix.net/sandbox/nivea.webp"
    }

];


let carrinho = [];


/* FORMATAR DINHEIRO */

function moeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* MOSTRAR PRODUTOS */

function mostrarProdutos(lista) {

    const container =
        document.getElementById("listaProdutos");


    container.innerHTML = "";


    if (lista.length === 0) {

        container.innerHTML = `
            <p>
                Nenhum produto encontrado.
            </p>
        `;

        return;
    }


    lista.forEach(produto => {

        const antigo =
            produto.antigo
                ?
                `
                <span class="preco-antigo">
                    ${moeda(produto.antigo)}
                </span>
                `
                :
                "";


        const badge =
            produto.desconto
                ?
                `
                <span class="badge">
                    ${produto.desconto}
                </span>
                `
                :
                "";


        container.innerHTML += `

            <div class="produto-card">

                <div class="produto-img">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                    ${badge}

                    <button class="favorito">

                        <i class="fa-regular fa-heart"></i>

                    </button>

                </div>


                <div class="produto-info">

                    <span class="categoria">
                        ${produto.categoria}
                    </span>


                    <h3>
                        ${produto.nome}
                    </h3>


                    <div class="avaliacao">

                        ★★★★★

                    </div>


                    ${antigo}


                    <span class="preco">

                        ${moeda(produto.preco)}

                    </span>


                    <button
                        class="add-cart"
                        onclick="adicionarCarrinho(${produto.id})"
                    >

                        Adicionar à sacola

                    </button>

                </div>

            </div>

        `;

    });

}


/* ADICIONAR AO CARRINHO */

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    const existente =
        carrinho.find(
            item => item.id === id
        );


    if (existente) {

        existente.quantidade++;

    }

    else {

        carrinho.push({

            ...produto,

            quantidade: 1

        });

    }


    atualizarCarrinho();

    abrirCarrinho();

}


/* ATUALIZAR CARRINHO */

function atualizarCarrinho() {

    const container =
        document.getElementById(
            "itensCarrinho"
        );


    container.innerHTML = "";


    let total = 0;

    let quantidade = 0;


    if (carrinho.length === 0) {

        container.innerHTML = `
            <p style="
                text-align:center;
                color:#888;
                margin-top:50px;
            ">
                Sua sacola está vazia.
            </p>
        `;

    }


    carrinho.forEach(item => {

        total +=
            item.preco *
            item.quantidade;


        quantidade +=
            item.quantidade;


        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.imagem}"
                    alt="${item.nome}"
                >


                <div class="cart-item-info">

                    <h4>
                        ${item.nome}
                    </h4>

                    <span>
                        ${moeda(item.preco)}
                    </span>


                    <div class="quantity">

                        <button
                            onclick="
                                alterarQuantidade(
                                    ${item.id},
                                    -1
                                )
                            "
                        >
                            −
                        </button>


                        <span>
                            ${item.quantidade}
                        </span>


                        <button
                            onclick="
                                alterarQuantidade(
                                    ${item.id},
                                    1
                                )
                            "
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    document.getElementById(
        "contadorCarrinho"
    ).textContent =
        quantidade;


    document.getElementById(
        "total"
    ).textContent =
        moeda(total);

}


/* QUANTIDADE */

function alterarQuantidade(
    id,
    quantidade
) {

    const item =
        carrinho.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantidade += quantidade;


    if (item.quantidade <= 0) {

        carrinho =
            carrinho.filter(
                produto =>
                    produto.id !== id
            );

    }


    atualizarCarrinho();

}


/* ABRIR CARRINHO */

function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList
        .add("active");


    document
        .getElementById("overlay")
        .classList
        .add("active");

}


/* FECHAR */

function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList
        .remove("active");


    document
        .getElementById("overlay")
        .classList
        .remove("active");

}


/* BUSCAR */

function buscarProdutos() {

    const busca =
        document
        .getElementById("busca")
        .value
        .toLowerCase();


    const filtrados =
        produtos.filter(produto =>

            produto.nome
                .toLowerCase()
                .includes(busca)

            ||

            produto.categoria
                .toLowerCase()
                .includes(busca)

        );


    mostrarProdutos(filtrados);

}


/* CATEGORIA PELO SELECT */

function filtrarSelect() {

    const categoria =
        document
        .getElementById("categoria")
        .value;


    if (categoria === "Todos") {

        mostrarProdutos(produtos);

        return;

    }


    mostrarProdutos(

        produtos.filter(
            produto =>
                produto.categoria ===
                categoria
        )

    );

}


/* CATEGORIA PELO CARD */

function filtrarCategoria(
    categoria
) {

    document
        .getElementById("categoria")
        .value =
        categoria;


    mostrarProdutos(

        produtos.filter(
            produto =>
                produto.categoria ===
                categoria
        )

    );


    document
        .getElementById("produtos")
        .scrollIntoView();

}



/* FINALIZAR PEDIDO */

function finalizarPedido() {

    /* VERIFICAR CARRINHO */

    if (carrinho.length === 0) {

        alert("Sua sacola está vazia.");

        return;
    }


    /* FRETE */

    const frete = 15.00;


    /* SUBTOTAL */

    const subtotal = carrinho.reduce(

        (soma, item) =>

            soma +
            item.preco *
            item.quantidade,

        0

    );


    /* TOTAL */

    const total = subtotal + frete;


    /* NOME DO CLIENTE */

    let nome = prompt(
        "👤 Qual é o seu nome?"
    );


    if (!nome || nome.trim() === "") {

        alert(
            "Por favor, informe seu nome."
        );

        return;
    }

    nome = nome.trim();


    /* ENDEREÇO */

    let endereco = prompt(
        "📍 Informe seu endereço completo:\n\n" +
        "Rua, número, bairro e cidade."
    );


    if (!endereco || endereco.trim() === "") {

        alert(
            "Por favor, informe o endereço de entrega."
        );

        return;
    }

    endereco = endereco.trim();


    /* REFERÊNCIA */

    let referencia = prompt(
        "📌 Informe um ponto de referência:\n\n" +
        "Exemplo: Próximo ao mercado, casa com portão azul etc."
    );


    if (!referencia || referencia.trim() === "") {

        alert(
            "Por favor, informe um ponto de referência."
        );

        return;
    }

    referencia = referencia.trim();


    /* FORMA DE PAGAMENTO */

    let pagamento = prompt(
        "💳 Escolha a forma de pagamento:\n\n" +
        "1 - DINHEIRO\n" +
        "2 - PIX\n" +
        "3 - CARTÃO\n\n" +
        "Digite 1, 2 ou 3."
    );


    if (!pagamento) {

        alert(
            "Você precisa escolher uma forma de pagamento."
        );

        return;
    }


    pagamento = pagamento.trim();


    /* CONVERTER PAGAMENTO */

    let formaPagamento = "";


    if (pagamento === "1") {

        formaPagamento = "DINHEIRO";

    }

    else if (pagamento === "2") {

        formaPagamento = "PIX";

    }

    else if (pagamento === "3") {

        formaPagamento = "CARTÃO";

    }

    else {

        alert(
            "Opção inválida.\n\n" +
            "Digite:\n" +
            "1 para DINHEIRO\n" +
            "2 para PIX\n" +
            "3 para CARTÃO."
        );

        return;
    }


    /* CONFIRMAÇÃO DO PEDIDO */

    const confirmar = confirm(

        "🛍️ RESUMO DO PEDIDO\n\n" +

        "Cliente: " + nome + "\n\n" +

        "📍 Endereço:\n" +
        endereco + "\n\n" +

        "📌 Referência:\n" +
        referencia + "\n\n" +

        "💳 Pagamento: " +
        formaPagamento + "\n\n" +

        "Subtotal: " +
        moeda(subtotal) + "\n" +

        "Frete: " +
        moeda(frete) + "\n" +

        "TOTAL: " +
        moeda(total) + "\n\n" +

        "🚚 O frete é de R$ 15,00.\n\n" +

        "Deseja enviar o pedido pelo WhatsApp?"

    );


    if (!confirmar) {

        return;
    }


    /* MONTAR MENSAGEM DO WHATSAPP */

    let mensagem =

        "🛍️ *NOVO PEDIDO*\n\n" +

        "👤 *Cliente:* " +
        nome +
        "\n\n";


    /* PRODUTOS */

    carrinho.forEach(item => {

        mensagem +=

            "📦 *" +
            item.nome +
            "*\n" +

            "Quantidade: " +
            item.quantidade +
            "\n" +

            "Valor: " +
            moeda(
                item.preco *
                item.quantidade
            ) +

            "\n\n";

    });


    /* DADOS DE ENTREGA */

    mensagem +=

        "📍 *ENDEREÇO DE ENTREGA*\n" +

        endereco +
        "\n\n" +

        "📌 *REFERÊNCIA*\n" +

        referencia +
        "\n\n";


    /* PAGAMENTO */

    mensagem +=

        "💳 *FORMA DE PAGAMENTO*\n" +

        formaPagamento +
        "\n\n";


    /* VALORES */

    mensagem +=

        "💰 *SUBTOTAL:* " +
        moeda(subtotal) +
        "\n" +

        "🚚 *FRETE:* " +
        moeda(frete) +
        "\n" +

        "💵 *TOTAL COM FRETE:* " +
        moeda(total) +
        "\n\n";


    mensagem +=

        "✅ Aguardo a confirmação do pedido!";


    /* NÚMERO DO WHATSAPP */

    const telefone =

        "5521999999999";


    /* LINK DO WHATSAPP */

    const url =

        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;


    /* ABRIR WHATSAPP */

    window.open(

        url,

        "_blank"

    );

}






/* INICIAR */

mostrarProdutos(produtos);

atualizarCarrinho();