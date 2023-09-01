
# <div align="center">Documentación del Proyecto de Entrenamiento de Tensor para Reconocer Imágenes de Calidad</div>

<!-- <div align="center"> -->
El siguiente archivo README proporciona una descripción detallada del proyecto de entrenamiento de Tensor para reconocer imágenes de buena y mala calidad. El proyecto utiliza TensorFlow.js y Jimp para procesar y entrenar modelos de aprendizaje automático. Además, se incluyen instrucciones sobre cómo agregar casos adicionales, como calidad media, al proyecto.
<!-- </div> -->

# Estructura del Proyecto
La estructura del proyecto es la siguiente:

- train
  - data
    - temp (aquí se encuentran las imágenes a convertir)
    - test
    - train
  - model (aquí se guarda el modelo entrenado)
- convert.js
- data.js
- main.js
- model.js
- package.json

## A continuación, se describen los archivos principales y su funcionalidad:

## convert.js

Este archivo contiene el código para convertir imágenes de un formato a otro utilizando la biblioteca Jimp. Se encarga de leer las imágenes en el directorio especificado, redimensionarlas y guardarlas en un nuevo directorio.

## data.js
En este archivo se cargan y procesan las imágenes de entrenamiento y prueba. Las imágenes se redimensionan, se normalizan y se almacenan en tensores de TensorFlow.

## main.js
El archivo principal main.js es responsable de cargar los datos, crear y entrenar el modelo, y evaluar su rendimiento utilizando TensorFlow.js.

## model.js
En model.js se define la arquitectura del modelo de aprendizaje automático. Se utiliza una secuencia de capas convolucionales y densas para procesar las imágenes de entrada y realizar la clasificación.

 ## Cómo Agregar Casos Adicionales (por ejemplo, calidad media)

Si deseas agregar casos adicionales, como calidad media, al proyecto, sigue estos pasos:

- Asegúrate de tener imágenes de calidad media disponibles en un directorio adecuado, por ejemplo, data/medium_quality.

- Copia las imágenes de calidad media al directorio data/temp.

- Ejecuta el script de conversión utilizando el siguiente comando:

   * npm run convert 

Esto redimensionará y convertirá las imágenes de calidad media en el formato especificado y las guardará en el directorio data/train.

- Abre el archivo data.js y modifica la función loadImages para incluir las imágenes de calidad media. Puedes seguir la misma lógica utilizada para las imágenes de buena y mala calidad.

### Aquí hay un ejemplo de cómo podrías modificar la función loadImages:

function loadImages(dataDir) {
  const images = [];
  const labels = [];

  var files = fs.readdirSync(dataDir);
  for (let i = 0; i < files.length; i++) {
    if (!files[i].toLocaleLowerCase().endsWith("." + FORMAT)) {
      continue;
    }

    var filePath = path.join(dataDir, files[i]);

    var buffer = fs.readFileSync(filePath);

    var imageTensor = tf.node
      .decodeImage(buffer, 3)
      .resizeNearestNeighbor([SIZE_W, SIZE_H])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();
    images.push(imageTensor);

    var quality = getQualityFromFileName(files[i]);
    labels.push(quality);
  }

  return [images, labels];
}

Asegúrate de definir la función getQualityFromFileName para determinar la calidad de las imágenes en función de sus nombres de archivo.

Guarda los cambios en data.js.

- Ejecuta el entrenamiento del modelo nuevamente utilizando el siguiente comando:

  * npm run train 

El modelo ahora se entrenará con las imágenes de calidad media incluidas en los datos de entrenamiento.

¡Ahora has agregado con éxito casos adicionales, como calidad media, al proyecto! El modelo de Tensor ahora podrá reconocer y clasificar imágenes de diferentes calidades.

# Conclusión
El proyecto de entrenamiento de Tensor para reconocer imágenes de buena y mala calidad proporciona una base sólida para trabajar con datos de imagen y modelos de aprendizaje automático. Siguiendo las instrucciones proporcionadas anteriormente, puedes ampliar fácilmente el proyecto para incluir casos adicionales, como calidad media. Esto permitirá que el modelo aprenda a clasificar imágenes con diferentes niveles de calidad y mejore su capacidad de reconocimiento.
