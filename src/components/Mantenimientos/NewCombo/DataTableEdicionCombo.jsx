import PropTypes from "prop-types";
import {  useCallback, useEffect, useState } from "react";
import { ChevronDown, ArrowUpDown, Trash2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "react-toastify";
import { searchDetalleComboRequest, tipoComboRequest, updateComboRequest } from "@/services/medianet";
import { useAuthStore } from "@/store/auth";
import { AddDetailsServices } from "./AddDetailsServices";
import { DialogEditCombos } from "./DialogEditCombos";
import { DialogAddDetailsServices } from "./DialogAddDetailsServices";


export function DataTableEdicionCombo({combo , onClose }) {

  const [dataTipoCombo, setDataTipoCombo] = useState([]);
  const [tipoCombo, setTipoCombo] = useState(combo?.idTipoCombo !== undefined && combo?.idTipoCombo !== null ? String(combo.idTipoCombo): "");
  const [descripcionCombo, setDescripcionCombo] = useState(combo?.descripcion || "");
  const [valorCombo, setValorCombo] = useState(combo?.valor || "");
  const { dataUser,  token } = useAuthStore();

  const fetchTipoCombo = useCallback(async (token) => {
        try {
          const responseTipo = await tipoComboRequest(token);
          if (responseTipo == null) {
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
          } else if (responseTipo !== null) {
            if (responseTipo.error == 1) {
              return toast.error(responseTipo.message, {
                      position: "top-right",
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
              });
            } else if (responseTipo.error == 0) {
              setDataTipoCombo(responseTipo.tipoCombos);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
  }, []);
  
  useEffect(() => {
    fetchTipoCombo();
  }, [fetchTipoCombo]);
  
  const handleTipoComboChange = (event) => {
    setTipoCombo(event.target.value);
  };
  
  const handleDescripcionComboChange = (event) => {
    setDescripcionCombo(event.target.value);
  };
  
  const handleValorComboChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setValorCombo(value);
    }
  };


  const [deletedRows, setDeletedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [dataDetalles,setDataDetalles] = useState([]);
  const [rowSelection, setRowSelection] = useState({});


  useEffect(() => {
    const fetchData = async () => {
        try {
        const responseDetalles = await searchDetalleComboRequest(combo.id, token);

        if (!responseDetalles) {
            return toast.error("Comunicación interrumpida con el servidor.", {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
            });
        }

        if (responseDetalles.error == 1) {
            return toast.error(responseDetalles.message, {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
            });
        }

        if (responseDetalles.error == 0) {
            setDataDetalles(Array.isArray(responseDetalles.detalles) ? responseDetalles.detalles : []);
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    if (combo) {
        fetchData();
    }
  }, [combo, token]);

  useEffect(() => {
    const suma = dataDetalles.reduce((acc, item) => acc + Number(item.valor || 0), 0);
    setTotal(suma);
  }, [dataDetalles]);

  const isPendingFechaRegistro = (v) => {
    if (v === null || v === undefined) return true;
    const s = String(v).trim().toLowerCase();
    return s === "" || s === "pendiente";
  };


  const handleEliminar = (row) => {
    const item = row.original;
    setDataDetalles((prev) => prev.filter((d) => d.idServicio !== item.idServicio));

    if (!isPendingFechaRegistro(item.fechaRegistro)) {
      setDeletedRows((prev) => [...prev, item]);
    }
  };


  const handleEditar= async () => {
    if (tipoCombo === 0 || tipoCombo === "" || tipoCombo === null) {
      return toast.warning("Debe seleccionar un tipo de combo ", {
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

    if (descripcionCombo === "" || descripcionCombo === null) {
      return toast.warning("Debe ingresar una descripción para el combo", {
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

    if (valorCombo === 0 ||  valorCombo === null || valorCombo === undefined) {
      return toast.warning("Debe ingresar un valor para el combo", {
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

    if( parseFloat(valorCombo) !== parseFloat(total)){
        return toast.warning("El valor del combo no coincide con el total seleccionado", {
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
    const addDetalles = dataDetalles
      .filter(d => isPendingFechaRegistro(d.fechaRegistro))
      .map(d => ({
        IdServicio: Number(d.idServicio),
        UsuarioRegistro: dataUser?.nombreUsuario ?? null,
      }));

    const deleteDetalles = deletedRows.map(d => ({
      IdServicio: Number(d.idServicio),
      UsuarioRegistro: dataUser?.nombreUsuario ?? null,
    }));

  
    const payload = {
      Id: Number(combo.id),
      IdTipoCombo: Number(tipoCombo),
      Descripcion: descripcionCombo,
      Valor: parseFloat(valorCombo),
      UsuarioEdicion: dataUser ? dataUser.nombreUsuario : "Desconocido",
      ComboAddDetalles: addDetalles,
      ComboDeleteDetalles: deleteDetalles,
    };

    try {
      const res = await updateComboRequest(payload,token);
    
      if (res.error === 0) {
        onClose();
        return toast.success( res.mensaje, {
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
        onClose();
        return toast.error(`Error inesperado: ${res.message}`,
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
        }
    } catch (error) {
        return toast.error(
            `Error inesperado: ${error}`,
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
    }
  
  };

  const columns = [
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => (
        
        <div className="flex justify-center">
          <button
              onClick={() => handleEliminar(row)}
              className="text-red-600 hover:text-red-800"
              title="Anular"
            >
              <Trash2 size={18} />
          </button>
        </div>
      ),
    },
    {
      accessorKey: "idServicio",
      headerLabel: "idServicio",
      header: () => <div className="hidden">Id Servicio</div>,
      cell: ({ row }) => <div className="hidden">{row.getValue("idServicio")}</div>,
      enableHiding: true,
    },
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
      accessorKey: "nombre",
      headerLabel: "nombre",
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
      accessorKey: "descripcion",
      headerLabel: "Descripcion",
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
      cell: ({ row }) => <div>{row.getValue("descripcion")}</div>,
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
      accessorKey: "fechaRegistro",
      headerLabel: "fechaRegistro",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha de Registro
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const v = row.getValue("fechaRegistro");
        const mostrar = (v === null || v === undefined || v === "") ? "PENDIENTE" : String(v);
        return <div>{mostrar}</div>;
      },
    }
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: dataDetalles,
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

  const [openDialogEdicion, setOpenDialogEdicion] = useState(false);

  const handleOpenAddDetails = async () => {
    setOpenDialogEdicion(true);
  };

  const handleAddSelectedServices = (newServices) => {
    setDataDetalles((prev) => [...prev, ...newServices]);
  };

  return (
    <>
        <>
          <div className="grid gap-5 md:grid-cols-[1fr_2fr_1fr] items-start">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tipoCombo">Tipo de Combo</Label>
              <Select onValueChange={handleTipoComboChange} value={tipoCombo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione Tipo de Combo" />
                </SelectTrigger>
                <SelectContent>
                  {dataTipoCombo.map((element) => (
                    <SelectItem key={element.id} value={`${element.id}`}>
                      {element.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="descripcionCombo">Descripción de Combo</Label>
              <Textarea
                id="descripcionCombo"
                placeholder="Ingrese descripción de combo"
                value={descripcionCombo}
                onChange={handleDescripcionComboChange}
                className="h-[44px] resize-none"
              />
            </div>

            {/* Valor del Combo */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="valorCombo">Valor del combo</Label>
              <Input
                type="number"
                id="valorCombo"
                placeholder="0.0"
                value={valorCombo ?? ""}
                step="0.01" 
                min="0" 
                onChange={handleValorComboChange}
                className="h-[44px]"
              />
            </div>
          </div>
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
                  {Array.isArray(dataDetalles) && dataDetalles.length > 0 ? (
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
          <div className="flex justify-end px-2 py-3 mt-4 text-sm">
            <div><strong>Total :</strong> ${total.toFixed(2)}</div>
          </div>
          <div className="flex justify-center gap-3 px-2 py-3 mt-6 text-sm">
            <AddDetailsServices onOpen={handleOpenAddDetails} />
            <DialogEditCombos handleClickAcceptReceiptRegistration={handleEditar}/>
          </div>

          {openDialogEdicion && (
            <DialogAddDetailsServices open={openDialogEdicion} onClose={() => setOpenDialogEdicion(false)} onAddRows={handleAddSelectedServices}/>
          )}



          {/* <div className="flex justify-end mt-6">
            <Button variant="destructive" onClick={onClose}>
              Cerrar
            </Button>
          </div> */}
        </>
    </>
  );
}

DataTableEdicionCombo.propTypes = {
  combo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClose: PropTypes.func,
};