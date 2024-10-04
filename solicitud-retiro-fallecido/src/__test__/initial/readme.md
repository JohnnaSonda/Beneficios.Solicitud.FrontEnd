# Initial testing component

## Se deben declarar todas las pruebas asociadas a todos los componentes nuevos

El formato de archivo es:

- nombre_de_componente.test.tsx

## Importar componentes para ejecutar la prueba

importaciones necesarias en el archivo de pruebas

```javascript
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@types/jest";
import "@types/testing-library__jest-dom";
```

luego se debe incorporar el componente al cual se le realizará la prueba

```javascript
import componente from "../../../componente.uc";
```

donde "componente" es el nombre del componente (export default) y la ruta de donde importarlo.

## Sintaxis básica

```javascript
describe("nombre_de_componente", () => {
  test("nombre_de_la_prueba_1", () => {
    ...prueba
  }
  test("nombre_de_la_prueba_2", () => {
    ...prueba
  }
}
```

> - describe: el primer parámetro identifica el componente a probar
> - test: el primer parámetro identifica la prueba a realizar, debe ser una descripción explícita.

## Selecciones

Si el texto, la etiqueta, el rol, la alternativa, el valor y el marcador de posición ESTÁN ahí, afirmación positiva.

| command              | example                                   | component                                           |
| -------------------- | ----------------------------------------- | --------------------------------------------------- |
| getByText            | screen.getByText('Hello World')           | `<div>Hello World</div>`                            |
| getByRole            | screen.getByRole('heading', { level: 1 }) | `<h1>Heading Level One</h1>`                        |
| getByLabelText       | screen.getByLabelText('Username')         | `<label for="username-input">Username</label>`      |
| getByPlaceholderText | screen.getByPlaceholderText('Username')   | `<input placeholder="Username" />`                  |
| getByAltText         | screen.getByAltText(/imagen principal/i)  | `<img alt="Imagen principal" src="/imagen.png" />`  |
| getByDisplayValue    | screen.getByDisplayValue('Alaska')        | `...<option selected value="AK">Alaska</option>...` |

Si el texto, la etiqueta, el rol, la alternativa, el valor y el marcador de posición NO ESTÁN allí: afirmación negativa.

| command                | example                                     | component                                           |
| ---------------------- | ------------------------------------------- | --------------------------------------------------- |
| queryByText            | screen.queryByText('Hello World')           | `<div>Hello World</div>`                            |
| queryByRole            | screen.queryByRole('heading', { level: 1 }) | `<h1>Heading Level One</h1>`                        |
| queryByLabelText       | screen.queryByLabelText('Username')         | `<label for="username-input">Username</label>`      |
| queryByPlaceholderText | screen.queryByPlaceholderText('Username')   | `<input placeholder="Username" />`                  |
| queryByAltText         | screen.queryByAltText(/imagen principal/i)  | `<img alt="Imagen principal" src="/imagen.png" />`  |
| queryByDisplayValue    | screen.queryByDisplayValue('Alaska')        | `...<option selected value="AK">Alaska</option>...` |

Si el texto, el rol de la etiqueta, la alternativa, el valor y el marcador de posición ESTARÁN allí: afirmación asincrónica. Por lo general, use await frente a estas afirmaciones.

| command           | example                                                  | component                                           |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------- |
| findByText        | await screen.findByText(container, 'User Name Required') | `<span id='sp1'>User Name Required</span>`          |
| ByRole            | await screen.ByRole('heading', { level: 1 })             | `<h1>Heading Level One</h1>`                        |
| ByLabelText       | await screen.ByLabelText('Username')                     | `<label for="username-input">Username</label>`      |
| ByPlaceholderText | await screen.ByPlaceholderText('Username')               | `<input placeholder="Username" />`                  |
| ByAltText         | await screen.ByAltText(/imagen principal/i)              | `<img alt="Imagen principal" src="/imagen.png" />`  |
| ByDisplayValue    | screen.ByDisplayValue('Alaska')                          | `...<option selected value="AK">Alaska</option>...` |

Si hay MÁS DE UN Texto, Etiqueta, Rol, Valor, Marcador de posición en el DOM renderizado, use Todo.

| command    | example                                         | component                                                           |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| getAllBy   | screen.debug(screen.getAllByText('multi-test')) | `<button>test</button><span>multi-test</span><div>multi-test</div>` |
| queryAllBy |                                                 |                                                                     |
| findAllBy  |                                                 |                                                                     |

## Funciones asertivas

