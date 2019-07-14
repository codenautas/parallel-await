<!--multilang v0 es:LEEME.md en:README.md -->
# parallel-await

<!--lang:es-->

Sustituto de Promise.all para objetos y fuertemente tipado para usar en Typescript

<!--lang:en--]

typed parallel await of any object

[!--lang:*-->

<!-- cucardas -->
![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/parallel-await.svg)](https://npmjs.org/package/parallel-await)
[![downloads](https://img.shields.io/npm/dm/parallel-await.svg)](https://npmjs.org/package/parallel-await)
[![build](https://img.shields.io/travis/codenautas/parallel-await/master.svg)](https://travis-ci.org/codenautas/parallel-await)
[![coverage](https://img.shields.io/coveralls/codenautas/parallel-await/master.svg)](https://coveralls.io/r/codenautas/parallel-await)
[![climate](https://img.shields.io/codeclimate/github/codenautas/parallel-await.svg)](https://codeclimate.com/github/codenautas/parallel-await)
[![dependencies](https://img.shields.io/david/codenautas/parallel-await.svg)](https://david-dm.org/codenautas/parallel-await)
[![qa-control](http://codenautas.com/github/codenautas/parallel-await.svg)](http://codenautas.com/github/codenautas/parallel-await)

<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->
## Instalación

<!--lang:en--]
## Install

[!--lang:*-->

```sh
$ npm install parallel-await
```

## API

### parallel(promiseObject):resolvedObject

```ts
import {parallel} from 'parallel-await';

var threeTasks = {
  data: db.query('SELECT client FROM clientes LIMIT 1'),
  content: fs.promises.readFile('template.html'),
  outFh: fs.promises.open('first-client.html','w')
}

var {data, content, outFh} = await parallel(threeTasks);

var mergedContent = await applyTemplate(content, data);

await outFh.write(mergedContent);

await outFh.close();
```

<!--lang:es-->

Con `await parallel` espera la ejecución en paralelo que fue lanzada en la variable threeTasks.

<!--lang:en--]

`await parallel` awaits the parallel execution launched in `threeTasks` variable.

<!--lang:es-->

## Licencia

<!--lang:en--]
## License

[!--lang:*-->

[MIT](LICENSE)
