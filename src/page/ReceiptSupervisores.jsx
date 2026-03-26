import { CardWithFormReceiptObservados } from "@/components/Comprobante/CardWithFormReceiptObservados";
import { CardWithFormReceiptReportSupervisores } from "@/components/Comprobante/CardWithFormReceiptReportSupervisores";
import { CardWithFormReceiptSupervisores } from "@/components/Comprobante/CardWithFormReceiptSupervisores";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReceiptSupervisores() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-4 pt-0">
        <div className="flex flex-1 flex-col rounded-xl bg-muted/50 p-4">
          {/* Logo centrado */}
          <div className="flex justify-center mb-4">
            <img
              src="/logoCRCG.png"
              alt="Logo CRCG"
              className="w-60 h-auto"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="receipt" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="receipt">
                Comprobantes Banca 
              </TabsTrigger>
              <TabsTrigger value="receipt-report">
                Generación de Reporte
              </TabsTrigger>
              <TabsTrigger value="receipt-observados">
                Comprobantes Observados
              </TabsTrigger>
            </TabsList>
            <TabsContent value="receipt">
              <CardWithFormReceiptSupervisores />
            </TabsContent>
            <TabsContent value="receipt-report">
              <CardWithFormReceiptReportSupervisores />
            </TabsContent>
            <TabsContent value="receipt-observados">
              <CardWithFormReceiptObservados />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
