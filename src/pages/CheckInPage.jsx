import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "@/api/axios";
import { toast } from "sonner";

const CheckInPage = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false,
    );

    scanner.render(
      async (decodedText) => {
        try {
          const qrData = JSON.parse(decodedText.replace(/'/g, '"'));

          await api.post("check-in/", {
            attendee_id: qrData.attendee_id,
          });

          toast.success("Check-in successful");

          await scanner.clear();
        } catch (error) {
          toast.error("Invalid QR code or check-in failed");
        }
      },
      (error) => {
        console.log("QR scan error:", error);
      },
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-2xl font-bold">GhIE Summit Check-In</h1>
      <p className="mb-4 text-center text-sm">
        Click “Scan using camera” and allow camera access.
      </p>
      <div id="reader" className="w-full max-w-md" />
    </div>
  );
};

export default CheckInPage;