| command              | descripcion                                                                                                                                                                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| toBeDisabled         | Esto le permite verificar si un elemento está deshabilitado desde la perspectiva del usuario. Coincide si el elemento es un control de formulario y el disabledatributo se especifica en este elemento o el elemento es un descendiente de un elemento de formulario con un disabledatributo.                                                         |
| toBeEnabled          | Esto le permite verificar si un elemento no está deshabilitado desde la perspectiva del usuario.Funciona como not.toBeDisabled(). Utilice este comparador para evitar la doble negación en sus pruebas.                                                                                                                                               |
| toBeEmpty            | Esto le permite afirmar si un elemento tiene contenido o no.                                                                                                                                                                                                                                                                                          |
| toBeEmptyDOMElement  | Esto le permite afirmar si un elemento no tiene contenido visible para el usuario. Ignora los comentarios, pero fallará si el elemento contiene espacios en blanco.                                                                                                                                                                                   |
| toBeInTheDocument    | Esto le permite afirmar si un elemento está presente en el documento o no.                                                                                                                                                                                                                                                                            |
| toBeInvalid          | Esto le permite verificar si un elemento no es válido actualmente.Un elemento no es válido si tiene un aria-invalidatributo sin valor o un valor de "true", o si el resultado de checkValidity() es false.                                                                                                                                            |
| toBeRequired         | Esto le permite verificar si actualmente se requiere un elemento de formulario. Se requiere un elemento si tiene un atributo requiredo aria-required="true".                                                                                                                                                                                          |
| toBeValid            | Esto le permite verificar si el valor de un elemento es válido actualmente.Un elemento es válido si no tiene ningún aria-invalidatributo o un valor de atributo de "false". El resultado de checkValidity() también debe ser truesi es un elemento de formulario.                                                                                     |
| toBeVisible          | Esto le permite verificar si un elemento está actualmente visible para el usuario.                                                                                                                                                                                                                                                                    |
| toContainElement     | Esto le permite afirmar si un elemento contiene otro elemento como descendiente o no.                                                                                                                                                                                                                                                                 |
| toContainHTML        | Confirme si una cadena que representa un elemento HTML está contenida en otro elemento:                                                                                                                                                                                                                                                               |
| toHaveAttribute      | Esto le permite verificar si el elemento dado tiene un atributo o no                                                                                                                                                                                                                                                                                  |
| toHaveClass          | Esto le permite verificar si el elemento dado tiene ciertas clases dentro de su classatributo.Debe proporcionar al menos una clase, a menos que esté afirmando que un elemento no tiene ninguna clase.                                                                                                                                                |
| toHaveFocus          | Esto le permite afirmar si un elemento tiene foco o no.                                                                                                                                                                                                                                                                                               |
| toHaveFormValues     | Esto le permite verificar si un formulario o conjunto de campos contiene controles de formulario para cada nombre dado y si tiene el valor especificado.                                                                                                                                                                                              |
| toHaveStyle          | Esto le permite verificar si un determinado elemento tiene algunas propiedades CSS específicas con valores específicos aplicados. Solo coincide si el elemento tiene aplicadas todas las propiedades esperadas, no solo algunas de ellas.                                                                                                             |
| toHaveTextContent    | Esto le permite verificar si el nodo dado tiene un contenido de texto o no. Esto admite elementos, pero también nodos de texto y fragmentos.                                                                                                                                                                                                          |
| toHaveValue          | Esto le permite verificar si el elemento de formulario dado tiene el valor especificado. Se acepta `<input>, <select>` y `<textarea>` elementos con la excepción de `<input type="checkbox">y <input type="radio">`, que puede ser igualada significativa solamente usando toBeCheckedo toHaveFormValues.                                             |
| toHaveDisplayValue   | Esto le permite verificar si el elemento de formulario dado tiene el valor mostrado especificado (el que verá el usuario final). Se acepta `<input>, <select>` y `<textarea>` elementos con la excepción de `<input type="checkbox">` y `<input type="radio">`, que puede ser igualada significativa solamente usando toBeChecked o toHaveFormValues. |
| toBeChecked          | Esto le permite verificar si el elemento dado está marcado. Acepta un input tipo de checkbox o radio y elementos con un role de checkbox, radio o switch con un aria-checked atributo válido de "true"o "false".                                                                                                                                      |
| toBePartiallyChecked | Esto le permite verificar si el elemento dado está parcialmente verificado. Acepta un input tipo checkbox y elementos con un role de checkbox con a aria-checked="mixed", o input de tipo checkbox con indeterminate establecido en true                                                                                                              |
| toHaveDescription    | Esto le permite verificar si el elemento dado tiene una descripción o no.                                                                                                                                                                                                                                                                             |

Para mas antecedentes y ejemplos favor [visitar](https://github.com/testing-library/jest-dom)

## Eventos para probar la interaccion con el usuario

| command                                              | example |
| ---------------------------------------------------- | ------- |
| userEvent.type como sustituto de todo lo siguiente   |         |
| fireEvent.mouseOver(element)                         |         |
| fireEvent.mouseMove(element)                         |         |
| fireEvent.mouseDown(element)                         |         |
| element.focus() (si el elemento puede tener el foco) |         |
| fireEvent.mouseUp(element)                           |         |
| fireEvent.click(element)                             |         |

## Cuadro resumen queries

|            | No match | 1 Match | 1+ Match | await? |
| ---------- | -------- | ------- | -------- | ------ |
| getBy      | Error    | Return  | Error    | No     |
| findBy     | Error    | Return  | Error    | Si     |
| queryBy    | null     | Return  | Error    | No     |
| getAllBy   | Error    | Array   | Array    | No     |
| findAllBy  | Error    | Array   | Array    | Si     |
| queryAllBy | []       | Array   | Array    | No     |
