---
layout: post
title: "Vibe coding el fin de semana"
subtitle: "¿Qué tan difícil es hacer una app en un fin de semana con IA?"
summary: ""
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
La aplicación es realmente sencilla. Es una web que te permitirá subir videos a s3, generar subtítulos e incrustarlos en el vídeo. Este tipo de vídeos son bastante virales en esta época en las redes sociales. Aún que al comenzar no tenía en mente la arquitectura en mente, luego de haberla terminado, se ve así: