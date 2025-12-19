// DialogQr.jsx
import { QRCodeCanvas } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function DialogQr({ open, onOpenChange, url }) {
  console.log("QR URL:", url);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center gap-4">
        <DialogHeader>
          <DialogTitle>Generación de QR </DialogTitle>
        </DialogHeader>

        {url && <QRCodeCanvas value={String(url).trim()} size={250} level="H" includeMargin />}

      </DialogContent>
    </Dialog>
  );
}
