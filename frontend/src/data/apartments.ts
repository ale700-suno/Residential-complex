export type ViewType = 'mountain' | 'forest' | 'river' | 'panorama' | 'pool';
export type ApartmentStatus = 'available' | 'reserved' | 'sold';
export type RoomType = 'studio' | '1.5' | '2';

export interface Apartment {
  id: string;
  number: string;
  building: 1 | 2 | 3;
  floor: number;
  area: number;
  price: number;
  rooms: RoomType;
  view: ViewType;
  hasTerrace: boolean;
  terraceArea?: number;
  status: ApartmentStatus;
  seaView: boolean;
  description: string;
}

export const BUILDINGS = {
  1: { name: 'Корпус 1', floors: 5, delivered: true },
  2: { name: 'Корпус 2', floors: 4, delivered: false },
  3: { name: 'Корпус 3', floors: 4, delivered: false },
} as const;

export const VIEW_LABELS: Record<ViewType, string> = {
  mountain: 'Вид на горы',
  forest: 'Вид на лес',
  river: 'Вид на реку',
  panorama: 'Панорамный вид',
  pool: 'Вид на бассейн',
};

export const ROOM_LABELS: Record<RoomType, string> = {
  studio: 'Студия',
  '1.5': '1,5-комнатная',
  '2': '2-комнатная',
};

export const STATUS_LABELS: Record<ApartmentStatus, string> = {
  available: 'Свободна',
  reserved: 'Бронь',
  sold: 'Продана',
};

