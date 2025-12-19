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
import { DialogQr } from "./DialogQr";
// import { Checkbox } from "../ui/checkbox";
// import { DialogAcceptReceiptRegistration } from "./DialogAcceptReceiptRegistration";
// import { toast } from "react-toastify";
// import { useAuthStore } from "@/store/auth";
// import { registerComprobanteRequest } from "@/services/comprobantes";
//import dayjs from "dayjs";

export function DataTableReceipt({ data }) {
  //const { dataUser, selectEstablishments , token } = useAuthStore();
  const [rowSelection, setRowSelection] = useState({});

  const [openQr, setOpenQr] = useState(false);
  const [qrUrl, setQrUrl] = useState("");


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
        return (
          <div className="flex justify-center">
            <button
              onClick={() => {
                const numero = data.numeroComprobante;
                const url = `https://www.corporacionregistrocivil.gob.ec/pages/captura.aspx?tramite=${numero}`;
                setQrUrl(url);
                setOpenQr(true);
              }}
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
            >
              + Generar Qr
            </button>

          </div>
        );
      },
    },
    {
      accessorKey: "identificacion",
      headerLabel: "Identificación de Ciudadano",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Identificación de Ciudadano<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("identificacion")}</div>,
    },
    {
      accessorKey: "ciudadano",
      headerLabel: "Nombre Ciudadano",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre Ciudadano<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("ciudadano")}</div>,
    },
    {
      accessorKey: "fechaComprobante",
      headerLabel: "Fecha del Comprobante",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha del Comprobante<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("fechaComprobante")}</div>,
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
      accessorKey: "servicio",
      headerLabel: "Servicio Pagado",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Servicio Pagado<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("servicio")}</div>,
    },
    {
      accessorKey: "valor",
      headerLabel: "Valor",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Valor<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const valor = row.getValue("valor");
        const numero = Number(valor);
        return <div>{isNaN(numero) ? valor : numero.toFixed(2)}</div>;
      },
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
  ];

  // const handleSeleccionar = async () => {
  //   const selectedReceipts = table.getSelectedRowModel().rows[0];

  //   if (!selectedReceipts) {
  //       return toast.error("Debe seleccionar un comprobante.");
  //   }
    
  //   try {
  //     const data = selectedReceipts.original;

  //     const payload = {
  //       NumeroComprobante: data.numeroComprobante,
  //       IdentificacionCiudadano: data.identificacion,
  //       NombreCiudadano: data.ciudadano,
  //       FechaPagoBanca: data.fechaComprobante,
  //       Oficina: selectEstablishments || "",
  //       ServicioPagado: data.servicio,
  //       Valor: parseFloat(data.valor),
  //       //Estado: data.estado,
  //       Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
  //     };
      
  //     var request = await registerComprobanteRequest(payload, token);
  //     if (request.error === 1) {
  //           return toast.error(request.mensaje, {
  //             position: "top-right",
  //             autoClose: 4000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "dark",
  //           });
  //       }

  //       if (request.error === 0) {
  //           return toast.success(request.mensaje, {
  //             position: "top-right",
  //             autoClose: 4000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "dark",
  //           });
  //       }


    
      
  //   } catch (error) {
  //     console.error("Error al guardar el comprobante:", error);
  //     toast.error("Error al guardar el comprobante", error);
  //   }

  // }

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
      </div>
      <DialogQr open={openQr} onOpenChange={setOpenQr} url={qrUrl} />

      
    </>
    
  );
}

DataTableReceipt.propTypes = {
  data: PropTypes.array,
  onSelectionChange: PropTypes.func
};


