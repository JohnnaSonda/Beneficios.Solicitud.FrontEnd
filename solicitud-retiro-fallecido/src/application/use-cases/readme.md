# Use Case component

## sintaxis de use case

```javascript
import { UsuarioInstance,BasicRequest } from "../../infrastructure/configuration/service.config";
import { IBuscarDtoInput } from "./../../domain/dto/input/i.usuarios.dto.input";
import { responseIsValid, useFetch } from "sonda.core.services";
import axios, { CancelTokenSource } from "axios";

export const BuscarUsuariosUseCase = (param: IBuscarDtoInput,setState: any) => {
  const cancelToken: CancelTokenSource = axios.CancelToken.source();
  setState({ loading: true, cancelToken: cancelToken });
  useFetch(UsuarioInstance,"POST",BasicRequest.Traer,param,cancelToken.token)
  .the(response) => {
    if (responseIsValid(response)) {
      setState({
          data:response.result,
          loading:false,
          error:false,
          errorMessage:[],
          cancelToken:undefined
        });
    } else {
      setState({
          data:[],
          loading:false,
          error:true,
          errorMessage:[...response.errors,...response.messages],
          cancelToken:undefined,
        });
    }
  });
};

```

## importando las librerias

```javascript
import { UsuarioInstance, BasicRequest } from "../../infrastructure/configuration/service.config";
import { IBuscarDtoInput } from "./../../domain/dto/input/i.usuarios.dto.input";
import { responseIsValid, useFetch } from "sonda.core.services";
import axios, { CancelTokenSource } from "axios";
```

- **UsuarioInstance**: contiene la instancia a la base URL Ej: http://localhost:9000/api/v1/Usuarios/
- **BasicRequest**: contiene el request apunta a los request BasicRequest.Traer buscar

- **IBuscarDtoInput**: dto utilizado como objeto de entrada para la invocacion a la API

- **responseIsValid**: funcion para verificar que la respuesta es exitosa, rango entre 100 y 299
- **useFetch**: libreria que invoca a la API con Axios

- **axios**: libreria para invocar a axios
- **CancelToken**: componente que me permite cancelar una llamada cuando se ha desmontado el componente

```javascript
export const BuscarUsuariosUseCase = (param: IBuscarDtoInput,setState: any) => {
```

- **BuscarUsuariosUseCase**: nombre de la use case sintaxis verbo Entidad UseCase
- **param**: asociado al dto de entrada contiene todos los parametros necesarios para invocar la API
- **setState**: funcion callback que sera ejecutada en el padre para asignar estados

```javascript
const cancelToken: CancelTokenSource = axios.CancelToken.source();
setState({ loading: true, cancelToken: cancelToken });
```

- **cancelToken**: se crea variable para poder accesar a token de axios y poder cancelar invocacion
- **setState**: se inicializa estado con loading true para que cargue loading en formulario padre

```javascript
useFetch(UsuarioInstance, "POST", BasicRequest.Traer, param, cancelToken.token);
```

- **useFetch**: invocacion a la API con metodo POST parametros y token

La respuesta es gestionada por callback, esto para liberar a la funcion y que pueda actualizar al padre con el spinner de loading.

```javascript
if (responseIsValid(response))
```

si la respuesta es valida, el callback setState actualizará la data con el resultado de la API, estado loading se setea a false, para que desaparezca el spinner, error se marca como false por que no hubo ningun problema con la invocacion al igual que el arreglo de mensajes de error, se libera el token de la invocacion.

```javascript
setState({
	data: response.result,
	loading: false,
	error: false,
	errorMessage: [],
	cancelToken: undefined,
});
```

de lo contrario si la respuesta es invalida la data se setea en un arreglo vacio, el estado loading se setea aflase, para que desaparezca el spinner, el error ahora se marca como true y en errorMessage se juntan los errores y los mensajes que pudieran existir, se librea el token de la invocacion.

```javascript
setState({
	data: [],
	loading: false,
	error: true,
	errorMessage: [...response.errors, ...response.messages],
	cancelToken: undefined,
});
```
