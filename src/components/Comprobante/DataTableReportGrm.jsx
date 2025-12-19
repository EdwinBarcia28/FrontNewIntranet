import PropTypes from "prop-types";
import { useState } from "react";
import { ArrowUpDown, Check, FileText } from "lucide-react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function DataTableReportGrm({ data }) {


    const columns = [
        {
            accessorKey: "numeroComprobante",
            headerLabel: "Num. de Comprobante",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Num. de Comprobante<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("numeroComprobante")}</div>,
        },
        {
            accessorKey: "identificacion",
            headerLabel: "Identificación de Ciudadano",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Identificación de Ciudadano<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("identificacion")}</div>,
        },
        {
            accessorKey: "ciudadano",
            headerLabel: "Nombre Ciudadano",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nombre Ciudadano<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("ciudadano")}</div>,
        },
        {
            accessorKey: "servicio",
            headerLabel: "Servicio Pagado",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Servicio Pagado<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("servicio")}</div>,
        },
        {
            accessorKey: "fechaComprobante",
            headerLabel: "Fecha de Registro",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Fecha de Registro<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("fechaComprobante")}</div>,
        }
    ];

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        enableMultiRowSelection: false,
        state: {
            sorting,
            columnFilters,
            columnVisibility
        },
    });

    // Cantidad de páginas a mostrar por bloque
    const pagesPerBlock = 10;

    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;

    // Calcular bloque actual
    const currentBlock = Math.floor(currentPage / pagesPerBlock);
    const startPage = currentBlock * pagesPerBlock;
    const endPage = Math.min(startPage + pagesPerBlock, totalPages);


    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h6 className="font-semibold leading-none tracking-tight">
                    Comprobantes Grm
                </h6>

            </div>
            <div className="w-full max-w-[1300px] mx-auto">
                <div className="rounded-md border overflow-x-auto">
                    <Table className="min-w-[900px]">
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead key={header.id} className="text-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} className="text-center">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns?.length} className="h-24 text-center">
                                        No hay resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {/* PAGINACIÓN */}
            <div className="flex items-center justify-center gap-2 py-4">

                {/* BOTÓN ANTERIOR */}
                <Button
                    variant="outline"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    Anterior
                </Button>

                {/* NÚMEROS DE PÁGINA (de 10 en 10) */}
                {Array.from({ length: endPage - startPage }).map((_, i) => {
                    const page = startPage + i;

                    return (
                        <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            className="w-9 h-9 p-0"
                            onClick={() => table.setPageIndex(page)}
                        >
                            {page + 1}
                        </Button>
                    );
                })}

                {/* BOTÓN SIGUIENTE */}
                <Button
                    variant="outline"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    Siguiente
                </Button>
            </div>

        </>
    );
}

DataTableReportGrm.propTypes = {
    data: PropTypes.array
};
