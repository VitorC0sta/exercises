function scope() {
  const searchButton = document.querySelector("#search-button");
  //Cria uma máscara pro CPF (apenas números podem ser inseridos).
  const cpfMask = () => {
    const textSearch = document.querySelector("#text-search");
    textSearch.addEventListener("keypress", (e) => {
      let textInputed = textSearch.value.length;

      //Teclas numericas iniciam por 'Digit'.
      if (!e.code.startsWith("Digit")) {
        e.preventDefault();
      } else {
        //Ponto depois de 3 números.
        if (textInputed === 3 || textInputed === 7) {
          textSearch.value += ".";
          // '-' nos digitos
        } else if (textInputed === 11) {
          textSearch.value += "-";
        }
      }
    });
  };

  cpfMask();

  //GET dos dados do JSON-Server pelo cpf.
  async function getDataByCpf(cpf) {
    try {
      //Busca da chave pelo cpf.
      const pessoaResponse = await fetch(
        `http://localhost:3000/pessoas?cpf=${cpf}`
      );
      const pessoaJson = await pessoaResponse.json();
      return pessoaJson;
    } catch (err) {
      console.error(err.status);
    }
  }

  //Envia o cpf para a busca na API e se bater o cpf retorna uma pessoa.
  async function requireData(cpf) {
    const pessoaJson = await getDataByCpf(cpf);
    return pessoaJson;
  }

  //Procura o cpf digitado no input.
  searchButton.addEventListener("click", async (e) => {
    const textSearch = document.querySelector("#text-search");
    const cpf = textSearch.value;
    const containerInfo = document.querySelector(".container");
    containerInfo.innerHTML = "";

    //Se o cpf for vazio não permite a requisição  na API.
    if (cpf === "") {
      alert("Insira um CPF!");
      e.preventDefault();
      return;
    }

    const pessoaJson = await requireData(cpf);

    //Se o array retornado estiver vazio mostra o erro.
    if (pessoaJson.length === 0) {
      const erroIMG = document.createElement('img');
      erroIMG.setAttribute('class', 'error');
      erroIMG.setAttribute('src', 'https://i.pinimg.com/564x/6e/bf/a6/6ebfa6babb801c4981571b5636764a5d.jpg');
      containerInfo.appendChild(erroIMG);
      return;
    }

    console.log(pessoaJson);
    const table = createInformationTable(pessoaJson);
    containerInfo.appendChild(table);

    textSearch.value = "";
  });

  const createInformationTable = (json) => {
    const infoTable = createTable(json);
    return infoTable;
  };

  const createTable = (json) => {
    const table = document.createElement("table");
    table.setAttribute("class", "info-table");
    table.innerHTML = `
    <thead>
      <tr id="tittle">
        <th colspan="6">Dados Cadastrados</th>
      </tr>
   	  <tr id ="tittles">
    	  <th>Nome</th>
        <th>Salario</th>
        <th>Empresa</th>
        <th>Idade</th>
        <th>Sexo</th>
        <th>CPF</th>
      </tr>
    </thead>
    <tbody>
      <tr>
    	  <td>${json[0].nome}</td>
        <td>R$ ${json[0].salario},00</td>
        <td>${json[0].empresa}</td>
        <td>${json[0].idade}</td>
        <td>${json[0].sexo}</td>
        <td>${json[0].cpf}</td>
      </tr>
    </tbody>
    `;

    return table;
  };
}

scope();


/**
 * 506.336.797-63
 * 526.441.687-75
 * 307.327.888-54
 */