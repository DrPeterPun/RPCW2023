import json


def ord_cidade(cidade):
    return cidade["nome"]


f = open("mapa.json")
data = json.load(f)
cidades = data["cidades"]
ligacoes = data["ligações"]
cidades.sort(key=ord_cidade)


pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title> Mapa Virtual </title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
"""
pag += """
                        </ul>
                    </td>
                    <td width="70%">
"""
for c in cidades:
    pag += f"""
                        <a name="{c['id']}"/>
                            <h3>{c['nome']}</h3>
                            <p> <b> população: </b> {c['população']} </p>
                            <p> <b> descrição: </b> {c['descrição']} </p>
                            <p> <b> distrito:</b> {c['distrito']} </p>
                            """
    for l in ligacoes:
        if l["origem"] == c["id"]:
            id_destino = l["destino"]
            for cidade in cidades:
                if cidade["id"] == id_destino:
                    nome_destino = cidade["nome"]
                    pag += f"""<p><a href="#{id_destino}">{nome_destino} </a>
                    - {l["distância"]} km</p>"""
    pag += """
                            <address> [<a href="#indice"> Voltar ao indice </a>]
                            </address>
                            <center>
                                <hr width="80%"/>
                            </center>
"""


pag += """
                    </td>
                </tr>
            </table>

        </body>
    </html>

    """
print(pag)
