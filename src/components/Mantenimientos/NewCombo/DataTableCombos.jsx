import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown, ArrowUpDown, Pencil, Trash2, Eye } from "lucide-react";
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
import { DialogSearchDetalleCombo } from "./DialogSearchDetalleCombo";
import { DialogEditDetalleCombo } from "./DialogEditDetalleCombo";
import { DialogAnularCombo } from "./DialogAnularCombo";
import { useAuthStore } from "@/store/auth";
import { anularComboRequest } from "@/services/medianet";
import { toast } from "react-toastify";


export function DataTableCombos({data , onRefresh }) {
  const { dataUser,  token } = useAuthStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComboId, setSelectedComboId] = useState(null);

  const [openDialogEdicion, setOpenDialogEdicion] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);


  const columns = [
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const data = row.original;
        

        const handleEditar = () => {
          setOpenDialogEdicion(true); 
          setSelectedCombo(data); 
        };

        const handleAnular = async () => {

          const payload = {
              IdCombo: Number(data.id), 
              UsuarioEliminacion: dataUser ? dataUser.nombreUsuario : "Desconocido",
          };
          
          try {
            const res = await anularComboRequest(payload,token);
          
            if (res.error === 0) {
              if (onRefresh) onRefresh(); 
                return toast.success(res.mensaje, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                return toast.error(`Error inesperado: ${res.message}`, {
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
            }
          }catch (error) {
            return toast.error(`Error inesperado: ${error}`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
          }
        };

        const handleConsultar = () => {
          setOpenDialog(true); 
          setSelectedComboId(data.id); 
        };

        return (
          <>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleEditar}
              className="text-blue-600 hover:text-blue-800"
              title="Editar"
            >
              <Pencil size={18} />
            </button>

            <DialogAnularCombo handleClickAnularCombo={handleAnular} />

            <button
              onClick={handleConsultar}
              className="text-gray-600 hover:text-gray-800"
              title="Consultar"
            >
              <Eye size={18} />
            </button>
          </div>
          </>
        );
      },
    },
    {
      accessorKey: "id",
      headerLabel: "id",
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
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "idTipoCombo",
      headerLabel: "idTipoCombo",
      header: () => <div className="hidden">Id Tipo</div>,
      cell: ({ row }) => <div className="hidden">{row.getValue("idTipoCombo")}</div>,
      enableHiding: true,
    },
    {
      accessorKey: "tipo",
      headerLabel: "tipo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("tipo")}</div>,
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
      cell: ({ row }) => (
        <div className="w-[300px] whitespace-pre-wrap break-words">
          {row.getValue("descripcion")}
        </div>
      ),
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
      accessorKey: "usuarioRegistro",
      headerLabel: "UsuarioRegistro",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuario Registro
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("usuarioRegistro")}</div>,
    },
    {
      accessorKey: "fechaRegistro",
      headerLabel: "FechaRegistro",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha Registro
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("fechaRegistro")}</div>,
    }
  ];



  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    // data:  dataService,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    //onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      // rowSelection,
    },
  });


  return (
    <>
      {data !== undefined ? (
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

            {/* <div className="flex justify-center py-4">
                <DialogAcceptReceiptRegistration handleClickAcceptReceiptRegistration={handleRegistrar} />
            </div> */}
          </div>
        </>
      ) : null}
      {openDialog && (
        <DialogSearchDetalleCombo
          data={selectedComboId}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}

      {openDialogEdicion && (
        <DialogEditDetalleCombo
          data={selectedCombo}
          open={openDialogEdicion}
          onClose={() => {
            setOpenDialogEdicion(false);
            if (onRefresh) onRefresh(); // 🔥 refresca después de cerrar edición
          }}
        />
      )}
    </>
  );
}

DataTableCombos.propTypes = {
  data: PropTypes.array,
  fetchDataDriver: PropTypes.func,
};
