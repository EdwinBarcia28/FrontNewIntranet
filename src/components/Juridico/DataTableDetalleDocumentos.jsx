import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, PlusCircle, Save, Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";
import { fileToBase64,  tipoArchivoRequest, tipoTramiteRequest, updateDocumentoJuridico } from "@/services/documentos";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import * as UTIF from "utif";

export function DataTableDetalleDocumentos({ comprobante, onClose, setShowVisor, setVisorDoc , onRefresh })
{
  const { dataUser, token } = useAuthStore();
  const [documentos, setDocumentos] = useState([]);
  const [documentosEliminados, setDocumentosEliminados] = useState([]);
  const [dataTipoTramite, setDataTipoTramite] = useState([]);
  const [documentosEditados, setDocumentosEditados] = useState([]);
  const [tipoTramite, setTipoTramite] = useState(comprobante?.idTramite !== undefined && comprobante?.idTipoCombo !== null ? String(comprobante?.idTramite): "");
  
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

  const handleTipoTramiteChange = (event) => {
    setTipoTramite(event.target.value);
  };

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

  useEffect(() => {
    if (comprobante?.documentoDetalle && comprobante.documentoDetalle.length > 0) {
      const docs = comprobante.documentoDetalle.map((d) => ({
        idTemp: d.idDetalle,
        idDetalle: d.idDetalle ?? null,     
        nombre: d.nombreArchivo,
        tipoArchivo: d.idTipoArchivo,
        extension: d.extension,
        base64: d.documento,
        isNew: false
      }));
      setDocumentos(docs);
    }
  }, [comprobante]);


  const handleAddRow = () => {
    setDocumentos((prev) => [
      ...prev,
      { idTemp: Date.now(), nombre: "", file: null, tipoArchivo: "" , tipo: "" , isNew: true }
    ]);
  };

  const handleEliminar = (idTemp) => {
    setDocumentos((prev) => {
    const docAEliminar = prev.find((d) => d.idTemp === idTemp);

      if (docAEliminar && !docAEliminar.isNew) {
          setDocumentosEliminados((prevEliminados) => {
            const yaExiste = prevEliminados.some(
              (d) =>
                d.IdDocumento === docAEliminar.idTemp ||
                d.IdDetalle === docAEliminar.idDetalle
            );

            if (!yaExiste) {
              return [
                ...prevEliminados,
                {
                  IdDocumento: docAEliminar.idTemp,
                  IdDetalle: docAEliminar.idDetalle ?? null,
                },
              ];
            }

            return prevEliminados;
          });
      }

      return prev.filter((d) => d.idTemp !== idTemp);
      
    });
  };


  const handleChange = (idTemp, field, value) => {
    setDocumentos((prev) =>
      prev.map((d) => {
        if (d.idTemp === idTemp) {
          const actualizado = { ...d, [field]: value };

          // Solo si es un documento existente
          if (!d.isNew && field === "tipoArchivo") {
            setDocumentosEditados((prevEditados) => {
              // Verificamos si ya está agregado
              const yaExiste = prevEditados.some(
                (e) => e.IdDetalle === d.idDetalle
              );

              if (!yaExiste) {
                return [
                  ...prevEditados,
                  {
                    IdDocumento: d.idTemp,     // o d.idDocumento si lo traes con ese nombre
                    IdDetalle: d.idDetalle,
                    IdArchivo: parseInt(value, 10),  // nuevo tipo de archivo
                  },
                ];
              } else {
                // Si ya existe, lo actualizamos
                return prevEditados.map((e) =>
                  e.IdDetalle === d.idDetalle
                    ? { ...e, IdArchivo: parseInt(value, 10) }
                    : e
                );
              }
            });
          }

          return actualizado;
        }
        return d;
      })
    );
  };


  const handleVerDocumento = async (doc) => {
    console.log("Documento a visualizar:", doc);

    const mime = doc.extension?.toLowerCase().includes("pdf")
      ? "application/pdf"
      : doc.extension?.toLowerCase().includes("png")
      ? "image/png"
      : doc.extension?.toLowerCase().includes("jpg") || doc.extension?.toLowerCase().includes("jpeg")
      ? "image/jpeg"
      : doc.extension?.toLowerCase().includes("tif") || doc.extension?.toLowerCase().includes("tiff")
      ? "image/tiff"
      : "application/octet-stream";

    console.log("MIME detectado:", mime);

    let blob = null;

    try {
      if (doc.base64) {
        blob = b64toBlob(doc.base64, mime);
      } else if (doc.file) {
        blob = doc.file;
      }
    } catch (e) {
      console.error("❌ Error al convertir Base64 → Blob:", e);
      toast.error("El documento no se pudo convertir.");
      return;
    }

    if (!blob || blob.size === 0) {
      toast.error("Documento no disponible para visualizar");
      return;
    }

    console.log("Blob recibido:", blob);

    if (mime === "image/tiff") {
      try {
        const arrayBuffer = await blob.arrayBuffer();
        const ifds = UTIF.decode(arrayBuffer);
        UTIF.decodeImage(arrayBuffer, ifds[0]);
        const rgba = UTIF.toRGBA8(ifds[0]);
        const canvas = document.createElement("canvas");
        canvas.width = ifds[0].width;
        canvas.height = ifds[0].height;
        const ctx = canvas.getContext("2d");
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        imageData.data.set(rgba);
        ctx.putImageData(imageData, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        setVisorDoc({ url: pngUrl, tipo: "image/png" });
        setShowVisor(true);
        return;
      } catch (err) {
        console.error("❌ Error al convertir TIFF → PNG:", err);
        toast.error("No se pudo procesar el archivo TIFF.");
        return;
      }
    }

    const url = URL.createObjectURL(blob);
    setVisorDoc({ url, tipo: mime });
    setShowVisor(true);
  };





  const handleGuardar = async () => {
    try {
      const documentosNuevos = await Promise.all(
        documentos
          .filter(doc => doc.isNew)        
          .map(async (doc) => {
            const base64 = await fileToBase64(doc.file);
            return {
              IdDocumento: 0,
              NombreArchivo: doc.nombre || doc.file.name,
              Documento: base64,
              IdTipoArchivo: parseInt(doc.tipoArchivo, 10),
              Extension: doc.tipo,
              UsuarioRegistro: dataUser?.nombreUsuario ?? "Desconocido"
            };
          })
      );


      const payload = {
        Id: comprobante.id ?? 0,
        IdTramite: tipoTramite,
        UsuarioModificacion: dataUser?.nombreUsuario ?? "Desconocido",
        DocumentoDetalleAdd: documentosNuevos.filter((d) => d !== null),
        DocumentoDetalleEliminacion: documentosEliminados,
        DocumentoModificacion: documentosEditados   
      };

      const res = await updateDocumentoJuridico(payload, token);

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
                 setDocumentos([]);               
                 setDocumentosEliminados([]);     
                 onClose?.();
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
            }
      }
    } catch (err) {
      console.error(err);
      toast.error("Error guardando documentos");
    }
  };


  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (

    <>
      <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-4 items-start">
        <div>
          <Label>N° Comprobante</Label>
          <Input value={comprobante?.numeroComprobante ?? ""} disabled />
        </div>
        <div>
          <Label>Identificación</Label>
          <Input value={comprobante?.identificacionCiudadano ?? ""} disabled />
        </div>
        <div>
          <Label>Ciudadano</Label>
          <Input value={comprobante?.ciudadano ?? ""} disabled />
        </div>
        <div>
          <Label>Servicio</Label>
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Acciones</TableHead>
              <TableHead className="text-center">Nombre Archivo</TableHead>
              <TableHead className="text-center">Archivo</TableHead>
              <TableHead className="text-center">Tipo Archivo</TableHead>
              <TableHead className="text-center">Extensiòn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentos.length > 0 ? (
              documentos.map((doc) => (
                <TableRow key={doc.idTemp}>
                  <TableCell className="text-center">
                    <button
                      onClick={() => handleEliminar(doc.idTemp)}
                      className="text-red-600 hover:text-red-800 mr-3"
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
                    {doc.isNew ? (
                      <Input
                        type="file"
                        accept=".pdf,.tif,.tiff,.jpg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          handleChange(doc.idTemp, "file", file);
                          handleChange(doc.idTemp, "tipo", file?.type || "");
                        }}
                      />
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerDocumento(doc)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> Ver
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Select
                      onValueChange={(value) => handleChange(doc.idTemp, "tipoArchivo", value)}
                      value={String(doc.tipoArchivo )|| ""}
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
                  {doc.isNew ? (
                    <TableCell className="text-center">{doc.tipo}</TableCell>
                  ) : (
                    <TableCell className="text-center">{doc.extension}</TableCell>
                  )}
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

      <div className="flex justify-between">
        <Button onClick={handleAddRow}>
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Detalles
        </Button>
        <Button onClick={handleGuardar} disabled={documentos.length === 0}>
          <Save className="mr-2 h-4 w-4" /> Guardar Documentos
        </Button>
      </div>
    </div>
    </>
  );
}

DataTableDetalleDocumentos.propTypes = {
  comprobante: PropTypes.object.isRequired,
  onClose: PropTypes.func
};
