import { AppSidebar } from "@/components/Menu/AppSidebar";
import {  SidebarProvider ,SidebarInset } from "@/components/ui/sidebar";
import { Route, Routes } from "react-router-dom";
import Receipt from "./Receipt";
import NewReceipt from "./NewReceipt";
import Medianet from "./Medianet";
import MantenimientosCombos from "./MantenimientosCombos";
import Juridico from "./Juridico";
import MantenimientosTramites from "./MantenimientosTramites";
import Despacho from "./Despacho";
import Inscripciones from "./Inscripciones";
import SolicitudDespacho from "./SolicitudDespacho";
import IngresoStock from "./IngresoStock";
import EdicionReceipt from "./EdicionReceipt";
import ReceiptSupervisores from "./ReceiptSupervisores";
// import Product from "./IdRoot/Product";
// import Client from "./IdRoot/Client";
// import Driver from "./IdRoot/Driver";
// import Vehicle from "./IdRoot/Vehicle";
// import Order from "./IdRoot/Order";
// import BusinessManagement from "./Portal/BusinessManagement";
// import MyConsumptions from "./Portal/MyConsumptions";
// import UserManagement from "./Portal/UserManagement";
// import Receipt from "./Portal/Receipt";
// import Home from "./Home";
// import Profile from "./Profile";
// import MyConsumption from "./IdRoot/MyConsumption";

function Menu() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Routes>
          <Route path="/operaciones/consultar-comprobante" element={<Receipt />} />
          <Route path="/operaciones/consultar-comprobante-supervisores" element={<ReceiptSupervisores />} />
          <Route path="/operaciones/edicion-comprobante" element={<EdicionReceipt />} />
          <Route path="/operaciones/ingreso-comprobantes" element={<NewReceipt />} />
          <Route path="/operaciones/registro-documentos" element={<Inscripciones />} />
          <Route path="/mantenimientos/nuevos-combos" element={<MantenimientosCombos  />} />
          <Route path="/mantenimientos/nuevos-tramites" element={<MantenimientosTramites  />} />
          <Route path="/medianet/registro-combos" element={<Medianet  />} />
          <Route path="/juridico/registro-documentos" element={<Juridico />} />
          <Route path="/inventario/despacho-cedulas" element={<Despacho />} />
          <Route path="/inventario/solicitud-despacho-cedulas" element={<SolicitudDespacho />} />
          <Route path="/inventario/ingreso-stock" element={<IngresoStock />} />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Menu;