import { CardWithFormReceipt } from "@/components/Comprobante/CardWithFormReceipt";
import { CardWithFormReceiptGrm } from "@/components/Comprobante/CardWithFormReceiptGrm";
import { CardWithFormReceiptGrmJuridico } from "@/components/Juridico/CardWithFormReceiptGrmJuridico";
import { CardWithFormSearchReceiptGrmJuridico } from "@/components/Juridico/CardWithFormSearchReceiptGrmJuridico";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Juridico() {
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
          {/* <Tabs defaultValue="consultar" className="w-[400px] sm:w-[1300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consultar">
                Consultar Combo 
              </TabsTrigger>
              <TabsTrigger value="medianet">
                Registrar Combo 
              </TabsTrigger>
            </TabsList>
            <TabsContent value="consultar">
              <CardWithFormSearchCombo />
            </TabsContent>
            <TabsContent value="medianet">
              <CardWithFormNewCombo />
            </TabsContent>
          </Tabs> */}
          <Tabs defaultValue="document" className="w-[400px] sm:w-[1300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="document">
                Registro Documentos Jurídicos
              </TabsTrigger>
              <TabsTrigger value="search" className="ml-4">
                Consultar Documentos Jurídicos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="document">
              <CardWithFormReceiptGrmJuridico />
            </TabsContent>
            <TabsContent value="search">
              <CardWithFormSearchReceiptGrmJuridico />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
