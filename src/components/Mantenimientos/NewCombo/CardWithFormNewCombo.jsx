import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { tipoComboRequest } from "@/services/medianet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTableServices } from "./DataTableServices";



export const CardWithFormNewCombo = () => {
    const [dataTipoCombo, setDataTipoCombo] = useState([]);
    const [tipoCombo, setTipoCombo] = useState("1");
    const [descripcionCombo, setDescripcionCombo] = useState("");
    const [valorCombo, setValorCombo] = useState();

    const fetchTipoCombo = useCallback(async (token) => {
      try {
        const responseTipo = await tipoComboRequest(token);
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
        } else if (responseTipo !== null) {
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
            setDataTipoCombo(responseTipo.tipoCombos);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, []);

    useEffect(() => {
      fetchTipoCombo();
    }, [fetchTipoCombo]);

    const handleTipoComboChange = (event) => {
      setTipoCombo(event.target.value);
    };

    const handleDescripcionComboChange = (event) => {
      setDescripcionCombo(event.target.value);
    };

    const handleValorComboChange = (event) => {
      const value = event.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        setValorCombo(value);
      }
    };

    const handleLimpiar = () => {
      setTipoCombo("1");
      setDescripcionCombo("");
      setValorCombo("");
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Creacion de Combos</CardTitle>
        <CardDescription>
          En esta opción se puede crear, editar y anular los diversos tipos de combos.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 md:grid-cols-[1fr_2fr_1fr] items-start">
          {/* Tipo de Combo */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tipoCombo">Tipo de Combo</Label>
            <Select onValueChange={handleTipoComboChange} value={tipoCombo}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione Tipo de Combo" />
              </SelectTrigger>
              <SelectContent>
                {dataTipoCombo.map((element) => (
                  <SelectItem key={element.id} value={`${element.id}`}>
                    {element.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Descripción de Combo */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="descripcionCombo">Descripción de Combo</Label>
            <Textarea
              id="descripcionCombo"
              placeholder="Ingrese descripción de combo"
              value={descripcionCombo}
              onChange={handleDescripcionComboChange}
              className="h-[44px] resize-none"
            />
          </div>

          {/* Valor del Combo */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="valorCombo">Valor del combo</Label>
            <Input
              type="number"
              id="valorCombo"
              placeholder="0.0"
              value={valorCombo ?? ""}
              step="0.01" 
              min="0" 
              onChange={handleValorComboChange}
              className="h-[44px]"
            />
          </div>
        </div>
        <DataTableServices tipo={tipoCombo} descripcion={descripcionCombo} valor={valorCombo} handleLimpiar={handleLimpiar} />
      </CardContent>
    </Card>
  );
};

