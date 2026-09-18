export type ReliabilityColor = 'green'|'amber'|'red';
export type WaitClass = 'low'|'mid'|'high';
export type PortStatus = 'available'|'in_use'|'offline';
export type ConnectorType = 'CCS2'|'CHAdeMO'|'Type2'|'GBT'|'Ather'|'Type1';

export interface Coordinates { latitude:number; longitude:number; }

export interface ChargerPort {
  id:string; type:ConnectorType; displayName:string;
  powerKW:number; status:PortStatus; statusText:string;
}

export interface Review {
  id:string; userId:string; userName:string; userInitials:string;
  rating:number; comment:string; tags:string[];
  tagTypes:('ok'|'warn')[]; createdAt:Date|string;
}

export interface Station {
  id:string; name:string; network:string; networkShort:string;
  address:string; city:string; coordinates:Coordinates;
  reliabilityScore:number; reliabilityColor:ReliabilityColor;
  waitMinutes:number|null; waitText:string; waitClass:WaitClass;
  ports:ChargerPort[]; connectorTypes:ConnectorType[];
  maxPowerKW:number; pricePerKWh:number; currency:string;
  operatingHours:string; amenities:string[];
  totalReviews:number; averageRating:number;
  isOpen:boolean; distance?:number; reviews?:Review[];
}
