export enum MeasurementUnit {
  MASS = 'mass',
  PRESSURE = 'pressure',
}

export interface CylinderType {
  id: string;
  name: string;
  unit: MeasurementUnit;
}

export interface Cylinder {
  id: string; // 6-digit unique ID
  typeId: string;
  value: number; // For mass, this is TOTAL weight. For pressure, this is pressure value.
  tareWeight?: number; // Only for mass-based cylinders
}
