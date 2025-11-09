
import React from 'react';
import { Cylinder, CylinderType } from '../types';
import CylinderCard from './CylinderCard';
import { PlusIcon, TrashIcon } from './icons';

interface CylinderTypeSectionProps {
  type: CylinderType;
  cylinders: Cylinder[];
  onAddCylinder: (typeId: string) => void;
  onCylinderClick: (cylinder: Cylinder) => void;
  onDeleteType: (typeId: string) => void;
}

const CylinderTypeSection: React.FC<CylinderTypeSectionProps> = ({
  type,
  cylinders,
  onAddCylinder,
  onCylinderClick,
  onDeleteType,
}) => {
  return (
    <section className="bg-slate-800/50 rounded-xl shadow-lg p-4 md:p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h2 className="text-2xl font-bold text-sky-400">{type.name}</h2>
            <p className="text-sm text-slate-400">Measured by: {type.unit}</p>
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={() => onAddCylinder(type.id)}
                className="flex items-center gap-2 bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label={`Add new ${type.name} cylinder`}
            >
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Add Cylinder</span>
            </button>
            <button
                onClick={() => onDeleteType(type.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-900/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Delete ${type.name} type`}
            >
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
      {cylinders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cylinders.map((cylinder) => (
            <CylinderCard
              key={cylinder.id}
              cylinder={cylinder}
              unit={type.unit}
              onClick={onCylinderClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4 border-2 border-dashed border-slate-700 rounded-lg">
          <p className="text-slate-400">No cylinders of this type yet.</p>
          <p className="text-sm text-slate-500">Click "Add Cylinder" to add one.</p>
        </div>
      )}
    </section>
  );
};

export default CylinderTypeSection;
