import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Download, ChevronDown, ChevronRight, Pencil , ArrowUpDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { DialogAnularDocumentos } from "./DialogAnularDocumentos";
import { Button } from "@/components/ui/button";
import { DialogEditDetalleDocumentos } from "./DialogEditDetalleDocumentos";
import { useAuthStore } from "@/store/auth";
import { anularDocumentoJuridico } from "@/services/documentos";
import { toast } from "react-toastify";

export const DataTableSearchDocumentJuridico = ({ data , onRefresh }) => {

  const { dataUser, token } = useAuthStore();
  const [openDialogEdicion, setOpenDialogEdicion] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedDocumento, setSelectedDocumento] = useState(null);

  const [showVisor, setShowVisor] = useState(false);
  const [visorDoc, setVisorDoc] = useState(null);

    const handleAnular = async (documento) => {
      try {

        const payload = {
          Id: documento.id ?? 0,
          UsuarioEliminacion: dataUser?.nombreUsuario ?? "Desconocido"
        };
  
        const res = await anularDocumentoJuridico(payload, token);
  
        if (res === null || res === undefined) {
          return toast.error("Comunicacion con el Servidor , se dio de forma interrumpida",
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
        }else if (res !== null || res !== undefined) {
              if (res.error === 1) {
                  return toast.error(res.mensaje, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
              }else if (res.error === 0) {
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
              }
        }
      } catch (err) {
        console.error(err);
        toast.error("Error guardando documentos");
      }
    };
  

  const toggleRow = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const columns = [
    {
      id: "expander",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }) => {
        const data = row.original;

        const handleAgregar = () => {
          setOpenDialogEdicion(true); 
          setSelectedDocumento(data); 
        };

        return (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => toggleRow(row.id)}
              className="text-blue-600 hover:text-blue-800"
              title="Consultar"
            >
              {expandedRow === row.id ? <ChevronDown size={28} /> : <ChevronRight size={28} />}
            </button>

            {data.estado !== "Inactivo" && (
              <>
                <button
                  onClick={handleAgregar}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>

                <DialogAnularDocumentos
                  handleClickAnularDocumentos={handleAnular}
                  documento={row.original}
                />
              </>
            )}
          </div>
        );
      },

    },
    {
      accessorKey: "id",
      enableHiding: true,   
    },
    {
      accessorKey: "numeroComprobante",
      
      headerLabel: "N° Comprobante",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          N° Comprobante<ArrowUpDown className="ml-2 h-4 w-4" />
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
      accessorKey: "ciudadano",
      headerLabel: "Ciudadano",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ciudadano<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("ciudadano")}</div>,
    },
    {
      accessorKey: "IdTramite",
      enableHiding: true,   
    },
    {
      accessorKey: "tramite",
      headerLabel: "Trámite",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Trámite<ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("tramite")}</div>,
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

  const table = useReactTable({
    data,
    columns,
    state: { 
      expandedRow , 
      columnVisibility: { 
        IdTramite: false         // 👉 Oculta desde el inicio
      } 
    },
    onExpandedChange: setExpandedRow,
    getSubRows: (row) => row.documentoDetalle,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const handleDownload = (nombre, tipo, base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: tipo });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nombre;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="rounded-md border overflow-x-auto">
          <Table className="min-w-[900px]">
            {/* HEADER */}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id} className="text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* BODY */}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <>
                    {/* Fila principal */}
                    <TableRow
                      key={row.id}
                      
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="text-center"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Subfila */}
                    {expandedRow === row.id && (
                      <TableRow>
                        <TableCell
                          colSpan={table.getAllColumns().length}
                          className="text-center"
                        >
                          <div >
                            {row.original.documentoDetalle?.length ? (
                                <Table className="min-w-[900px] p-3 border" >
                                <TableHeader>
                                    <TableRow >
                                      <TableHead className="text-center p-3 border" >
                                          Nombre de Documento
                                      </TableHead>
                                      <TableHead className="text-center p-3 border">
                                          Tipo de Archivo
                                      </TableHead>
                                      <TableHead className="text-center p-3 border" >
                                          Estado
                                      </TableHead>
                                      <TableHead className="text-center p-3 border">
                                          Descargar
                                      </TableHead>
                                      <TableHead className="text-center p-3 border">
                                          Extensiòn
                                      </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody >
                                    {row.original.documentoDetalle.map((doc) => (
                                    <TableRow
                                      key={doc.id}
                                    >
                                        <TableCell className="text-center p-3 border">
                                        {doc.nombreArchivo}
                                        </TableCell>
                                        <TableCell className="text-center p-3 border">
                                        {doc.tipoArchivo}
                                        </TableCell>
                                        <TableCell className="text-center p-3 border">
                                        {doc.estado}
                                        </TableCell>
                                        <TableCell className="text-center p-3 border">
                                        <button
                                            onClick={() =>
                                            handleDownload(doc.nombreArchivo, doc.extension, doc.documento)
                                            }
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                            title="Descargar Documento"
                                        >
                                            <Download />
                                        </button>
                                        </TableCell>
                                        <TableCell className="text-center p-3 border">
                                        {doc.extension}
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                No hay documentos asociados.
                                </p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center text-gray-700 dark:text-gray-300"
                  >
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {openDialogEdicion && (
        <DialogEditDetalleDocumentos
          data={selectedDocumento}
          open={openDialogEdicion}
          onClose={() => { setOpenDialogEdicion(false); }}
          setShowVisor={setShowVisor}
          setVisorDoc={setVisorDoc}
          onRefresh={onRefresh}
        />
      )}

      {/* {showVisor && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center"
        >
          <div
            className="relative w-[80vw] h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            <button
              onClick={() => setShowVisor(false)}
              className="absolute top-3 right-3 px-4 py-1 rounded-md bg-black text-white text-sm hover:bg-gray-800 z-50"
            >
              Cerrar
            </button>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100">
              {visorDoc?.includes("blob:") ? (
                <iframe
                  src={`${visorDoc}#view=FitH`}
                  className="w-full h-full"
                  style={{ border: "none" }}
                  title="Visor Documento"
                />
              ) : (
                <img
                  src={visorDoc}
                  alt="Documento"
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )} */}

      {showVisor && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
          <div className="relative w-[80vw] h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setShowVisor(false)}
              className="absolute top-3 right-3 px-4 py-1 rounded-md bg-black text-white text-sm hover:bg-gray-800 z-50"
            >
              Cerrar
            </button>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100">
              {visorDoc.tipo.includes("pdf") ? (
                <iframe
                  src={visorDoc.url}
                  className="w-full h-full"
                  style={{ border: "none" }}
                  title="Visor PDF"
                />
              ) : visorDoc.tipo.startsWith("image/") ? (
                <img src={visorDoc.url} alt="Documento" className="max-h-full max-w-full object-contain" />
              ) : (
                <p>No se puede previsualizar este tipo de archivo</p>
              )}
            </div>
          </div>
        </div>
      )}


    </>
  );
};
