import PropTypes from "prop-types";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
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
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth";
import { Checkbox } from "../ui/checkbox";
import { DialogReverseReceiptRegistration } from "./DialogReverseReceiptRegistration";
import { reverseComprobanteBanco } from "@/services/comprobantes";


export function DataTableReceiptBolivariano({ data }) {

  const { dataUser  , token } = useAuthStore();

  const [rowSelection, setRowSelection] = useState({});
  const [loadingReverseReceipt, setLoadingReverseReceipt] = useState(false);

  const columns = [
    {
      id: "select",
      header: () => <div className="text-center"></div>,
      cell: ({ row }) => {
        const isSelected = row.getIsSelected();
        const hasAnySelected = Object.keys(rowSelection).length > 0; 
        const isDisabled = hasAnySelected && !isSelected; 

        return (
          <div className="text-center">
            <Checkbox
              checked={isSelected}
              disabled={isDisabled} // 👈 Deshabilita los demás
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "secuencialTransaccional",
      headerLabel: "Transaccion Id",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Transacción Id<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("secuencialTransaccional")}</div>,
    },
    {
      accessorKey: "secuencialGenerado",
      headerLabel: "Secuencial Generado",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Secuencial Generado<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("secuencialGenerado")}</div>,
    },
    {
      accessorKey: "identificacion",
      headerLabel: "Identificación",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Identificación<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("identificacion")}</div>,
    },
    {
      accessorKey: "ciudadano",
      headerLabel: "Ciudadano",
      header: ({ column }) => (
        <div className="min-w-[260px]"> 
          <Button
            variant="ghost"
            className="px-0"                
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ciudadano
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="min-w-[260px] max-w-[260px] truncate">
          {row.getValue("ciudadano")}
        </div>
      ),
    },
    {
      accessorKey: "servicio",
      headerLabel: "Servicio",
      header: ({ column }) => (
        <div className="min-w-[300px]">
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Servicio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="min-w-[300px] max-w-[300px] truncate">
          {row.getValue("servicio")}
        </div>
      ),
    },
    {
      accessorKey: "oficina",
      headerLabel: "Oficina",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Oficina<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("oficina")}</div>,
    },
    {
      accessorKey: "estado",
      headerLabel: "Estado",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Estado<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("estado")}</div>,
    },
    {
      accessorKey: "fechaCreacion",
      headerLabel: "Fecha de Creación",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha de Creación<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("fechaCreacion")}</div>,
    },
    {
      accessorKey: "usuarioReverso",
      headerLabel: "Usuario Reverso",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Usuario Reverso<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("usuarioReverso")}</div>,
    },
    {
      accessorKey: "fechaReverso",
      headerLabel: "Fecha de Reverso",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha de Reverso<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("fechaReverso")}</div>,
    }
  ];

  const handleSeleccionar = async () => {
    setLoadingReverseReceipt(true);
    const selectedReceipts = table.getSelectedRowModel().rows[0];

    if (!selectedReceipts) {
        return toast.error("Debe seleccionar un comprobante.", {
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
    
    try {
      const data = selectedReceipts.original;

      const payload = {
        transaccion: data.secuencialTransaccional,
        secuencial: data.secuencialGenerado,
        cedula: data.identificacion,
        usuario:  dataUser ? dataUser.nombreUsuario : "Desconocido",
      };
      
      var request = await reverseComprobanteBanco(payload, token);
      if (request.error === 1) {
          setLoadingReverseReceipt(false);
            return toast.error(request.mensaje, {
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

        if (request.error === 0) {
          setLoadingReverseReceipt(false);
            return toast.success(request.mensaje, {
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


    
      
    } catch (error) {
      console.error("Error al guardar el comprobante:", error);
      toast.error("Error al guardar el comprobante", error);
    }

  }

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
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
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
        <br />
        <div className="flex justify-center py-4">
          <DialogReverseReceiptRegistration handleClickReverseReceiptRegistration={handleSeleccionar} loadingReverseReceipt={loadingReverseReceipt} /> 
        </div>
      </div>
      
      
    </>
    
  );
}

DataTableReceiptBolivariano.propTypes = {
  data: PropTypes.array,
  onSelectionChange: PropTypes.func
};


