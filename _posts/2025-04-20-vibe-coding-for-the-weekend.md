---
layout: post
title: "Vibe coding el fin de semana"
subtitle: "¿Qué tan difícil es hacer una app en un fin de semana con IA?"
summary: "[opinión] Con las herramientas actuales de generación de código, definitivamente se pueden hacer POCs en tiempo récord con el trade off de en el futuro necesitar hacer un refactor del código generado. El punto estará en cómo encontrar ese punto de equilibrio."
image: /assets/images/markdown_v_html.PNG
lang: es
tags: opinión, ia
---

# ¿Por qué todos están hablando de vibe coding?
Si estás leyendo esto en 2025, tal vez quieras saber qué es vibe coding y por qué todos hablan de ello. En los últimos 2 años la inteligencia artifical se ha desarrollado de tal manera que podemos usarla en muchas de las cosas que hacemos en nuestro día a día. Esto quiere decir que podemos usar inteligencia artificial para programar. Inicialmente yo inicié probando github copilot en el trabajo, a primera vista sólo parecía una versión "mejorada" del auto complete que conocíamos, incluso en muchas conversaciones las quejas se hacían escuchar; muchas veces copilot sugería código que no era de gran utilidad.

Desde esta experiencia ha pasado tal vez entre 1 y 2 años, y no digo que copilot no era útil, simplemente era la versión "mejorada" de la función de autocompletar. Este fin de semana decidí probar otra vez escribir código asistido por inteligencia artificial, específicamente usando Cursor. La experiencia ha sido muy diferente. Usando cursor he podido escribir una pequeña app dónde aproximadamente el 90% del código ha sido generado.

Sin embargo esto no necesariamente significa vibe coding, se atribuye el término a un post en el que se define como una forma de "olvidarse" que el código existe. Esto es posible ya que herramientas como cursor te permiten escribir en lenuaje "natural" lo que quieres que haga tu aplicación y con esto el código se generará, idealmente, sin intervención humana, al punto en el que no sería necesario, siquiera revisar que el código esté correctamente escrito.

![Vibe coding: Give into the vibes and forget the code even exists](/assets/images/2025-04-20/vibe_coding_post.png)

# Como toda en esta vida, lo tenemos que probar
Para poner a prueba vibe coding, decidí usar Cursor e intentar usar inteligencia artificial crear una aplicación simple. Spoiler: no intenté hacer que me genere toda la aplicación pero le iba diciendo qué partes necesitaba que vaya generando e integrando mientras que iba construyendo la aplicación ya que luego de ver algunos videos que intentaban generar una aplicación completa necesitaban multiples rondas de conversaciones con el modelo para poder hacer que funcione; sabía desde ya que hacer esto tan sólo sería frustrante.

# La aplicación de prueba
La aplicación es realmente sencilla. Es una web que te permitirá subir videos a s3, generar subtítulos e incrustarlos en el vídeo. Este tipo de vídeos son bastante virales en esta época en las redes sociales. Aún que al comenzar no tenía en mente la arquitectura que quería, luego de haberla terminado, se ve así:

![SubMe: simple architecture](/assets/images/2025-04-20/subme_simple_architecture.png)

# ¿Cómo comenzó todo?
Habiendo trabajado históricamente en el backend, comencé a usar cursor para escribir funciones lambda. el prompt es relativamente sencillo pero necesita ser lo suficientemente explícito en lo que quiero que haga. Por ejemplo:

<code>
write a lambda function, that processes events from the api on /v1/users/me/videos and receives the access token in the Authorization bearer header. Then uses the email in the token to hash it using md5 and then goes to the table UPLOAD_REQUESTS_BY_USER and lists the videos in this table. This is a get endpoint paginated using the dynamo db pagination mechanism. Each request returns 50 items. The response is a JSON with key "videos" and each video contains timestamp, filename, status, created_at, file_size, content_type
</code>

La mayoría del tiempo he el código generado no necesitaba de cambios, e ido introduciendo cambios paulatinamente. Por ejemplo agregando campos o pidiéndole que configure AWS SAM, que cree las tablas en dynamo necesarias (en la template de SAM). De esta forma, la mayor parte del tiempo invertido de mi parte ha sido en hacer code review a los cambios que el IDE generaba y hacer pequeños cambios para que las cosas funcionen como quisiera.

Lo que pude notar durante la generación de código, es que el agente no tiene noción de lo que hacen otras funciones; ya generó código duplicado para gestionar la verificación de un token que uso para auth. Tal vez fue mi culpa por no definir que intente re utilizar el código de otras funciones cuándo definí los prompt, pero a la misma vez entiendo que es parte del paradigma "vibe with it".

# Y la web app?
Para la web, usé [v0](https://v0.dev/) de vercel con el siguiente prompt.

<code>
Create a modern, responsive web app for SubME. Subme is an app that allows you to upload a file and it will process it to add shot subtitles to viral videos on the internet. Use a modern colorful design. The app will have multiple pages.

The home page needs to have a header with the company logo, navigation links, and a call-to-action button. In the center it will have a hero section to prompt the user to upload the video. It will have a catchy phrase related to the app, the upload prompt will be centered on the screen and it will be the main action here.

After the hero section build a showcase section for videos that other users uploaded, each tile will have the video in the background, the user name on the top left and as a sub headline the date uploaded. Videos in the background do not auto play.
</code>

Decidí no seguir usando v0 para realizar continuar los cambios en su web, sino, descargué el código generado (ya que realmente se estéticamente se veía a algo que quisiera usar) y comencé a hacer cambios con prompts de la misma manera que había hecho en backend.

El único problema que encontré en este punto es que el código generado por v0 tenía varios componentes de ui y módulos importados que realmente no se usan. Probablemente evidencia de que el código generado viene de algún proyecto en la web que sí usaba todos esos componentes y librerías.

![v0 extra components](/assets/images/2025-04-20/v0_extra_components.png)

# Conclusiones

Con esta experiencia creo que vibe coding es magnífico para empezar un proyecto rápido y tal vez probar una idea. Los modelos son capaces, con las instrucciones correctas, generar código que funciona y tal vez con un cuidado extra se podría asegurar que no se genere mucha deuda técnica. Sin embargo si mi pequeño proyecto llegase a crecer, definitivamente me veo re escribiendo gran parte - especialmente en el front end -  para poder escalar el proyecto.

También creo que es válido resaltar que yo he programado en Java gran parte de mi carrera y no he dedicado suficiente tiempo a especializarme en el desarrollo web (para el front end que un proyecto podría requerir) o en backends en otros lenguajes (Go en este caso, ya que no quisiera ejecutar Java lambdas). Sin embargo, puedo leer código y entender qué hacer e identificar patrones. Por lo que tener un agente que me genere código y yo hacer el review me libera de tener que invertir tiempo leyendo documentación del framework (react), lenguaje de programación (go) o librería (aws go sdk). Esto hace tener una prueba de concepto mucho más rápido, lo importante es saber cuándo algo deja de ser prueba de concepto y necesita el rigor de parar y hacer un refactor.