export const apartments: Apartment[] = [
  { id: '1-101', number: '101', building: 1, floor: 1, area: 18, price: 1350000, rooms: 'studio', view: 'forest', hasTerrace: true, terraceArea: 5, status: 'available', seaView: false, description: 'Студия с террасой 5 м²' },
  { id: '1-102', number: '102', building: 1, floor: 1, area: 26, price: 1950000, rooms: 'studio', view: 'mountain', hasTerrace: true, terraceArea: 8, status: 'available', seaView: false, description: 'Студия с двумя террасами' },
  { id: '1-103', number: '103', building: 1, floor: 1, area: 35, price: 2750000, rooms: '1.5', view: 'panorama', hasTerrace: true, terraceArea: 6, status: 'available', seaView: false, description: '1,5-комнатная с панорамным видом' },
  { id: '1-104', number: '104', building: 1, floor: 1, area: 14, price: 1280000, rooms: 'studio', view: 'pool', hasTerrace: false, status: 'available', seaView: false, description: 'Компактная студия у бассейна' },
  { id: '1-201', number: '201', building: 1, floor: 2, area: 15, price: 1450000, rooms: 'studio', view: 'mountain', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с видом на горы' },
  { id: '1-202', number: '202', building: 1, floor: 2, area: 16, price: 1550000, rooms: 'studio', view: 'mountain', hasTerrace: false, status: 'available', seaView: false, description: 'Студия, южная сторона' },
  { id: '1-203', number: '203', building: 1, floor: 2, area: 22, price: 1780000, rooms: 'studio', view: 'forest', hasTerrace: false, status: 'reserved', seaView: false, description: 'Студия с видом на лес' },
  { id: '1-204', number: '204', building: 1, floor: 2, area: 28, price: 2100000, rooms: '1.5', view: 'mountain', hasTerrace: true, terraceArea: 4, status: 'available', seaView: false, description: '1,5-комнатная с террасой' },
  { id: '1-301', number: '301', building: 1, floor: 3, area: 17, price: 1520000, rooms: 'studio', view: 'river', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с видом на реку' },
  { id: '1-302', number: '302', building: 1, floor: 3, area: 19, price: 1620000, rooms: 'studio', view: 'mountain', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с панорамой гор' },
  { id: '1-303', number: '303', building: 1, floor: 3, area: 24, price: 1850000, rooms: 'studio', view: 'panorama', hasTerrace: false, status: 'sold', seaView: false, description: 'Студия с панорамным видом' },
  { id: '1-501', number: '501', building: 1, floor: 5, area: 44, price: 3350000, rooms: '2', view: 'panorama', hasTerrace: false, status: 'available', seaView: true, description: '2-комнатная на верхнем этаже' },
  { id: '2-101', number: '101', building: 2, floor: 1, area: 16, price: 1420000, rooms: 'studio', view: 'forest', hasTerrace: true, terraceArea: 4, status: 'available', seaView: false, description: 'Студия с террасой' },
  { id: '2-102', number: '102', building: 2, floor: 1, area: 20, price: 1680000, rooms: 'studio', view: 'pool', hasTerrace: true, terraceArea: 5, status: 'available', seaView: false, description: 'Студия у бассейна' },
  { id: '2-103', number: '103', building: 2, floor: 1, area: 32, price: 2550000, rooms: '1.5', view: 'mountain', hasTerrace: true, terraceArea: 7, status: 'available', seaView: false, description: '1,5-комнатная с террасой' },
  { id: '2-201', number: '201', building: 2, floor: 2, area: 15, price: 1480000, rooms: 'studio', view: 'mountain', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с видом на горы' },
  { id: '2-202', number: '202', building: 2, floor: 2, area: 18, price: 1580000, rooms: 'studio', view: 'forest', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с видом на лес' },
  { id: '2-203', number: '203', building: 2, floor: 2, area: 25, price: 1920000, rooms: 'studio', view: 'river', hasTerrace: false, status: 'reserved', seaView: false, description: 'Просторная студия' },
  { id: '2-301', number: '301', building: 2, floor: 3, area: 17, price: 1550000, rooms: 'studio', view: 'panorama', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с панорамой' },
  { id: '2-302', number: '302', building: 2, floor: 3, area: 30, price: 2380000, rooms: '1.5', view: 'mountain', hasTerrace: false, status: 'available', seaView: false, description: '1,5-комнатная' },
  { id: '2-401', number: '401', building: 2, floor: 4, area: 38, price: 2950000, rooms: '2', view: 'panorama', hasTerrace: true, terraceArea: 6, status: 'available', seaView: true, description: '2-комнатная с террасой' },
  { id: '2-402', number: '402', building: 2, floor: 4, area: 42, price: 3200000, rooms: '2', view: 'mountain', hasTerrace: false, status: 'available', seaView: true, description: '2-комнатная пентхаус' },
  { id: '3-101', number: '101', building: 3, floor: 1, area: 13, price: 1180000, rooms: 'studio', view: 'forest', hasTerrace: false, status: 'available', seaView: false, description: 'Компактная студия 13 м²' },
  { id: '3-102', number: '102', building: 3, floor: 1, area: 19, price: 1590000, rooms: 'studio', view: 'pool', hasTerrace: true, terraceArea: 4, status: 'available', seaView: false, description: 'Студия с террасой' },
  { id: '3-103', number: '103', building: 3, floor: 1, area: 27, price: 2050000, rooms: '1.5', view: 'mountain', hasTerrace: true, terraceArea: 5, status: 'available', seaView: false, description: '1,5-комнатная с террасой' },
  { id: '3-201', number: '201', building: 3, floor: 2, area: 16, price: 1530000, rooms: 'studio', view: 'mountain', hasTerrace: false, status: 'available', seaView: false, description: 'Студия, южная сторона' },
  { id: '3-202', number: '202', building: 3, floor: 2, area: 21, price: 1720000, rooms: 'studio', view: 'river', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с видом на реку' },
  { id: '3-203', number: '203', building: 3, floor: 2, area: 29, price: 2250000, rooms: '1.5', view: 'forest', hasTerrace: false, status: 'sold', seaView: false, description: '1,5-комнатная' },
  { id: '3-301', number: '301', building: 3, floor: 3, area: 18, price: 1650000, rooms: 'studio', view: 'panorama', hasTerrace: false, status: 'available', seaView: false, description: 'Студия с панорамой' },
  { id: '3-302', number: '302', building: 3, floor: 3, area: 33, price: 2620000, rooms: '1.5', view: 'mountain', hasTerrace: false, status: 'available', seaView: false, description: '1,5-комнатная просторная' },
  { id: '3-401', number: '401', building: 3, floor: 4, area: 40, price: 3100000, rooms: '2', view: 'panorama', hasTerrace: true, terraceArea: 8, status: 'available', seaView: true, description: '2-комнатная с террасой' },
  { id: '3-402', number: '402', building: 3, floor: 4, area: 36, price: 2850000, rooms: '2', view: 'mountain', hasTerrace: false, status: 'available', seaView: true, description: '2-комнатная с видом на море' },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export function getApartmentsByFloor(building: number, floor: number): Apartment[] {
  return apartments.filter((a) => a.building === building && a.floor === floor);
}

export function getAvailableCount(): number {
  return apartments.filter((a) => a.status === 'available').length;
}
