import React, { useState, useEffect } from 'react';
import { Cylinder, MeasurementUnit } from '../types';
import Modal from './Modal';
import { ExternalLinkIcon } from './icons';

interface EditCylinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cylinder: Cylinder;
  unit: MeasurementUnit;
  onUpdate: (id: string, updates: { value: number; tareWeight?: number }) => void;
  onDelete: (id: string) => void;
}

const EditCylinderModal: React.FC<EditCylinderModalProps> = ({ isOpen, onClose, cylinder, unit, onUpdate, onDelete }) => {
  const [value, setValue] = useState(cylinder.value.toString());
  const [tare, setTare] = useState((cylinder.tareWeight || 0).toString());

  useEffect(() => {
    if (isOpen) {
      setValue(cylinder.value.toString());
      setTare((cylinder.tareWeight || 0).toString());
    }
  }, [isOpen, cylinder]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newTotalValue = parseFloat(value);

    if (unit === MeasurementUnit.MASS) {
        const newTareValue = parseFloat(tare);
        if (!isNaN(newTotalValue) && !isNaN(newTareValue)) {
            onUpdate(cylinder.id, { value: newTotalValue, tareWeight: newTareValue });
        }
    } else {
        if (!isNaN(newTotalValue)) {
            onUpdate(cylinder.id, { value: newTotalValue });
        }
    }
  };

  const unitLabel = unit === MeasurementUnit.MASS ? 'kg' : 'PSI';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${cylinder.id}&qzone=1`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Cylinder ${cylinder.id}`}>
      <form onSubmit={handleSave}>
        <div className="space-y-4 w-full">
            <div className="flex items-center gap-4 bg-slate-700/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-slate-300">Cylinder ID:</p>
                <p className="font-mono tracking-widest text-lg text-slate-100">{cylinder.id}</p>
                 <a
                    href={qrCodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                    aria-label="Open QR code in new tab"
                >
                    <ExternalLinkIcon className="w-4 h-4" />
                    Open QR Code
                </a>
            </div>
            {unit === MeasurementUnit.MASS ? (
            <>
                <div>
                <label htmlFor="cylinder-total-value" className="block text-sm font-medium text-slate-300 mb-2">
                    Total Weight ({unitLabel})
                </label>
                <input
                    id="cylinder-total-value"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    step="0.1"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                />
                </div>
                <div>
                <label htmlFor="cylinder-tare-value" className="block text-sm font-medium text-slate-300 mb-2">
                    Tare Weight ({unitLabel})
                </label>
                <input
                    id="cylinder-tare-value"
                    type="number"
                    value={tare}
                    onChange={(e) => setTare(e.target.value)}
                    step="0.1"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                />
                </div>
            </>
            ) : (
            <div>
                <label htmlFor="cylinder-value" className="block text-sm font-medium text-slate-300 mb-2">
                Pressure ({unitLabel})
                </label>
                <input
                id="cylinder-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                step="1"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
                />
            </div>
            )}
        </div>
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-700">
            <button
                type="button"
                onClick={() => onDelete(cylinder.id)}
                className="bg-red-600/20 text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-600/40 hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
                Delete
            </button>
            <div className="flex gap-3">
                 <button
                    type="button"
                    onClick={onClose}
                    className="bg-slate-700 text-slate-100 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    Save
                </button>
            </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditCylinderModal;