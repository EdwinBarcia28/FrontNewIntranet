import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown, ArrowUpDown, Save } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

export function DataTableOficina({ dataOficina , onSelectOficina }) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const columns = [
    {
      id: "select",
      header: () => <div className="text-center">Sel</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
    },
    {
      accessorKey: "id",
      headerLabel: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código Oficina
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "oficina",
      headerLabel: "oficina",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Oficina
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("oficina")}</div>,
    },
    {
      accessorKey: "stock",
      headerLabel: "Stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("stock")}</div>,
    },
    {
      accessorKey: "fechaRegistro",
      headerLabel: "Fecha de Registro",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Registro
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("fechaRegistro")}</div>,
    },
  ];

  const table = useReactTable({
    data: dataOficina,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
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

  const handleSeleccionar = () => {
    const selectedRow = table.getSelectedRowModel().rows[0];
    if (selectedRow) {
      console.log("Fila seleccionada:", selectedRow.original);
      onSelectOficina(selectedRow.original);
    }
  }


  return (
    <>
      {dataOficina !== undefined ? (
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
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
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
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
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
                Total de Coincidencias : {dataOficina?.length}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleSeleccionar}><Save />Guardar</Button>
            </div>
        </div>
      ) : (
        "NO HAY DATA"
      )}
    </>
  );
}

DataTableOficina.propTypes = {
  dataOficina: PropTypes.array.isRequired,
};
