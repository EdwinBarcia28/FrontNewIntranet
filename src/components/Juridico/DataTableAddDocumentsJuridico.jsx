import PropTypes from "prop-types";
import { useCallback, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";
import { fileToBase64, registerDocumentoJuridico, tipoArchivoRequest, tipoTramiteRequest } from "@/services/documentos";
import { toast } from "react-toastify";

export function DataTableAddDocumentsJuridico({ comprobante, onClose }) {

  const { dataUser, token } = useAuthStore();
  const [documentos, setDocumentos] = useState([]);
  const [dataTipoTramite, setDataTipoTramite] = useState([]);
  const [tipoTramite, setTipoTramite] = useState("1");

  const fetchTipoTramite = useCallback(async (token) => {
    try {
      const responseTipo = await tipoTramiteRequest(token);
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
      }else if (responseTipo !== null) {
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
            setDataTipoTramite(responseTipo.tipoTramites);
          }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  
  useEffect(() => {
    fetchTipoTramite();
  }, [fetchTipoTramite]);

  const [dataTipoArchivo, setDataTipoArchivo] = useState([]);

  const fetchTipoArchivo = useCallback(async (token) => {
    try {
      const responseTipo = await tipoArchivoRequest(token);
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
      }else if (responseTipo !== null) {
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
            setDataTipoArchivo(responseTipo.tipoArchivos);
          }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  
  useEffect(() => {
    fetchTipoArchivo();
  }, [fetchTipoArchivo]);

  const handleAddRow = () => {
    setDocumentos((prev) => [
      ...prev,
      { idTemp: Date.now(), nombre: "", file: null, tipoArchivo: "", tipo: "",  isNew: true },
    ]);
  };

  const handleEliminar = (idTemp) => {
    setDocumentos((prev) => prev.filter((d) => d.idTemp !== idTemp));
  };

  const handleChange = (idTemp, field, value) => {
    setDocumentos((prev) =>
      prev.map((d) =>
        d.idTemp === idTemp ? { ...d, [field]: value } : d
      )
    );
  };

  const handleTipoTramiteChange = (event) => {
      setTipoTramite(event.target.value);
  };



  const handleGuardar = async () => {
    try {

      const documentosConvertidos = await Promise.all(
        documentos.map(async (doc) => {
          if (doc.file) {
            const base64 = await fileToBase64(doc.file);
            if (doc.nombre === null || doc.nombre === undefined) {
              return toast.error("Debe escribir un nombre al documento , verificar por favor",
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
            }else if (doc.tipoArchivo === null || doc.tipoArchivo === undefined) {
              return toast.error("Debe seleccionar un tipo de archivo , verificar por favor",
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
            }else{
              return {
                IdDocumento: 0, 
                NombreArchivo: doc.nombre || doc.file.name,
                Documento: base64,
                IdTipoArchivo: Number(doc.tipoArchivo),
                Extension:  doc.tipo,
                UsuarioRegistro: dataUser?.nombreUsuario ?? "Desconocido",
              };
            }
            
          }
          return null;
        })
      );

      const detalles = documentosConvertidos.filter((d) => d !== null);

      if(detalles.length === 0){
        return toast.error("Debe agregar al menos un documento con archivo para guardar",
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

      const payload = {
        NumeroComprobante: comprobante.numeroComprobante,
        IdentificacionCiudadano: comprobante.identificacionCiudadano,
        Ciudadano: comprobante.nombreCiudadano,
        Tramite: Number(tipoTramite),
        UsuarioRegistro: dataUser?.nombreUsuario ?? "Desconocido",
        DocumentoDetalle: detalles,
      };

      

      const res = await registerDocumentoJuridico(payload, token);

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
                onClose?.();
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
                 onClose?.();
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
      alert("Error guardando documentos");
    }
  };


  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="grid gap-5 md:grid-cols-4 items-start">
        <div className="flex flex-col space-y-1.5">
          <Label>N° Comprobante</Label>
          <Input value={comprobante?.numeroComprobante ?? ""} disabled />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Identificación</Label>
          <Input value={comprobante?.identificacionCiudadano ?? ""} disabled />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Ciudadano</Label>
          <Input value={comprobante?.nombreCiudadano ?? ""} disabled />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Tramite</Label>
          <Select onValueChange={handleTipoTramiteChange} value={tipoTramite}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione Tipo de Combo" />
              </SelectTrigger>
              <SelectContent>
                {dataTipoTramite.map((element) => (
                  <SelectItem key={element.id} value={`${element.id}`}>
                    {element.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Acciones</TableHead>
              <TableHead className="text-center">Nombre Archivo</TableHead>
              <TableHead className="text-center">Archivo</TableHead>
              <TableHead className="text-center">Tipo Archivo</TableHead>
              <TableHead className="text-center">Extension</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentos.length > 0 ? (
              documentos.map((doc) => (
                <TableRow key={doc.idTemp}>
                  <TableCell className="text-center">
                    <button
                      onClick={() => handleEliminar(doc.idTemp)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="text"
                      value={doc.nombre}
                      placeholder="Nombre del documento"
                      onChange={(e) =>
                        handleChange(doc.idTemp, "nombre", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="file"
                      accept=".pdf,.tif,.tiff,.jpg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        handleChange(doc.idTemp, "file", file);
                        handleChange(doc.idTemp, "tipo", file?.type || "");
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Select
                      onValueChange={(value) => handleChange(doc.idTemp, "tipoArchivo", value)}
                      value={doc.tipoArchivo || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione Tipo de Archivo" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataTipoArchivo.map((element) => (
                          <SelectItem key={element.id} value={`${element.id}`}>
                            {element.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">{doc.tipo}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay documentos cargados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Botones */}
      <div className="flex justify-between">
        <Button onClick={handleAddRow} >
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Detalles
        </Button>
        <Button onClick={handleGuardar} disabled={documentos.length === 0}>
          <Save className="mr-2 h-4 w-4" /> Guardar Documentos
        </Button>
      </div>
    </div>
  );
}

DataTableAddDocumentsJuridico.propTypes = {
  comprobante: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};