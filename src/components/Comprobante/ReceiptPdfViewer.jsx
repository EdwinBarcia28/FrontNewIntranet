import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export const ReceiptPdfViewer = ({ pdfBlob }) => {
  const [url, setUrl] = useState(null);
  const layoutPlugin = defaultLayoutPlugin();

  useEffect(() => {
    if (!pdfBlob) return;

    const pdfUrl = URL.createObjectURL(pdfBlob);
    setUrl(pdfUrl);

    return () => URL.revokeObjectURL(pdfUrl);
  }, [pdfBlob]);

  if (!url) return null;

  return (
    <div className="h-[80vh] border rounded-md">
      <Worker workerUrl="/pdfjs/pdf.worker.min.js">
        <Viewer fileUrl={url} plugins={[layoutPlugin]} />
      </Worker>

      {/* <Worker workerUrl={workerUrl}>
        <Viewer fileUrl={url} plugins={[layoutPlugin]} />
      </Worker>  */}
    </div>
  );
};
