// DataTable.tsx
import { useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
} from "@mui/material";
import Papa from "papaparse";

interface DataTableProps {
    data: any[]; // Los datos que se mostrarán en la tabla
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [selectedFields, setSelectedFields] = useState<string[]>(Object.keys(data[0]));
    const [orderBy, setOrderBy] = useState<string>("");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleFieldChange = (fieldName: string) => {
        if (selectedFields.includes(fieldName)) {
            setSelectedFields(selectedFields.filter((field) => field !== fieldName));
        } else {
            setSelectedFields([...selectedFields, fieldName]);
        }
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedData = filteredData.sort((a, b) => {
        if (orderBy && a[orderBy] !== b[orderBy]) {
            return order === "asc" ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
        }
        return 0;
    });

    const downloadCSV = () => {
        const csv = Papa.unparse(sortedData, { quotes: true }); // Usa { quotes: true } para agregar comillas a los valores
        const blob = new Blob([csv], { type: "text/csv" });

        // Crea un enlace para descargar el archivo CSV
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.csv"; // Cambia el nombre del archivo según tus preferencias

        // Hace clic en el enlace para descargar el archivo
        link.click();
    };

    return (
        <>
            {/* Selección de campos */}
            <FormControlLabel
                control={<Checkbox checked={selectedFields.length === Object.keys(data[0]).length} onChange={() => setSelectedFields(selectedFields.length === Object.keys(data[0]).length ? [] : Object.keys(data[0]))} />}
                label="Mostrar todos los campos"
            />
            {Object.keys(data[0]).map((fieldName) => (
                <FormControlLabel
                    key={fieldName}
                    control={
                        <Checkbox
                            checked={selectedFields.includes(fieldName)}
                            onChange={() => handleFieldChange(fieldName)}
                        />
                    }
                    label={fieldName}
                />
            ))}

            {/* Tabla */}
            <Table>
                <TableHead>
                    <TableRow>
                        {selectedFields.map((field) => (
                            <TableCell key={field} sortDirection={orderBy === field ? order : false}>
                                <TableSortLabel active={orderBy === field} direction={orderBy === field ? order : "asc"} onClick={() => handleRequestSort(field)}>
                                    {field}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((row, index) => (
                        <TableRow key={index}>
                            {selectedFields.map((field) => (
                                <TableCell key={field}>{row[field]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TextField
                label="Buscar"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {/* Botón para descargar el CSV */}
            <Button variant="contained" onClick={downloadCSV}>
                Descargar CSV
            </Button>
        </>
    );
};

export default DataTable;