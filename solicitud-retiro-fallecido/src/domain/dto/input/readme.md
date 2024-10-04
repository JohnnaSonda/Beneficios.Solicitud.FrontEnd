# dto input

## sintaxis dto Input

Para definir la interface dto (data transfer object) de entrada seguir el siguiente formato

```javascript
export interface IBuscarDtoInput {
  id: string;
  ...
  estadoMensajes: number;
}
```

- **id**: string campo obligatorio identificador
- **...**: campos de entrada formato nombre: tipo
- **estadoMensajes**: number codigo de severidad del mensaje

- El nombre de la interface comienza con **I** y termina con **DtoInput**.
- Nombre del archivo i.**accion**.dto.input.ts.
