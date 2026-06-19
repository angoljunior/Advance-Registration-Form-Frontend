import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "@/api/axios";

const CheckInPage = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      async (decodedText) => {
        try {
          const qrData = JSON.parse(decodedText.replace(/'/g, '"'));

          const response = await api.post("check-in/", {
            attendee_id: qrData.attendee_id,
          });

          alert(response.data.message);
        } catch (error) {
          alert("Invalid QR code or check-in failed");
        }
      },
      (error) => {
        console.log(error);
      },
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">GhIE Summit Check-In</h1>
      <div id="reader" className="w-full max-w-md" />
    </div>
  );
};

export default CheckInPage;
