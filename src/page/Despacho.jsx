
import { CardWithFormDespacho } from "@/components/Inventario/Despacho/CardWithFormDespacho";
import { CardWithFormSearchDespacho } from "@/components/Inventario/Despacho/CardWithFormSearchDespacho";
import { CardWithFormSearchSolicitudDespacho } from "@/components/Inventario/Despacho/CardWithFormSearchSolicitudDespacho";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Despacho() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-4 pt-0">
        <div className="flex justify-center items-center min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex-col">
          {/* Logo */}
          <img
            src="/logoCRCG.png"
            alt="Logo CRCG"
            className="w-60 h-auto mb-4"
          />

          {/* Tabs */}
          <Tabs defaultValue="solicitudes" className="w-[400px] sm:w-[1300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="solicitudes">
                Consultar solicitudes de despachos
              </TabsTrigger>
              <TabsTrigger value="consultar">
                Consultar despachos 
              </TabsTrigger>
              <TabsTrigger value="despacho">
                Registrar despachos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="solicitudes">
              <CardWithFormSearchSolicitudDespacho />
            </TabsContent>
            <TabsContent value="consultar">
              <CardWithFormSearchDespacho />
            </TabsContent>
            <TabsContent value="despacho">
              <CardWithFormDespacho />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
