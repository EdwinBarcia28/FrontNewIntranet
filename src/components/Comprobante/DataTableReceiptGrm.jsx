import PropTypes from "prop-types";
import { useState } from "react";
import { ArrowUpDown, Check, Eye } from "lucide-react";
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
import { verificarComprobanteGrm } from "@/services/comprobantes";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { DialogViewReceiptRegister } from "./DialogViewReceiptRegister";

export function DataTableReceiptGrm({ data, onRefresh }) {

  const { token } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedViewReceiptRegister, setSelectedReceiptRegister] = useState(null);

  const columns = [
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const data = row.original;

        const handleCheck = async () => {
          try {
            const res = await verificarComprobanteGrm(data.numeroComprobante, token);

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
          } catch (error) {
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
          setSelectedReceiptRegister(data);
        };



        return (
          <>
            <div className="flex justify-center items-center gap-2">
              {data.estado === "Pendiente" && (
                <>
                  <button
                    variant="ghost"
                    onClick={handleCheck}
                    className="text-blue-600 hover:text-blue-800 ml-4"
                    title="Consultar"
                  >
                    <Check size={18} />
                  </button>

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

              {data.estado !== "Pendiente" && (
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

            </div>
          </>
        );
      },
    },
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
      accessorKey: "identificacionCiudadano",
      headerLabel: "Identificación de Ciudadano",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Identificación de Ciudadano<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("identificacionCiudadano")}</div>,
    },
    {
      accessorKey: "nombreCiudadano",
      headerLabel: "Nombre Ciudadano",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre Ciudadano<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("nombreCiudadano")}</div>,
    },
    {
      accessorKey: "servicioPagado",
      headerLabel: "Servicio Pagado",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Servicio Pagado<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("servicioPagado")}</div>,
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

      {openDialog && (
        <DialogViewReceiptRegister
          data={selectedViewReceiptRegister}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}


    </>

  );
}

DataTableReceiptGrm.propTypes = {
  data: PropTypes.array
};
