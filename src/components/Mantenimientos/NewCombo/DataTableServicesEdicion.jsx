import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { serviceRequest } from "@/services/comprobantes";
import { toast } from "react-toastify";
import { DialogAcceptReceiptRegistration } from "./DialogAcceptReceiptRegistration";
import { DialogSearchAddServices } from "./DialogSearchAddServices";


export function DataTableServicesEdicion({ onAddRows, onClose }) {

  const [dataService,setDataService] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  
  //const { dataUser,  token } = useAuthStore();

  const fetchDataService = useCallback(async (token) => {
    try {
      const responseService = await serviceRequest(token);
      if (responseService == null) {
        return toast.error(
                "Comunicacion con el Servidor , se dio de forma interrumpida",
                {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                }
              );
      } else if (responseService !== null) {
        if (responseService.error == 1) {
          return toast.error(responseService.message, {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
          });
        } else if (responseService.error == 0) {
          setDataService(responseService.servicios);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataService();
  }, [fetchDataService]);
  
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
      accessorKey: "idServicio",
      headerLabel: "idServicio",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("idServicio")}</div>,
    },
    {
      accessorKey: "codigo",
      headerLabel: "Código de Servicio",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Codigo Servicio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("codigo")}</div>,
    },
    {
      accessorKey: "nombre",
      headerLabel: "Nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "valor",
      headerLabel: "Valor",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("valor")}</div>,
    },
    {
      accessorKey: "descripcion",
      headerLabel: "Descripcion",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descripcion
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("descripcion")}</div>,
    }
  ];


  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data:  dataService,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

    const selectedRows = table.getSelectedRowModel().rows;
    const totalValorSeleccionado = selectedRows.reduce((total, row) => {
        const valor = parseFloat(row.original.valor);
        return total + (isNaN(valor) ? 0 : valor);
    }, 0);

    const handleGuardar = () => {
        const serviciosSeleccionados = selectedRows.map((row) => row.original);
        console.log("Servicios seleccionados para agregar:", serviciosSeleccionados);
        onAddRows(serviciosSeleccionados);  // Enviamos al padre
        onClose();                          // Cerramos el modal
    };

  return (
    <>
      {dataService !== undefined ? (
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
                        colSpan={columns?.length}
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
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>

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

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>

            <div className="flex justify-between px-2 py-3  mt-4 text-sm">
                <div><strong>Servicios seleccionados:</strong> {selectedRows.length}</div>
                <div><strong>Total del valor:</strong> ${totalValorSeleccionado.toFixed(2)}</div>
            </div>
            <div className="flex justify-center py-4">
                <DialogSearchAddServices handleAgregar={handleGuardar} disabled={selectedRows.length === 0} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

DataTableServicesEdicion.propTypes = {
  onAddRows: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
