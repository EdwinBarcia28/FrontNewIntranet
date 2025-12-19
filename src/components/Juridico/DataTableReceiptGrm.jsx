import PropTypes from "prop-types";
import { useState } from "react";
import { ArrowUpDown, Eye, Pencil } from "lucide-react";
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
import { DialogAddDocumentsJuridico } from "./DialogAddDocumentsJuridico";

export function DataTableReceiptGrm({ data }) {

  const [openDialogEdicion, setOpenDialogEdicion] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);

  const columns = [
    {
      id: "acciones",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Agregar Documentos<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const data = row.original;

        const handleAgregar = () => {
          setOpenDialogEdicion(true); 
          setSelectedCombo(data); 
        };

        return (
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
              title="Agregar Documento"
            >
              + Agregar
            </button>
          </div>
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
    },
    {
      accessorKey: "fechaRegistro",
      headerLabel: "Fecha de Registro",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha de Registro<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("fechaRegistro")}</div>,
    },
    {
      accessorKey: "fechaSincronizacionGrm",
      headerLabel: "Fecha de Sincronización Grm",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha de Sincronización Grm<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("fechaSincronizacionGrm")}</div>,
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
      
      {openDialogEdicion && (
        <DialogAddDocumentsJuridico
          data={selectedCombo}
          open={openDialogEdicion}
          onClose={() => { setOpenDialogEdicion(false); }}
        />
      )}
      
    </>
    
  );
}

DataTableReceiptGrm.propTypes = {
  data: PropTypes.array
};
