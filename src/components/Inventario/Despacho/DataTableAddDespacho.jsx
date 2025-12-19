import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { DialogAcceptReceiptRegistration } from "./DialogAcceptReceiptRegistration";
import { Textarea } from "../../ui/textarea";
import { DialogSearchOficinaDestino } from "./DialogSearchOficinaDestino";
import { toast } from "react-toastify";
import { LimpiarSecuenciales, registerInsertSolicitudDespachoRequest, secuencialDesdeRequest, secuencialHastaRequest } from "@/services/inventario";
import { useAuthStore } from "@/store/auth";
import { DialogSearchOficinaSalida } from "./DialogSearchOficinaSalida";
import { DialogRefreshProfile } from "./DialogRefreshProfile";


export const DataTableAddDespacho = ({ solicitud, onClose }) => {
    const { dataUser, token } = useAuthStore();

    useEffect(() => {
        const limpiarTablaLecturas = async () => {
            try {
                const response = await LimpiarSecuenciales(token);
                if (response?.error === 0) {
                    console.log("Tabla de lecturas limpiada al cargar la página.");
                } else {
                    console.warn("No se pudo limpiar la tabla:", response?.mensaje);
                }
            } catch (err) {
                console.error("Error al limpiar tabla de lecturas:", err);
            }
        };

        limpiarTablaLecturas();
    }, [token]);

    const [IdOficinaSalida, setIdOficinaSalida] = useState("");
    const [oficinaSalida, setOficinaSalida] = useState("");
    const [stockSalida, setStockSalida] = useState("");
    const [IdOficinaDestino, setIdOficinaDestino] = useState(solicitud?.idOficina !== undefined ? String(solicitud?.idOficina) : "");
    const [oficinaDestino, setOficinaDestino] = useState(solicitud?.oficina !== undefined ? String(solicitud?.oficina) : "");
    const [stockDestino, setStockDestino] = useState(solicitud?.stock !== undefined ? String(solicitud?.stock) : "");
    const [secuencialSalida, setSecuencialSalida] = useState("");
    const [secuencialDestino, setSecuencialDestino] = useState("");
    const [descripcionDespacho, setDescripcionDespacho] = useState("");


    const handleSeleccionOficinaSalida = (office) => {
        setIdOficinaSalida(office.id);
        setOficinaSalida(office.oficina);
        setStockSalida(office.stock);
    };

    const handleSeleccionOficinaDestino = (office) => {
        setIdOficinaDestino(office.id);
        setOficinaDestino(office.oficina);
        setStockDestino(office.stock);
    };

    const handleClear = async () => {
        setIdOficinaSalida("");
        setOficinaSalida("");
        setStockSalida("");
        setIdOficinaDestino("");
        setOficinaDestino("");
        setStockDestino("");
        setSecuencialSalida("");
        setSecuencialDestino("");
        setDescripcionDespacho("");

        try {
            const response = await LimpiarSecuenciales(token);
            if (response?.error === 0) {
                toast.success("Tabla de lecturas limpiada correctamente");
            } else {
                toast.error(response?.mensaje || "No se pudo limpiar la tabla");
            }
        } catch (err) {
            toast.error("Error al limpiar lecturas", err);
        }
    };

    const handleDescripcionDespachoChange = (e) => {
        setDescripcionDespacho(e.target.value);
    }

    const fetchSecuencialDesde = useCallback(async (token) => {
        try {
            const responseSecuencial = await secuencialDesdeRequest(token);

            if (responseSecuencial == null) {
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
            } else if (responseSecuencial !== null) {
                // if (responseSecuencial.error == 1) {
                //     return toast.error(responseSecuencial.message, {
                //             position: "top-right",
                //             autoClose: 4000,
                //             hideProgressBar: false,
                //             closeOnClick: true,
                //             pauseOnHover: true,
                //             draggable: true,
                //             progress: undefined,
                //             theme: "dark",
                //     });
                // }else 
                if (responseSecuencial.error == 0) {
                    setSecuencialSalida(responseSecuencial.secuencial);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchSecuencialDesde();

        const interval = setInterval(() => {
            fetchSecuencialDesde();
        }, 5000);

        return () => clearInterval(interval);
    }, [fetchSecuencialDesde]);

    const fetchSecuencialHasta = useCallback(async (token) => {
        try {
            const responseSecuencial = await secuencialHastaRequest(token);

            if (responseSecuencial == null) {
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
            } else if (responseSecuencial !== null) {
                // if (responseSecuencial.error == 1) {
                //     return toast.error(responseSecuencial.message, {
                //             position: "top-right",
                //             autoClose: 4000,
                //             hideProgressBar: false,
                //             closeOnClick: true,
                //             pauseOnHover: true,
                //             draggable: true,
                //             progress: undefined,
                //             theme: "dark",
                //     });
                // }else 
                if (responseSecuencial.error == 0) {
                    setSecuencialDestino(responseSecuencial.secuencial);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchSecuencialHasta();

        const interval = setInterval(() => {
            fetchSecuencialHasta();
        }, 5000);

        return () => clearInterval(interval);
    }, [fetchSecuencialHasta]);


    const handleRegistrar = async () => {

        if (IdOficinaSalida === null || IdOficinaSalida === undefined || IdOficinaSalida === "") {
            return toast.error(
                "Debe seleccionar una oficina de salida de stock",
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

        if (IdOficinaDestino === null || IdOficinaDestino === undefined || IdOficinaDestino === "") {
            return toast.error(
                "Debe seleccionar una oficina de destino de stock",
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

        if (secuencialSalida === null || secuencialSalida === undefined || secuencialSalida === "") {
            return toast.error(
                "Pase por el lector el secuencial desde el cual se va a realizar el despacho",
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

        if (secuencialDestino === null || secuencialDestino === undefined || secuencialDestino === "") {
            return toast.error(
                "Pase por el lector el secuencial (hasta) el cual se va a realizar el despacho",
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

        if (descripcionDespacho === null || descripcionDespacho === undefined || descripcionDespacho === "") {
            return toast.error(
                "Debe ingresar una descripcion del despacho que se va a realizar",
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

        if (secuencialSalida === null || secuencialSalida === undefined || secuencialSalida === "") {
            return toast.error(
                "Pase por el lector el secuencial (hasta) el cual se va a realizar el despacho",
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

        if (Number(secuencialSalida) >= Number(secuencialDestino)) {
            return toast.error(
                "El secuencial 'Desde' no puede ser mayor o igual al secuencial 'Hasta'.",
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

        const requestDespacho = {
            IdSolicitud: solicitud?.id || 0,
            IdOficinaSalida: IdOficinaSalida,
            IdOficinaDestino: IdOficinaDestino,
            CantidadDesde: Number(secuencialSalida) || 0,
            CantidadHasta: Number(secuencialDestino) || 0,
            Descripcion: descripcionDespacho || "",
            UsuarioCreacion: dataUser ? dataUser.nombreUsuario : "Desconocido",
            Correo: dataUser ? dataUser.email : "Desconocido",
        };

        try {
            const responseDespacho = await registerInsertSolicitudDespachoRequest(requestDespacho, token);
            if (responseDespacho === null || responseDespacho === undefined) {
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
            } else if (responseDespacho !== null || responseDespacho !== undefined) {
                if (responseDespacho.error === 1) {
                    //setLoadingDespacho(false);
                    return toast.error(responseDespacho.mensaje, {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else if (responseDespacho.error === 0) {
                    //setLoadingDespacho(false);
                    handleClear();
                    onClose();
                    return toast.success(responseDespacho.mensaje, {
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
        } catch (error) {
            console.error("Error al registrar comprobante:", error);
        }
    }


    return (
        <>
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end mb-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="numeroDocumento">Oficina de salida de inventario</Label>
                    <Input
                        id="numeroDocumento"
                        placeholder="Ingrese número de documento"
                        value={oficinaSalida}
                        disabled />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="nombreCiudadano">Stock de oficina de salida de inventario</Label>
                    <Input
                        id="nombreCiudadano"
                        placeholder="Ingrese nombre del ciudadano"
                        value={stockSalida}
                        disabled />
                </div>

                <div className="flex items-end">
                    <DialogSearchOficinaSalida onSelectOficina={handleSeleccionOficinaSalida} />
                </div>
            </div>
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end mb-4">

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="numeroDocumento">Oficina de Destino de inventario</Label>
                    <Input
                        id="numeroDocumento"
                        placeholder="Ingrese número de documento"
                        value={oficinaDestino}
                        disabled />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="nombreCiudadano">Stock de oficina de destino de inventario</Label>
                    <Input
                        id="nombreCiudadano"
                        placeholder="Ingrese nombre del ciudadano"
                        value={stockDestino}
                        disabled />
                </div>

                <div className="flex items-end">
                    <DialogSearchOficinaDestino onSelectOficina={handleSeleccionOficinaDestino} valor={true} />
                </div>
            </div>
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-end mb-4">

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="numeroDocumento">Secuencial Desde</Label>
                    <Input
                        id="numeroDocumento"
                        placeholder="Pase la cedula por el lector"
                        value={secuencialSalida}
                        disabled />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="nombreCiudadano">Secuencial Hasta</Label>
                    <Input
                        id="nombreCiudadano"
                        placeholder="Pase la cedula por el lector"
                        value={secuencialDestino}
                        disabled />
                </div>
            </div>
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] items-end">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="descripcionDespacho">Descripción de Despachos</Label>
                    <Textarea
                        id="descripcionDespacho"
                        placeholder="Ingrese descripción de despacho"
                        value={descripcionDespacho}
                        onChange={handleDescripcionDespachoChange}
                        className="h-[44px] resize-none"
                    />
                </div>

                <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <DialogRefreshProfile onClear={handleClear} />
                    <DialogAcceptReceiptRegistration onAccept={handleRegistrar} />
                </div>
            </div>
        </>


    );
};
