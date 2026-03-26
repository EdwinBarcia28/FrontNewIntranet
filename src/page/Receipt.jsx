import { CardWithFormReceipt } from "@/components/Comprobante/CardWithFormReceipt";
import { CardWithFormReceiptGrm } from "@/components/Comprobante/CardWithFormReceiptGrm";
import { CardWithFormReceiptReport } from "@/components/Comprobante/CardWithFormReceiptReport";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Receipt() {
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

          {/* Tabs ocupan TODO el ancho */}
          <Tabs defaultValue="receipt" className="w-full">
            <TabsList className="flex w-full">
              <TabsTrigger value="receipt" className="flex-1">
                Consulta Comprobantes
              </TabsTrigger>

              <TabsTrigger value="receipt-report" className="flex-1">
                Generación de Reporte
              </TabsTrigger>
            </TabsList>

            <TabsContent value="receipt" className="w-full">
              <CardWithFormReceipt />
            </TabsContent>

            <TabsContent value="receipt-report" className="w-full">
              <CardWithFormReceiptReport />
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </>
  );
}
