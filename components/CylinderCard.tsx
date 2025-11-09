import React from 'react';
import { Cylinder, MeasurementUnit } from '../types';

const isLow = (cylinder: Cylinder, unit: MeasurementUnit): boolean => {
  if (unit === MeasurementUnit.MASS) {
    const netWeight = cylinder.value - (cylinder.tareWeight || 0);
    // A net weight of less than 1kg is considered low
    return netWeight < 1;
  } else { // Pressure
    // Pressure less than 300 PSI is considered low
    return cylinder.value < 300;
  }
};


const CylinderCard: React.FC<CylinderCardProps> = ({ cylinder, unit, onClick }) => {
  const isNearlyEmpty = isLow(cylinder, unit);
  const isMass = unit === MeasurementUnit.MASS;
  const netWeight = isMass ? Math.max(0, cylinder.value - (cylinder.tareWeight || 0)).toFixed(1) : null;

  return (
    <div
      onClick={() => onClick(cylinder)}
      className={`relative bg-slate-800 rounded-lg p-4 shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-sky-500/20 group border ${isNearlyEmpty ? 'border-red-500/50' : 'border-slate-700'}`}
      role="button"
      tabIndex={0}
      aria-label={`Cylinder ${cylinder.id}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(cylinder)}
    >
        {isNearlyEmpty && (
            <div className="absolute top-2 right-2 text-xs bg-red-600 text-white font-bold px-2 py-1 rounded-full z-10">
                LOW
            </div>
        )}
      <div className="text-center">
        <p className="text-xs text-slate-400">ID</p>
        <p className="font-mono text-lg font-semibold tracking-wider text-slate-200">{cylinder.id}</p>
      </div>
      <div className="mt-4">
        {isMass ? (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Net:</span>
              <span className="font-semibold text-white">{netWeight} kg</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-slate-500">Total:</span>
              <span className="text-slate-400">{cylinder.value.toFixed(1)} kg</span>
            </div>
             <div className="flex justify-between text-xs">
              <span className="text-slate-500">Tare:</span>
              <span className="text-slate-400">{(cylinder.tareWeight || 0).toFixed(1)} kg</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <span className="text-3xl font-bold text-white">{cylinder.value}</span>
            <span className="text-lg text-slate-400"> PSI</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CylinderCard;

interface CylinderCardProps {
    cylinder: Cylinder;
    unit: MeasurementUnit;
    onClick: (cylinder: Cylinder) => void;
}