import PropTypes from "prop-types";
import {  useEffect, useState } from "react";
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

import { toast } from "react-toastify";
import { searchDetalleComboRequest } from "@/services/medianet";
import { useAuthStore } from "@/store/auth";


export function DataTableDetalleCombo({combo , onClose }) {

  const [dataDetalles,setDataDetalles] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
        try {
        const responseDetalles = await searchDetalleComboRequest(combo, token);

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


//   const fetchDataDetalles = useCallback(async (token) => {
//     try {
//       const responseDetalles = await searchDetalleComboRequest(combo, token);
//       if (responseDetalles == null) {
//         return toast.error(
//                 "Comunicacion con el Servidor , se dio de forma interrumpida",
//                 {
//                   position: "top-right",
//                   autoClose: 4000,
//                   hideProgressBar: false,
//                   closeOnClick: true,
//                   pauseOnHover: true,
//                   draggable: true,
//                   progress: undefined,
//                   theme: "dark",
//                 }
//               );
//       } else if (responseDetalles !== null) {
//         if (responseDetalles.error == 1) {
//           return toast.error(responseDetalles.message, {
//                   position: "top-right",
//                   autoClose: 4000,
//                   hideProgressBar: false,
//                   closeOnClick: true,
//                   pauseOnHover: true,
//                   draggable: true,
//                   progress: undefined,
//                   theme: "dark",
//           });
//         } else if (responseDetalles.error == 0) {
//           setDataDetalles(responseDetalles.detalles);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, [combo]);

//   useEffect(() => {
//     fetchDataDetalles(token);
//   }, [fetchDataDetalles, token]);

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
      cell: ({ row }) => <div>{row.getValue("fechaRegistro")}</div>,
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
          <div className="flex justify-end mt-6">
            <Button variant="destructive" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </>
    </>
  );
}

DataTableDetalleCombo.propTypes = {
  combo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClose: PropTypes.func,
};