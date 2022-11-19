---
layout: post
title: "Edita tus proyectos usando codespaces"
subtitle: "Nunca fue tan fácil editar proyectos sin instalar dependencias"
summary: "Codespaces parece ser una nueva funcionalidad de Github que te permite editar código desde cualquier navegador chrome e incluso te puedes conectar desde VS code."
image: /assets/images/markdown_v_html.PNG
---

Te ha pasado que cuando quieres trabajar en un proyecto lo primero que debes hacer es descargar el proyecto, intalar dependencias y configurar variables de ambiente, permisos, etc. Esto me sucedió recientemente mientras intentaba estaba intentando editar esta entrada del blog. Tristemente, descargue mi proyecto y como siempre comencé a instalar depedencias; una hora pasó y cuando finalmente había habilitado todos los permisos e inicie el modo de desarrollo para visualizar mis cambios, el proyecto simplemente no iniciaba. Que pérdida de tiempo!

## Enters codespaces
Había notado que github tenía una nueva pestaña al lado de la opción de descarga de código en la página de mi proyecto. Esta opción te permite abrir el proyecto en una máquina virtual que está hospedada en github.

![Code spaces en github](/assets/images/2022-11-19/codespaces-start.png)

## Opciones para codespaces
Codespaces te permite abrir Visual Code en tu buscador, si seleccionas estaopción podrás acceder rápidamente a una máquina virtual en la nube, no tarda más que unos segundos.

![VS code en la web](/assets/images/2022-11-19/codespaces-web.png)

Pero esta no es la única opción que tienes! también puedes abrir VS code desde tu ordenador y editar con una experiencia local. Esto te permite copiar archivos arrastrando archivos facilmente. Las opciones con las que puedes abrir tu código usando codespaces incluyen:

- VS code for Web
- VS code
- JetBrains Gateway
- JupyterLab

## Especificaciones para code spaces
Si te preocupa la velocidad de esta funcionalidad, creo que Github tiene opciones aceptables que te pueden ayudar en la implementación de tu proyecto. Actualmente tiene las siguienes opciones:

| CPU | MEM |
|-----|-----|
|  2  |  4  |
|-----|-----|
|  4  |  8  |
|-----|-----|
|  8  |  16 |
|-----|-----|
|  16 |  32 |
|-----|-----|

## Conclusiones
Configurar una máquina virtual con [github codespaces](https://github.com/features/codespaces) es tan fácil como hacer click en la opción "Abrir en VS code". Tiene un costo pero incluye una capa gratuita bastante generosa.