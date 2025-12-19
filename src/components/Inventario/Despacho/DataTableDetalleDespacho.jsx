import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";


export function DataTableDetalleDespacho({ despacho , onClose }) {


  const columns = [
    {
      accessorKey: "codigo",
      headerLabel: "codigo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Codigo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("codigo")}</div>,
    },
    {
      accessorKey: "codigoAux",
      headerLabel: "Codigo Auxiliar",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Codigo Aux
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("codigoAux")}</div>,
    },
    {
      accessorKey: "estado",
      headerLabel: "Estado",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estado
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("estado")}</div>,
    },
    {
      accessorKey: "observacion",
      headerLabel: "Observacion",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Observacion
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("observacion")}</div>,
    }
  ];




  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: despacho,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
  });

    // === PAGINADOR PERSONALIZADO (10 botones por grupo) ===
  const [pageGroup, setPageGroup] = useState(0);
  const buttonsPerGroup = 10;

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const startPage = pageGroup * buttonsPerGroup;
  const endPage = Math.min(startPage + buttonsPerGroup, totalPages);

  const handleNextGroup = () => {
    if (endPage < totalPages) setPageGroup((prev) => prev + 1);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) setPageGroup((prev) => prev - 1);
  };


  return (
    <>
        <>
          <div className="w-full max-w-[400px] sm:max-w-[1100px] mx-auto">
            <div className="flex items-center py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columnas <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.columnDef.headerLabel}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {Array.isArray(despacho) && despacho.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center">
                                {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                                )}
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
            <div className="flex justify-center mt-4 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevGroup}
                disabled={pageGroup === 0}
              >
                ◀
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>

              {Array.from({ length: endPage - startPage }, (_, i) => {
                const pageIndex = startPage + i;
                return (
                  <Button
                    key={pageIndex}
                    variant={pageIndex === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(pageIndex)}
                  >
                    {pageIndex + 1}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextGroup}
                disabled={endPage >= totalPages}
              >
                ▶
              </Button>
            </div>

            <div className="flex items-center justify-between flex-wrap py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                Total de Coincidencias : {despacho?.length}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="destructive" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </div>
          
        </>
    </>
  );
}

DataTableDetalleDespacho.propTypes = {
  despacho: PropTypes.array.isRequired,
  onClose: PropTypes.func,
};