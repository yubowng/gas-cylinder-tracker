import React, { useState, useEffect } from 'react';
import { Cylinder, CylinderType, MeasurementUnit } from './types';
import Header from './components/Header';
import ScannerInput from './components/ScannerInput';
import CylinderTypeSection from './components/CylinderTypeSection';
import AddTypeModal from './components/AddTypeModal';
import EditCylinderModal from './components/EditCylinderModal';
import ConfirmationModal from './components/ConfirmationModal';
import QrScannerModal from './components/QrScannerModal';

// Dummy data for initial state
const initialCylinderTypes: CylinderType[] = [
  { id: 'ct1', name: 'CO2', unit: MeasurementUnit.MASS },
  { id: 'ct2', name: 'Argon', unit: MeasurementUnit.PRESSURE },
  { id: 'ct3', name: 'Nitrogen', unit: MeasurementUnit.PRESSURE },
];

const initialCylinders: Cylinder[] = [
  { id: '100001', typeId: 'ct1', value: 25.5, tareWeight: 10.2 },
  { id: '100002', typeId: 'ct1', value: 15.1, tareWeight: 10.1 },
  { id: '100003', typeId: 'ct1', value: 10.0, tareWeight: 10.0 }, // Empty
  { id: '200001', typeId: 'ct2', value: 3000 },
  { id: '200002', typeId: 'ct2', value: 750 },
  { id: '300001', typeId: 'ct3', value: 2200 },
];

const App: React.FC = () => {
  const [cylinderTypes, setCylinderTypes] = useState<CylinderType[]>([]);
  const [cylinders, setCylinders] = useState<Cylinder[]>([]);

  // Modals state
  const [isAddTypeModalOpen, setAddTypeModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isQrScannerOpen, setQrScannerOpen] = useState(false);
  
  const [selectedCylinder, setSelectedCylinder] = useState<Cylinder | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{type: 'type' | 'cylinder', id: string} | null>(null);


  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedTypes = localStorage.getItem('cylinderTypes');
      const storedCylinders = localStorage.getItem('cylinders');
      if (storedTypes && storedCylinders) {
        setCylinderTypes(JSON.parse(storedTypes));
        setCylinders(JSON.parse(storedCylinders));
      } else {
        // Initialize with dummy data if nothing in storage
        setCylinderTypes(initialCylinderTypes);
        setCylinders(initialCylinders);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setCylinderTypes(initialCylinderTypes);
      setCylinders(initialCylinders);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cylinderTypes', JSON.stringify(cylinderTypes));
      localStorage.setItem('cylinders', JSON.stringify(cylinders));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [cylinderTypes, cylinders]);

  const handleAddType = (name: string, unit: MeasurementUnit) => {
    const newType: CylinderType = {
      id: `ct${Date.now()}`,
      name,
      unit,
    };
    setCylinderTypes([...cylinderTypes, newType]);
    setAddTypeModalOpen(false);
  };

  const handleDeleteType = (typeId: string) => {
    setItemToDelete({ type: 'type', id: typeId });
    setConfirmModalOpen(true);
  };

  const handleAddCylinder = (typeId: string) => {
    const newId = Math.floor(100000 + Math.random() * 900000).toString();
    const type = cylinderTypes.find(t => t.id === typeId);
    if (!type) return;

    const newCylinder: Cylinder = {
      id: newId,
      typeId,
      value: type.unit === MeasurementUnit.MASS ? 0 : 0,
      tareWeight: type.unit === MeasurementUnit.MASS ? 0 : undefined,
    };
    setCylinders([...cylinders, newCylinder]);
  };
  
  const handleUpdateCylinder = (id: string, updates: { value: number; tareWeight?: number }) => {
    setCylinders(cylinders.map(c => c.id === id ? { ...c, ...updates } : c));
    setEditModalOpen(false);
    setSelectedCylinder(null);
  };
  
  const handleDeleteCylinder = (id: string) => {
    setEditModalOpen(false); // Close edit modal first
    setItemToDelete({ type: 'cylinder', id });
    setConfirmModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'type') {
      setCylinderTypes(cylinderTypes.filter(t => t.id !== itemToDelete.id));
      // Also delete associated cylinders
      setCylinders(cylinders.filter(c => c.typeId !== itemToDelete.id));
    } else {
      setCylinders(cylinders.filter(c => c.id !== itemToDelete.id));
    }

    setConfirmModalOpen(false);
    setItemToDelete(null);
  };

  const handleCylinderClick = (cylinder: Cylinder) => {
    setSelectedCylinder(cylinder);
    setEditModalOpen(true);
  };
  
  const handleScan = (id: string) => {
    const foundCylinder = cylinders.find(c => c.id === id);
    if (foundCylinder) {
      setSelectedCylinder(foundCylinder);
      setEditModalOpen(true);
    } else {
      alert(`Cylinder with ID ${id} not found.`);
    }
  };

  const handleQrScanSuccess = (decodedText: string) => {
    setQrScannerOpen(false);
    handleScan(decodedText);
  };
  
  const selectedCylinderType = cylinderTypes.find(t => t.id === selectedCylinder?.typeId);

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Header onAddTypeClick={() => setAddTypeModalOpen(true)} />
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <ScannerInput onScan={handleScan} onScanClick={() => setQrScannerOpen(true)} />
        </div>
        <div className="space-y-8">
          {cylinderTypes.map(type => (
            <CylinderTypeSection
              key={type.id}
              type={type}
              cylinders={cylinders.filter(c => c.typeId === type.id)}
              onAddCylinder={handleAddCylinder}
              onCylinderClick={handleCylinderClick}
              onDeleteType={handleDeleteType}
            />
          ))}
          {cylinderTypes.length === 0 && (
             <div className="text-center py-12 bg-slate-800/50 rounded-lg">
                <h2 className="text-xl font-semibold text-slate-300">No cylinder types found.</h2>
                <p className="mt-2 text-slate-400">Click "Add Type" to get started.</p>
             </div>
          )}
        </div>
      </main>

      <AddTypeModal
        isOpen={isAddTypeModalOpen}
        onClose={() => setAddTypeModalOpen(false)}
        onAddType={handleAddType}
      />
      
      {selectedCylinder && selectedCylinderType && (
        <EditCylinderModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedCylinder(null);
          }}
          cylinder={selectedCylinder}
          unit={selectedCylinderType.unit}
          onUpdate={handleUpdateCylinder}
          onDelete={handleDeleteCylinder}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
            setConfirmModalOpen(false);
            setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={`Delete ${itemToDelete?.type}`}
        message={`Are you sure you want to delete this ${itemToDelete?.type}? ${itemToDelete?.type === 'type' ? 'All associated cylinders will also be deleted.' : ''} This action cannot be undone.`}
      />

      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setQrScannerOpen(false)}
        onScanSuccess={handleQrScanSuccess}
      />
    </div>
  );
};

export default App;