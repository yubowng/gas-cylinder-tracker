import React, { useEffect } from 'react';
import Modal from './Modal';

declare const Html5Qrcode: any;

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

const qrScannerId = "qr-code-reader";

const QrScannerModal: React.FC<QrScannerModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const html5QrCode = new Html5Qrcode(qrScannerId);
    
    const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
      // Only report success. The parent component will close the modal,
      // which triggers the cleanup function to stop the scanner.
      onScanSuccess(decodedText);
    };
    
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          qrCodeSuccessCallback,
          (errorMessage: string) => {
            // handle scan failure, usually better to ignore
          }
        );
      } catch (err) {
          console.error("Error starting QR scanner:", err);
          // Fallback for devices without a back camera
           try {
              await html5QrCode.start(
                  {}, // default camera
                  config,
                  qrCodeSuccessCallback,
                  (errorMessage: string) => {}
              );
           } catch (fallbackErr) {
              console.error("Fallback QR scanner start failed:", fallbackErr);
              alert("Could not start QR scanner. Please ensure camera permissions are granted.");
              onClose();
           }
      }
    };

    startScanner();
    
    // Cleanup function is called when the component unmounts or dependencies change.
    return () => {
      // Check if the scanner instance exists and is actually scanning before stopping.
      // This prevents the "scanner is not running" error.
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch((err: any) => {
            console.error("Error stopping QR scanner during cleanup:", err);
        });
      }
    };
  }, [isOpen, onScanSuccess, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Scan QR Code">
      <div id={qrScannerId} style={{ width: '100%', minHeight: '300px' }}></div>
      <p className="text-center text-sm text-slate-400 mt-4">
        Position the cylinder's QR code inside the box.
      </p>
    </Modal>
  );
};

export default QrScannerModal;
