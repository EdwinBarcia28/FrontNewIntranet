import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown, ArrowUpDown, Pencil, Trash2, Eye, Printer } from "lucide-react";
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
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth";
import { anularSolicitudDespachoRequest } from "@/services/inventario";
//import { useAuthStore } from "@/store/auth";
//import { toast } from "react-toastify";
//import { DialogSearchDetalleDespacho } from "./DialogSearchDetalleDespacho";


export function DataTableSearchSolicitudDespacho({data , onRefresh }) {
  const { dataUser,  token } = useAuthStore();


  const columns = [
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const data = row.original;

        const handleAnular = async () => {
            const payload = {
                IdDespacho: Number(data.id), 
                UsuarioEliminacion: dataUser ? dataUser.nombreUsuario : "Desconocido",
            };
                  
            try {

                const res = await anularSolicitudDespachoRequest(payload,token);

                if (res.error === 0) {
                    if (onRefresh) 
                        onRefresh(); 
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

        // const handleEnviar = async () => {

        //   const payload = {
        //       IdDespacho: Number(data.id),
        //       IdOficinaSalida: Number(data.idOficinaSalida),
        //       IdOficinaDestino: Number(data.idOficinaDestino),
        //       CantidadDesde: Number(data.cantidadDesde),
        //       CantidadHasta: Number(data.cantidadHasta),
        //       UsuarioEnvio: dataUser ? dataUser.nombreUsuario : "Desconocido",
        //   };

        //   console.log("Payload Enviar Despacho: ", payload);
          
        //   try {
        //     const res = await aprobarDespachoRequest(payload,token);
          
        //     if (res.error === 0) {
        //       if (onRefresh) 
        //         onRefresh(); 
        //         return toast.success(res.mensaje, {
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         });
        //     } else {
        //         return toast.error(`Error inesperado: ${res.message}`, {
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //                           pauseOnHover: true,
        //                           draggable: true,
        //                           progress: undefined,
        //                           theme: "dark",
        //                       }
        //                   );
        //     }
        //   }catch (error) {
        //     return toast.error(`Error inesperado: ${error}`, {
        //         position: "top-right",
        //         autoClose: 4000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        //   }
        // };

        // const handleAnular = async () => {

        //   const payload = {
        //       IdDespacho: Number(data.id), 
        //       UsuarioEliminacion: dataUser ? dataUser.nombreUsuario : "Desconocido",
        //   };
          
        //   try {
        //     const res = await anularDespachoRequest(payload,token);
          
        //     if (res.error === 0) {
        //       if (onRefresh) 
        //         onRefresh(); 
        //         return toast.success(res.mensaje, {
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         });
        //     } else {
        //         return toast.error(`Error inesperado: ${res.message}`, {
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //                           pauseOnHover: true,
        //                           draggable: true,
        //                           progress: undefined,
        //                           theme: "dark",
        //                       }
        //                   );
        //     }
        //   }catch (error) {
        //     return toast.error(`Error inesperado: ${error}`, {
        //         position: "top-right",
        //         autoClose: 4000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        //   }
        // };

        // const handleImprimir = async () => {
        //   await imprimirEtiqueta(data.cantidadDesde, data.cantidadHasta,data.oficinaDestino);
        // };

        // const handleConsultar = () => {


        //   setOpenDialog(true); 
        //   setSelectedDespachoId(data.despachoDetalle);
        //   setSecuencialDesde(data.cantidadDesde);
        //   setSecuencialHasta(data.cantidadHasta); 
        // };

        return (
          <>
          <div className="flex justify-center items-center gap-2">
            {data.estado === "Pendiente" && (
              <>

                <DialogAnularSolicitudDespacho handleClickAnularSolicitudDespacho={handleAnular} />

              </>
            )}

            {/* {data.estado === "Reversado" && (
              <>
                <button
                  variant="ghost"
                  onClick={handleConsultar}
                  className="text-blue-600 hover:text-blue-800 ml-4"
                  title="Consultar"
                >
                  <Eye size={18} />
                </button>
              </>
            )}

            {data.estado === "Despachado" && (
              <>
                <button
                  variant="ghost"
                  onClick={handleImprimir}
                  className="text-blue-600 hover:text-blue-800 ml-4"
                  title="Imprimir"
                >
                  <Printer  size={18} />
                </button>

                <button
                  variant="ghost"
                  onClick={handleConsultar}
                  className="text-red-600 hover:text-red-800 ml-4"
                  title="Consultar"
                >
                  <Eye size={18} />
                </button>
              </>
            )} */}
            
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
            Fecha Rechazo
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
                          <TableHead key={header.id} className="text-center px-6 py-3" >
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
                          <TableCell key={cell.id} className="text-center px-6 py-3" >
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
      ) : 
      null
      }
       {/* {openDialog && (
        <DialogSearchDetalleDespacho
          desde={secuencialDesde}
          hasta={secuencialHasta}
          data={selectedDespachoId}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )} */}
        
    </>
  );
}

DataTableSearchSolicitudDespacho.propTypes = {
  data: PropTypes.array,
  onRefresh: PropTypes.func,
};
