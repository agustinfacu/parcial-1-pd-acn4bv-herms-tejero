json que estamos editando para generar la api:
"https://raw.githubusercontent.com/agustinfacu/parcial-1-pd-acn4bv-herms-tejero/refs/heads/api/remote.json"

Proyecto: Web para La Montaña imprenta
Link del repo github: https://github.com/agustinfacu/parcial-1-pd-acn4bv-herms-tejero/tree/master

En este proyecto web utilizaremos en una primera etapa código HTML,JSON,JS,CSS luego en una segunda etapa se implementará REACT,PHP,SQL.
En esta primer etapa no se contara con un back-end ni base de datos por lo que solamente se mostrará un front con algo de dinamismo simulado usando JS de nuestra landing page.
Estructura actual del proyecto
css (carpeta para estilos)
    index.css (archivo con los estilos del landing page entero)
image (carpeta para las imágenes)
    anillados —--------->	categoria-anillado.jpg
    apuntes —----------> categoria-apuntes.jpg
    encuadernados—-> categoria-ecuadernado.jpg
    libros —--------------> categoria-libros.jpg
barra-de-menus.png
icon.jpg
Para agregar imagenes de productos revisar el formato para el nombre de la imagen segun API ([https://jsonblob.com/1424160473720479744](https://raw.githubusercontent.com/agustinfacu/parcial-1-pd-acn4bv-herms-tejero/refs/heads/api/remote.json))
js (carpeta para los archivos javascript )
    auth.js (Este archivo JavaScript implementa la lógica básica de gestión de usuarios y autenticación local)
    noticias.js (controla la sección de Noticias y Promociones de la landing page, permitiendo al usuario ordenar, filtrar y paginar los elementos de forma dinámica)
    productos.api.js (gestiona la carga y visualización dinámica del catálogo de productos y servicios de la imprenta. Su función principal es obtener los datos desde una API alojada en JSONBlob, con un sistema de fallback local al archivo data.json en caso de falla de conexión.)
    sidebar.js (controla la interfaz lateral de autenticación (sidebar) de la landing page, gestionando tanto la apertura y cierre del menú como las pestañas de Inicio de sesión y Registro de usuario.)

data.json (copia local del código de la API en JSON se usa si hay fallo en la conexión con jsonblob )
index.html (Archivo HTML de la landing page)



