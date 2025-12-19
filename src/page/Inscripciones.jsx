import { CardWithFormDocumentos } from "@/components/Operaciones/CardWithFormDocumentos";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Inscripciones() {
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
          <Tabs defaultValue="receipt" className="w-[400px] sm:w-[1300px]">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="receipt">
                Generar QR 
              </TabsTrigger>
            </TabsList>
            <TabsContent value="receipt">
              <CardWithFormDocumentos />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
