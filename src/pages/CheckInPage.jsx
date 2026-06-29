import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "@/api/axios";
import { toast } from "sonner";

const CheckInPage = () => {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
    });

    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        if (scannedRef.current) return;

        scannedRef.current = true;

        try {
          const qrData = JSON.parse(decodedText.replace(/'/g, '"'));

          const response = await api.post("check-in/", {
            attendee_id: qrData.attendee_id,
          });

          toast.success(response.data.message);

          await scanner.clear();
        } catch (error) {
          scannedRef.current = false;
          toast.error("Invalid QR code or check-in failed");
        }
      },
      () => {},
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-2xl font-bold">GhIE Summit Check-In</h1>

      <p className="mb-4 text-center text-sm text-muted-foreground">
        Allow camera access, then point the camera at the attendee&apos;s QR
        code.
      </p>

      <div id="reader" className="w-full max-w-md" />
    </div>
  );
};

export default CheckInPage;
