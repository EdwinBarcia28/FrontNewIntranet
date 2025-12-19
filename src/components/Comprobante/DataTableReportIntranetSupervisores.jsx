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

export function DataTableReportIntranetSupervisores({ data }) {


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
            accessorKey: "oficina",
            headerLabel: "Oficina Registro",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Oficina Registro<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("oficina")}</div>,
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
        },
        {
            accessorKey: "usuario",
            headerLabel: "Usuario de Registro",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Usuario de Registro<ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("usuario")}</div>,
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

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h6 className="font-semibold leading-none tracking-tight">
                    Comprobantes Intranet
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
            <div className="flex justify-center mt-4 space-x-2">
                {/* Botón anterior */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>

                {/* Números de páginas */}
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                    <Button
                        key={i}
                        variant={i === table.getState().pagination.pageIndex ? "default" : "outline"}
                        size="sm"
                        onClick={() => table.setPageIndex(i)}
                    >
                        {i + 1}
                    </Button>
                ))}

                {/* Botón siguiente */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </>
    );
}

DataTableReportIntranetSupervisores.propTypes = {
    data: PropTypes.array
};
