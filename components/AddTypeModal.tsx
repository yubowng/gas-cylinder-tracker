import React, { useState } from 'react';
import { MeasurementUnit } from '../types';
import Modal from './Modal';

interface AddTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddType: (name: string, unit: MeasurementUnit) => void;
}

const AddTypeModal: React.FC<AddTypeModalProps> = ({ isOpen, onClose, onAddType }) => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState<MeasurementUnit>(MeasurementUnit.MASS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddType(name.trim(), unit);
      setName('');
      setUnit(MeasurementUnit.MASS);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Cylinder Type">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="type-name" className="block text-sm font-medium text-slate-300 mb-2">
            Type Name
          </label>
          <input
            id="type-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., CO2, Argon"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Measurement Unit
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setUnit(MeasurementUnit.MASS)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${unit === MeasurementUnit.MASS ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              Mass (kg)
            </button>
            <button
              type="button"
              onClick={() => setUnit(MeasurementUnit.PRESSURE)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${unit === MeasurementUnit.PRESSURE ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              Pressure (PSI)
            </button>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Add Type
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTypeModal;