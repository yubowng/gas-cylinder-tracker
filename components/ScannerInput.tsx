import React, { useState } from 'react';
import { ScanLineIcon, CameraIcon } from './icons';

interface ScannerInputProps {
  onScan: (id: string) => void;
  onScanClick: () => void;
}

const ScannerInput: React.FC<ScannerInputProps> = ({ onScan, onScanClick }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.trim() && /^\d{6}$/.test(id.trim())) {
      onScan(id.trim());
      setId('');
    } else {
        alert('Please enter a valid 6-digit cylinder ID.');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <label htmlFor="scanner-input" className="sr-only">
          Cylinder ID
        </label>
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ScanLineIcon className="w-5 h-5 text-slate-400" />
          </div>
          <input
            id="scanner-input"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter 6-digit Cylinder ID..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            maxLength={6}
            pattern="\d{6}"
          />
        </div>
        <div className="flex gap-2">
            <button
                type="button"
                onClick={onScanClick}
                className="bg-slate-700 text-white font-semibold p-3 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                aria-label="Scan QR Code"
            >
                <CameraIcon className="w-6 h-6" />
            </button>
            <button
            type="submit"
            className="flex-grow bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
            Find Cylinder
            </button>
        </div>
      </form>
    </div>
  );
};

export default ScannerInput;