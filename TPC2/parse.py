from bs4 import BeautifulSoup

with open('arq.xml', 'r') as f:
    arqs = BeautifulSoup(f, 'xml')

arqs = arqs.find_all("ARQELEM")
i = 0
for a in arqs:

    arq_html = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>{a.IDENTI.get_text()}</title>
        <meta charset="utf-8"/>
    </head>
    <body>
"""

    for tag in a.find_all():
        arq_html += f"""
        <p><b>{tag.name}: </b> {tag.get_text() if tag.get_text() else "MISSING"} </p>
        """

    with open(f'arqs/arq_{i}.html', 'w') as f:
        f.write(arq_html)
    i += 1


pagina_web = """
<!DOCTYPE html>
<html>
    <head>
        <title>Arqueossitios</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Arqueossitios</h1>
        <a name="indice"/>
        <h3>Indice</h3>
        <!-- indice -->
        <ul>
"""
i = 1
for arq in arqs:
    pagina_web += f"""
            <li>
                <a href="{i}">{arq.IDENTI.get_text()}</a>
            </li>
    """
    i += 1

pagina_web += """
        </ul>
    </body>
</html>
"""

with open(f'index.html','w') as f:
    f.write(pagina_web)
