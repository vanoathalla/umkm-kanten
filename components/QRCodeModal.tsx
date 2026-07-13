"use client";
import { useEffect, useRef } from "react";
import { X, Download } from "lucide-react";

interface Props {
  url: string;
  nama: string;
  onClose: () => void;
}

export default function QRCodeModal({ url, nama, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Dynamically load QRCode
    import("qrcode").then((QRCode) => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, url, {
          width: 240,
          margin: 2,
          color: { dark: "#1B5E20", light: "#FFFFFF" },
        });
      }
    });
  }, [url]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `qr-${nama.replace(/\s+/g, "-")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-xs w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white">QR Code</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <canvas ref={canvasRef} className="rounded-xl" />
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
          Scan QR ini untuk membuka profil <strong>{nama}</strong>
        </p>
        <button onClick={handleDownload} className="btn-primary w-full justify-center">
          <Download size={16} /> Unduh QR Code
        </button>
      </div>
    </div>
  );
}
