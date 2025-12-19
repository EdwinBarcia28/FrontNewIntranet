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
import { DialogAnularSolicitudDespacho } from "./DialogAnularSolicitudDespacho";
import { DialogAprobarSolicitudDespacho } from "./DialogAprobarSolicitudDespacho";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth";
import { anularSolicitudDespachoRequest, aprobarSolicitudDespachoRequest } from "@/services/inventario";
import { DialogAddDespacho } from "./DialogAddDespacho";


export function DataTableSearchSolicitudDespacho({data ,onRefresh }) {
  const { dataUser,  token } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSolicitudDespacho, setSelectedSolicitudDespacho] = useState(null);


  const columns = [
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const data = row.original;

        const handleAnular = async (id, oficina,cantidadPedida,motivo,usuarioCreacion,correo,observacion) => {
          const payload = {
            IdSolicitudDespacho: Number(id),
            CorreoRegistro: correo,
            CorreoRechazo: dataUser ? dataUser.email : "",
            UsuarioCreacion: usuarioCreacion,
            UsuarioAnulacion: dataUser ? dataUser.nombreUsuario : "Desconocido",
            OficinaPedido: oficina,
            Motivo: motivo,
            Cantidad: Number(cantidadPedida),
            Observacion: observacion || ""
          };

          try {
            const res = await anularSolicitudDespachoRequest(payload, token);

            if (res.error === 0) {
              if (onRefresh) onRefresh();
              toast.success(res.mensaje || "Solicitud anulada correctamente");
            } else {
              toast.error(res.mensaje || "Error al anular solicitud");
            }
          } catch (error) {
            toast.error(`Error inesperado: ${error.message || error}`);
          }
        };

        const handleAprobar = async (id,oficina,cantidadPedida,motivo,usuarioCreacion,correo) => {
          const payload = {
            IdSolicitudDespacho: Number(id),
            CorreoRegistro: correo,
            CorreoAprobacion: dataUser ? dataUser.email : "",
            UsuarioCreacion: usuarioCreacion,
            UsuarioAprobacion: dataUser ? dataUser.nombreUsuario : "Desconocido",
            OficinaPedido: oficina,
            Motivo: motivo,
            Cantidad: Number(cantidadPedida)
            
          };

          console.log("Payload Aprobar:", payload);

          try {
            const res = await aprobarSolicitudDespachoRequest(payload, token);

            if (res.error === 0) {
              if (onRefresh) 
                onRefresh();
              toast.success(res.mensaje || "Solicitud aprobada correctamente");
            } else {
              toast.error(res.mensaje || "Error al aprobar solicitud");
            }
          } catch (error) {
            toast.error(`Error inesperado: ${error.message || error}`);
          }
        };
        
        const handleAgregar = () => {
          setOpenDialog(true); 
          setSelectedSolicitudDespacho(data); 
        };


        return (
          <>
          <div className="flex justify-center items-center gap-2">
            {data.estado === "Pendiente" && (
              <>
                <DialogAprobarSolicitudDespacho handleClickAprobarSolicitudDespacho={() => handleAprobar(data.id,data.oficina,data.cantidadPedida,data.motivo,data.usuarioCreacion,data.correo)} />
                <DialogAnularSolicitudDespacho handleClickAnularSolicitudDespacho={(observacion) => handleAnular(data.id, data.oficina, data.cantidadPedida, data.motivo, data.usuarioCreacion, data.correo, observacion)}/>
              </>
            )}

            {data.estado === "Aprobado" && (
              <>
                <div className="flex justify-center">
                  <button
                    onClick={handleAgregar}
                    className="
                      px-4 py-2 
                      rounded-lg 
                      bg-gradient-to-r from-blue-500 to-indigo-600 
                      text-white font-medium 
                      shadow-md 
                      hover:from-blue-600 hover:to-indigo-700 
                      transition-all duration-200 
                      focus:outline-none focus:ring-2 focus:ring-blue-300
                    "
                    title="Agregar Despacho"
                  >
                    + Agregar
                  </button>
                </div>
              </>
            )}
            
          </div>
          </>
        );
      },
    },
    {
      accessorKey: "oficina",
      headerLabel: "Oficina de Pedido",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Oficina de Pedido
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("oficina")}</div>,
    },
    {
      accessorKey: "cantidadPedida",
      headerLabel: "Cantidad Pedida",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cantidad Pedida
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("cantidadPedida")}</div>,
    },
    {
      accessorKey: "stock",
      headerLabel: "Stock Actual",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock Actual
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("stock")}</div>,
    },
    {
      accessorKey: "motivo",
      headerLabel: "Motivo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Motivo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("motivo")}</div>,
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
      accessorKey: "usuarioCreacion",
      headerLabel: "Usuario Creación",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuario Creación
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("usuarioCreacion")}</div>,
    },
    {
      accessorKey: "fechaCreacion",
      headerLabel: "Fecha Creación",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha Creación
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("fechaCreacion")}</div>,
    },
    {
      accessorKey: "usuarioAprobacion",
      headerLabel: "Usuario Aprobación",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuario Aprobación
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("usuarioAprobacion")}</div>,
    },
    {
      accessorKey: "fechaAprobacion",
      headerLabel: "Fecha Aprobación",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha Aprobacion
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("fechaAprobacion")}</div>,
    },
    {
      accessorKey: "usuarioRechazo",
      headerLabel: "Usuario Rechazo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuario Rechazo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("usuarioRechazo")}</div>,
    },
    {
      accessorKey: "fechaRechazo",
      headerLabel: "Fecha Rechazo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha Rechazo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("fechaRechazo")}</div>,
    },
    {
      accessorKey: "observacion",
      headerLabel: "Observación",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Observación
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
          <div className="w-full max-w-[1500px] mx-auto overflow-x-auto">
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
                          <TableHead key={header.id} className={`text-center px-6 py-3 ${
                                                            header.column.id === "motivo" ? "min-w-[250px]" :
                                                            header.column.id === "estado" ? "min-w-[120px]" :
                                                            "min-w-[160px]"
                                                          }`}>
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
                          <TableCell key={cell.id} className="text-center px-6 py-3 min-w-[180px]" >
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

          </div>
        </>
      ) : 
      null
      }
       {openDialog && (
        <DialogAddDespacho
          data={selectedSolicitudDespacho}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
        
    </>
  );
}

DataTableSearchSolicitudDespacho.propTypes = {
  data: PropTypes.array,
  onRefresh: PropTypes.func,
};
