import { useEffect, useState } from "react";
import { ConsultaDatosParametrica } from "../../application/services/consulta-prevision";

interface Props {
	tableNames: string[];
}
const useParametersTable = ({ tableNames }: Props) => {
	const [tablesData, setTablesData] = useState<any[]>([]);

	const getTablesData = (tableName: string) =>
		tablesData.find((table) => table.tableName === tableName)?.tableData.datos || [];

	useEffect(() => {
		const buscarParametros = async () => {
			try {
				const tablePromises = tableNames.map(async (name) => {
					const tableData = await ConsultaDatosParametrica(name);
					return { tableName: name, tableData };
				});

				const values = await Promise.all(tablePromises);

				setTablesData(values);
			} catch (error) {
				console.error("Error fetching table parameters:", error);
				return tableNames.map((name) => ({ tableName: name, tableData: [] }));
			}
		};

		buscarParametros();
	}, []);

	return getTablesData;
};

export default useParametersTable;
