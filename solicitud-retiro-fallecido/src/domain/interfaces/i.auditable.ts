/**
 * @description Interface que implementa campos de control auditables
 * @export
 * @example
 * //definiendo una entidad que extiende de IAuditable
 * export class Usuarios implements IAuditable {
 * ...
 * }
 * @category domain
 * @interface IAuditable
 */
export interface IAuditable {
	/**
	 * @description Estado Registro indica si el registro se encuentra vigente
	 * @type {string}
	 * @memberof IAuditable
	 */
	estadoReg: string;
	/**
	 * @description Fecha estado registro indica la fecha cuando se ingreso el estado del registro por primera vez
	 * @type {Date}
	 * @memberof IAuditable
	 */
	fecEstadoReg: Date;
	/**
	 * @description Fecha cuando se ingreso el registro al sistema
	 * @type {Date}
	 * @memberof IAuditable
	 */
	fecIngReg: Date;
	/**
	 * @description Usuario que ingreso el regitro al sistema
	 * @type {string}
	 * @memberof IAuditable
	 */
	idUsuarioIngReg: string;
	/**
	 * @description Ultima fecha en que se actualizó el registro
	 * @type {Date}
	 * @memberof IAuditable
	 */
	fecUltModifReg: Date;
	/**
	 * @description Ultimo usuario que modificó el registro
	 * @type {string}
	 * @memberof IAuditable
	 */
	idUsuarioUltModifReg: string;
	/**
	 * @description Ultima funcionalidad que modificó el registro
	 * @type {string}
	 * @memberof IAuditable
	 */
	idFuncionUltModifReg: string;
}

export const defaultAudit = (usu: string, fun: string): IAuditable => {
	return {
		estadoReg: "V",
		fecEstadoReg: new Date(),
		fecIngReg: new Date(),
		idUsuarioIngReg: usu,
		fecUltModifReg: new Date(),
		idUsuarioUltModifReg: usu,
		idFuncionUltModifReg: fun,
	};
};
