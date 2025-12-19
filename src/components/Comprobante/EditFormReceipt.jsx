import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DialogAcceptReceiptRegistration } from "./DialogAcceptReceiptRegistration";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth";
import { DialogSearchCiudadano } from "./DialogSearchCiudadano";
import { editarComprobante } from "@/services/comprobantes";
import { DialogAcceptReceiptEdicion } from "./DialogAcceptReceiptEdicion";


export const EditFormReceipt = ({ receipt, onClose, onRefresh }) => {
    const { dataUser, token } = useAuthStore();

    const [cedulaCiudadano, setCedulaCiudadano] = useState(receipt?.identificacionCiudadano !== undefined ? String(receipt?.identificacionCiudadano) : "");
    const [nombreCiudadano, setNombreCiudadano] = useState(receipt?.nombreCiudadano !== undefined ? String(receipt?.nombreCiudadano) : "");

    const handleSeleccionCiudadano = (office) => {
        setCedulaCiudadano(office.identificacion);
        setNombreCiudadano(office.ciudadano);
    };

    const payload = {
        Id: Number(receipt.id),
        NumeroComprobante: Number(receipt.numeroComprobante),
        Identificacion: cedulaCiudadano,
        Ciudadano: nombreCiudadano,
        Usuario: dataUser ? dataUser.nombreUsuario : "Desconocido",
    };

    const handleActualizar = async () => {
        try {
            const res = await editarComprobante(payload, token);
            if (res.error === 0) {
                onClose();
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


    return (
        <>
            <div className="w-full p-2">

                {/* FORMULARIO EN 2 COLUMNAS CON ANCHOS IGUALES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* NÚMERO DE DOCUMENTO */}
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="numeroDocumento">Número de Documento</Label>
                        <Input
                            id="numeroDocumento"
                            value={cedulaCiudadano}
                            disabled
                            className="h-[45px]"
                        />
                    </div>

                    {/* NOMBRE DEL CIUDADANO + BOTÓN BUSCAR */}
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="nombreCiudadano">Nombre del Ciudadano</Label>

                        <div className="flex gap-2 w-full">
                            <Input
                                id="nombreCiudadano"
                                value={nombreCiudadano}
                                disabled
                                className="h-[45px] w-full"
                            />

                            {/* Botón Buscar Ciudadano */}
                            <DialogSearchCiudadano
                                onSelectCiudadano={handleSeleccionCiudadano}
                            />
                        </div>
                    </div>

                </div>

                {/* BOTÓN CENTRADO */}
                <div className="flex justify-center mt-10">
                    <div className="w-full md:w-[20%]">
                        <DialogAcceptReceiptEdicion onAccept={handleActualizar} />
                    </div>
                </div>

            </div>
        </>
    );

};
