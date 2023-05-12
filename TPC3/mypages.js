exports.pessoasPage = function(lista){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `

    for(let i=0; i < lista.length ; i++){
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.indexPage = function () {
  var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title> Main Page </title>
                <link rel="stylesheet" href="w3.css">
            </head>
            <body>
                    <header class="w3-container w3-blue">
                        <h1>Página Principal</h1>
                    </header> `;

  pagHTML += `
        <div class="w3-display-middle">
        <a href="/pessoas">
            <button class="w3-button w3-light-green">Lista de Pessoas</button>
        </a>
        <a href="/distribuicao_sexo">
            <button class="w3-button w3-light-green">Distribuição por sexo</button>
        </a>
        <a href="/distribuicao_desporto">
            <button class="w3-button w3-light-green">Distribuição por desporto</button>
        </a>
        <a href="/top10_profissoes">
            <button class="w3-button w3-light-green">Top 10 profissões</button>
        </a>
        </div> `;
  pagHTML += `
            </body>
        </html>
    `;
  return pagHTML;
};

exports.distribuicaoSexo = function (
  pessoasFeminino,
  pessoasMasculino,
  pessoasOutro
) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
         <head>
               <meta charset="UTF-8"/>
               <title> Distribuição por Sexo </title>
               <link rel="stylesheet" href="w3.css">
          </head>
          <body>
                <div class="w3-card-4 w3-hoverable">
                    <header class="w3-container w3-blue">
                        <h1>Distribuição por sexo</h1>
                    </header>

        <div class="w3-container">
    `;


  pagHTML += `<h2> Feminino - ${Object.keys(pessoasFeminino).length}</h2>`;
  pagHTML += `<div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `
    let lista = pessoasFeminino;
    for(let i=0; i < lista.length ; i++){
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }
    pagHTML += `</table>`


  pagHTML += `<h2> Masculino - ${Object.keys(pessoasMasculino).length}</h2>`;
pagHTML += `<div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `

    lista = pessoasMasculino;
    for(let i=0; i < lista.length ; i++){
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }
    pagHTML += `</table>`


  pagHTML += `<h2> Outro - ${Object.keys(pessoasOutro).length}</h2>`;
pagHTML += `<div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                        </tr>
                `

    lista = pessoasOutro;
    for(let i=0; i < lista.length ; i++){
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }
    pagHTML += `</table>`

  pagHTML += `
            </div>
                <footer class="w3-container w3-blue">
                <h5>Generated in RPCW</h5>
                </footer>
            </div>
            </table>
        </body>
    </html>
    `;
  return pagHTML;
};
