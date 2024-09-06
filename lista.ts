interface Item {
  nome: string;
  quantidade: number;
  categoria: string;
  status: string; //se colocar uma interrogação o atributo vira opcional
}

const listaCompras: Item[] = [];

function adicionarItem() {
  const nome = prompt("\nDigite o nome do item: ")!; //a exclamação é para afirmar que o valor nunca será null ou indefinido
  const quantidade = Number(prompt("Digite a quantidade: "));
  const categoria = prompt("Digite a categoria: ") as string;

  if (!nome || !quantidade || !categoria) {
    alert("Todos os campos são obrigatórios!");
    return; 
  }
  const novoItem: Item = {
    nome: nome,
    quantidade: quantidade,
    categoria: categoria,
    status: "nao comprado",
  };

  listaCompras.push(novoItem);
};

function listarItens() {
  const opcaoOrdenar = prompt("Ordenar por: (1) alfabética, (2) categoria, (3) quantidade",);
  let listaOrdenada = listaCompras
  console.table(listaOrdenada);
  
  if (opcaoOrdenar === "2") {
    listaOrdenada.sort((a, b) => a.categoria.localeCompare(b.categoria));
  } else if (opcaoOrdenar === "3") {
    listaOrdenada.sort((a, b) => a.quantidade - b.quantidade);
  } else {
    listaOrdenada.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  const opcaoFiltro = prompt("Filtrar por: (1) todas, (2) categoria: ")?.trim();

  if (opcaoFiltro === "2") {
    const categoria = prompt("Digite a categoria: ")?.trim();
    listaOrdenada = listaOrdenada.filter((item) => item.categoria === categoria);

  } else if (opcaoFiltro === "3") {
    const status = prompt("1 - comprado \n2 - não comprado: ");
    if (status === "1") {
      listaOrdenada = listaOrdenada.filter((item) => {item.status === "comprado"})
      console.table(listaOrdenada)
    } else if (status === "2") {
      listaOrdenada = listaOrdenada.filter((item) => {item.status === "nao comprado"})
      console.table(listaOrdenada)
    } else {
      console.log('Opção inválida!')
    }
    console.log("Lista de compras: ", listaOrdenada.forEach((item) => console.log(item)));
  }
  console.table(listaOrdenada)
}

  function editarItem() {
    const itemEditar = prompt("Digite o item a ser editado: ")?.trim();
    const index = listaCompras.findIndex((item) => item.nome === itemEditar);

    if (index !== -1) {
      //se o index for diferente de -1
      const novoNome = prompt("Novo nome: ")?.trim();
      const novaQuantidade = Number(prompt("Nova quantidade: ")?.trim());
      const novaCategoria = prompt("Nova categoria: ")?.trim();

      listaCompras[index] = {
        //a partir do índice acessa na lista
        nome: novoNome || listaCompras[index].nome,
        quantidade: novaQuantidade || listaCompras[index].quantidade,
        categoria: novaCategoria || listaCompras[index].categoria,
        status: listaCompras[index].status,
      };

      console.log("Item editado com sucesso!");
    } else {
      console.log("Item não encontrado!");
    }
  }

  function removerItem() {
    const itemRemover = prompt("Digite o item a ser removido: ") as string;
    const index = listaCompras.findIndex((item) => item.nome === itemRemover);

    if (index !== -1) {
      const confirmacao = prompt(
        `Tem certeza que deseja remover o item "${itemRemover}"? Digite "S" para SIM ou "N" para NÃO: `,
      ) as string;

      if (confirmacao.toLowerCase() === "s") {
        listaCompras.splice(index, 1);
        console.log(`Item "${itemRemover}" removido com sucesso!`);
      } else if (confirmacao.toLowerCase() === "n") {
        console.log("Remoção cancelada.");
      } else {
        console.log("Opção inválida! Por favor, digite 'S' ou 'N'.");
      }
    } else {
      console.log("Item não encontrado na lista.");
    }
  }


  function marcarItem() {
    const itemMarcar = prompt("Digite o item a ser marcado: ") as string;
    const index = listaCompras.findIndex((item) => item.nome === itemMarcar);
    if (index !== -1) {
      if (listaCompras[index].status === "comprado") {
        listaCompras[index].status = "não comprado";
      } else {
        listaCompras[index].status = "comprado";
      }
      console.log(
        `Status do item "${itemMarcar}" alterado para "${listaCompras[index].status}" com sucesso!,
    `);
    } else {
      console.log("Item não encontrado.");
    }
  }

  function resumoLista() {
    const totalItens = listaCompras.length;
    const itensPorCategoria = {};

    listaCompras.forEach((item) => {
      itensPorCategoria[item.categoria] =
        (itensPorCategoria[item.categoria] || 0) + 1;
    });

    const itensComprados = listaCompras.filter(
      (item) => item.status === "comprado",
    ).length;
    const itensNaoComprados = totalItens - itensComprados;

    console.log("Resumo da lista de compras: ");
    console.log(`Total de itens: ${totalItens}`);
    console.log("Itens por categoria:", itensPorCategoria);
    console.log(`Itens comprados: ${itensComprados}`);
    console.log(`Itens não comprados: ${itensNaoComprados}`);
  }

  function menu() {
    while (true) {
      const opcao = prompt(`
      OPÇÕES:
      1. Adicionar item
      2. Listar itens
      3. Editar item
      4. Remover item
      5. Marcar item como comprado
      6. Resumo da lista
      7. Sair
      Digite um número como opção: `);

      switch (opcao) {
        case "1":
          adicionarItem();
          break;
        case "2":
          listarItens();
          break;
        case "3":
          editarItem();
          break;
        case "4":
          removerItem();
          break;
        case "5":
          marcarItem();
          break;
        case "6":
          resumoLista();
          break;
        case "7":
          console.log("Programa encerrado!");
          return;
        default:
          console.log("Opção inválida!");
      }
    }
  }

  menu();