'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Grid3X3,
  LayoutGrid,
  X,
  Download,
  Calendar,
  Eye,
  Waves,
  Sun,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { BlurReveal } from '@/components/ui/BlurReveal';
import { cn } from '@/lib/utils';

type ViewMode = 'cards' | 'chess';

interface Apartment {
  id: string;
  number: string;
  building: 1 | 2 | 3;
  floor: number;
  area: number;
  price: number;
  status: 'available' | 'sold';
  rooms: 'studio' | '1' | '2';
  view: string;
  seaView: boolean;
  hasTerrace: boolean;
  terraceArea?: number;
  description: string;
}

type RoomType = 'studio' | '1' | '2';

interface Filters {
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  floor: number | null;
  rooms: RoomType | null;
  seaView: boolean | null;
  hasTerrace: boolean | null;
}

const defaultFilters: Filters = {
  priceMin: 1000000,
  priceMax: 6000000,
  areaMin: 13,
  areaMax: 50,
  floor: null,
  rooms: null,
  seaView: null,
  hasTerrace: null,
};

const statusColors = {
  available: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
  reserved: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  sold: 'bg-red-500/20 border-red-500/40 text-red-400',
};

const BUILDINGS = {
  1: { name: 'Корпус A', floors: 5 },
  2: { name: 'Корпус B', floors: 5 },
  3: { name: 'Корпус C', floors: 5 },
} as const;

const ROOM_LABELS: Record<RoomType, string> = {
  studio: 'Студия',
  '1': '1-комнатная',
  '2': '2-комнатная',
};

const STATUS_LABELS = {
  available: 'В наличии',
  reserved: 'Забронировано',
  sold: 'Продано',
};

const VIEW_LABELS: Record<string, string> = {
  'бассейн, двор': 'Вид на бассейн и двор',
  'горы': 'Вид на горы',
  'двор, горы': 'Вид на двор и горы',
  'горы, бассейн': 'Вид на горы и бассейн',
};

// ==================== ОБНОВЛЕННЫЕ ДАННЫЕ КВАРТИР ====================
const apartments: Apartment[] = [
  { id: '1', number: '1', building: 1, floor: 1, area: 21, price: 2550000, status: 'sold', rooms: 'studio', view: 'бассейн, двор', seaView: false, hasTerrace: false, description: 'Студия с видом на бассейн и двор.' },
  { id: '2', number: '2', building: 1, floor: 1, area: 30, price: 2950000, status: 'available', rooms: '1', view: 'бассейн, двор', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на бассейн и двор.' },
  { id: '3', number: '3', building: 1, floor: 1, area: 44, price: 5150000, status: 'sold', rooms: '2', view: 'горы', seaView: false, hasTerrace: false, description: '2-комнатная квартира с видом на горы.' },
  { id: '4', number: '4', building: 1, floor: 1, area: 13.5, price: 1550000, status: 'available', rooms: 'studio', view: 'двор, горы', seaView: false, hasTerrace: true, description: 'Студия с террасой и видом на двор и горы.' },
  { id: '5', number: '5', building: 1, floor: 1, area: 13.5, price: 1650000, status: 'available', rooms: 'studio', view: 'двор, горы', seaView: false, hasTerrace: true, description: 'Студия с террасой и видом на двор и горы.' },
  { id: '6', number: '6', building: 1, floor: 1, area: 35, price: 4150000, status: 'sold', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с террасой и видом на горы.' },
  { id: '7', number: '7', building: 1, floor: 1, area: 26, price: 4050000, status: 'sold', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с террасой и видом на горы.' },
  { id: '8', number: '8', building: 1, floor: 1, area: 26, price: 2750000, status: 'available', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с террасой и видом на горы.' },
  { id: '9', number: '9', building: 1, floor: 1, area: 26, price: 2750000, status: 'available', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с террасой и видом на горы.' },
  { id: '10', number: '10', building: 1, floor: 2, area: 27, price: 3350000, status: 'available', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: false, description: '1-комнатная квартира с видом на горы и бассейн.' },
  { id: '11', number: '11', building: 1, floor: 2, area: 35, price: 3550000, status: 'sold', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы и бассейн.' },
  { id: '12', number: '12', building: 1, floor: 2, area: 44, price: 5150000, status: 'sold', rooms: '2', view: 'горы', seaView: false, hasTerrace: true, description: '2-комнатная квартира с балконом и видом на горы.' },
  { id: '13', number: '13', building: 1, floor: 2, area: 13.5, price: 1750000, status: 'sold', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '14', number: '14', building: 1, floor: 2, area: 13.5, price: 1750000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '15', number: '15', building: 1, floor: 2, area: 16, price: 1750000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '16', number: '16', building: 1, floor: 2, area: 26, price: 3350000, status: 'sold', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: true, description: 'Студия с балконом и видом на горы.' },
  { id: '17', number: '17', building: 1, floor: 3, area: 27, price: 3550000, status: 'available', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: false, description: '1-комнатная квартира с видом на горы и бассейн.' },
  { id: '18', number: '18', building: 1, floor: 3, area: 35, price: 3750000, status: 'sold', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы и бассейн.' },
  { id: '19', number: '19', building: 1, floor: 3, area: 44, price: 5550000, status: 'available', rooms: '2', view: 'горы', seaView: false, hasTerrace: true, description: '2-комнатная квартира с балконом и видом на горы.' },
  { id: '20', number: '20', building: 1, floor: 3, area: 13.5, price: 1750000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '21', number: '21', building: 1, floor: 3, area: 13.5, price: 1850000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '22', number: '22', building: 1, floor: 3, area: 16, price: 1950000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '23', number: '23', building: 1, floor: 3, area: 26, price: 3350000, status: 'sold', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: true, description: 'Студия с балконом и видом на горы.' },
  { id: '24', number: '24', building: 1, floor: 4, area: 27, price: 3550000, status: 'available', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: false, description: '1-комнатная квартира с видом на горы и бассейн.' },
  { id: '25', number: '25', building: 1, floor: 4, area: 35, price: 4550000, status: 'available', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы и бассейн.' },
  { id: '26', number: '26', building: 1, floor: 4, area: 44, price: 5850000, status: 'available', rooms: '2', view: 'горы', seaView: false, hasTerrace: true, description: '2-комнатная квартира с балконом и видом на горы.' },
  { id: '27', number: '27', building: 1, floor: 4, area: 13.5, price: 1950000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '28', number: '28', building: 1, floor: 4, area: 13.5, price: 2050000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '29', number: '29', building: 1, floor: 4, area: 16, price: 1950000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '30', number: '30', building: 1, floor: 4, area: 26, price: 3350000, status: 'sold', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: true, description: 'Студия с балконом и видом на горы.' },
  { id: '31', number: '31', building: 1, floor: 5, area: 27, price: 3350000, status: 'available', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: false, description: '1-комнатная квартира с видом на горы и бассейн.' },
  { id: '32', number: '32', building: 1, floor: 5, area: 35, price: 4550000, status: 'available', rooms: '1', view: 'горы, бассейн', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы и бассейн.' },
  { id: '33', number: '33', building: 1, floor: 5, area: 44, price: 3950000, status: 'available', rooms: '2', view: 'горы', seaView: false, hasTerrace: true, description: '2-комнатная квартира с балконом и видом на горы.' },
  { id: '34', number: '34', building: 1, floor: 5, area: 13.5, price: 1850000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '35', number: '35', building: 1, floor: 5, area: 13.5, price: 1950000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '36', number: '36', building: 1, floor: 5, area: 16, price: 1950000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '37', number: '37', building: 1, floor: 5, area: 31, price: 4150000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: true, description: 'Студия с балконом и видом на горы.' },
  { id: '38', number: '38', building: 1, floor: 2, area: 14.5, price: 1650000, status: 'sold', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '39', number: '39', building: 1, floor: 2, area: 15, price: 1650000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '40', number: '40', building: 1, floor: 2, area: 34, price: 3750000, status: 'sold', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы.' },
  { id: '41', number: '41', building: 1, floor: 3, area: 14.5, price: 1650000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '42', number: '42', building: 1, floor: 3, area: 15, price: 1650000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '43', number: '43', building: 1, floor: 3, area: 34, price: 3750000, status: 'sold', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы.' },
  { id: '44', number: '44', building: 1, floor: 4, area: 14.5, price: 1750000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '45', number: '45', building: 1, floor: 4, area: 15, price: 1750000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '46', number: '46', building: 1, floor: 4, area: 34, price: 3750000, status: 'available', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы.' },
  { id: '47', number: '47', building: 1, floor: 5, area: 14.5, price: 1750000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '48', number: '48', building: 1, floor: 5, area: 15, price: 1750000, status: 'available', rooms: 'studio', view: 'горы', seaView: false, hasTerrace: false, description: 'Студия с видом на горы.' },
  { id: '49', number: '49', building: 1, floor: 5, area: 34, price: 3750000, status: 'sold', rooms: '1', view: 'горы', seaView: false, hasTerrace: true, description: '1-комнатная квартира с балконом и видом на горы.' },
];

const renumberApartments = (aps: Apartment[]): Apartment[] => {
  return aps.map((apt, index) => ({
    ...apt,
    number: String(index + 1),
  }));
};

const numberedApartments = renumberApartments(apartments);

function ApartmentPlanImage({ 
  apartment, 
  planVersion,
  className = "" 
}: { 
  apartment: Apartment; 
  planVersion: 'original' | 'version2';
  className?: string;
}) {
  const fileName = planVersion === 'version2' 
    ? `${apartment.number} (2).png` 
    : `${apartment.number}.png`;

  const imageSrc = `/textures/${fileName}`;
  const fallbackSrc = "/textures/placeholder-plan.png";

  return (
    <img
      src={imageSrc}
      alt={`Планировка квартиры №${apartment.number}`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallbackSrc;
      }}
      className={cn(
        "w-full h-full object-contain bg-ocean-deep/30 rounded-xl",
        className
      )}
    />
  );
}

function ApartmentModal({
  apartment,
  onClose,
}: {
  apartment: Apartment;
  onClose: () => void;
}) {
  const [planVersion, setPlanVersion] = useState<'original' | 'version2'>('version2');

  const toggleVersion = () => {
    setPlanVersion(prev => prev === 'version2' ? 'original' : 'version2');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-graphite-dark/90 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        data-lenis-prevent
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-milk/60 hover:text-milk"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="section-subtitle mb-1">
                {BUILDINGS[apartment.building].name} · Этаж {apartment.floor}
              </p>
              <h3 className="font-display text-3xl text-milk">
                Квартира №{apartment.number}
              </h3>
            </div>
            <span
              className={cn(
                'text-xs px-3 py-1.5 rounded-full border uppercase tracking-wider',
                statusColors[apartment.status]
              )}
            >
              {STATUS_LABELS[apartment.status]}
            </span>
          </div>

          {/* ПЛАНИРОВКА С ПЕРЕКЛЮЧАТЕЛЕМ */}
          <div className="bg-ocean-deep/50 rounded-xl p-6 mb-6 hover:scale-[1.02] transition-transform duration-500 overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-milk/70 font-medium">
                {planVersion === 'version2' ? 'Вариант планировки (2)' : 'Базовый вариант планировки'}
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={toggleVersion}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass hover:bg-white/10 active:bg-white/20 transition-all"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={toggleVersion}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass hover:bg-white/10 active:bg-white/20 transition-all"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>

            <div className="aspect-[16/11] w-full relative">
              <ApartmentPlanImage 
                apartment={apartment} 
                planVersion={planVersion}
                className="absolute inset-0" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Площадь', value: `${apartment.area} м²` },
              { label: 'Комнаты', value: ROOM_LABELS[apartment.rooms] },
              { label: 'Вид', value: VIEW_LABELS[apartment.view] || apartment.view },
              { label: 'Цена', value: `${apartment.price.toLocaleString('ru-RU')} ₽` },
            ].map((item) => (
              <div key={item.label} className="glass rounded-lg p-4">
                <p className="text-xs text-milk/50 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-milk font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {apartment.seaView && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                <Waves size={12} /> Вид на море
              </span>
            )}
            {apartment.hasTerrace && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                <Sun size={12} /> Терраса/балкон
              </span>
            )}
          </div>

          <p className="text-milk/60 text-sm mb-6">{apartment.description}</p>

          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-luxury-primary text-sm flex-1 text-center">
              <Calendar size={16} /> Забронировать
            </a>
            <a href="#contact" className="btn-luxury-outline text-sm flex-1 text-center">
              <Download size={16} /> Презентация
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ApartmentCard({
  apartment,
  index,
  onSelect,
}: {
  apartment: Apartment;
  index: number;
  onSelect: (a: Apartment) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="luxury-card group cursor-pointer hover:-translate-y-2"
      onClick={() => onSelect(apartment)}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-milk/40 tracking-wider uppercase mb-1">
              {BUILDINGS[apartment.building].name} · {apartment.floor} эт.
            </p>
            <h4 className="font-display text-2xl text-milk group-hover:text-gold transition-colors">
              №{apartment.number}
            </h4>
          </div>
          <span
            className={cn(
              'text-[10px] px-2.5 py-1 rounded-full border uppercase tracking-wider',
              statusColors[apartment.status]
            )}
          >
            {STATUS_LABELS[apartment.status]}
          </span>
        </div>

        <div className="h-36 mb-4 bg-ocean-deep/40 rounded-xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-500 relative">
          <ApartmentPlanImage apartment={apartment} planVersion="version2" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <p className="text-milk/40 text-xs">Площадь</p>
            <p className="text-milk">{apartment.area} м²</p>
          </div>
          <div>
            <p className="text-milk/40 text-xs">Комнаты</p>
            <p className="text-milk">{ROOM_LABELS[apartment.rooms]}</p>
          </div>
          <div>
            <p className="text-milk/40 text-xs">Вид</p>
            <p className="text-milk text-xs">{VIEW_LABELS[apartment.view] || apartment.view}</p>
          </div>
          <div>
            <p className="text-milk/40 text-xs">Цена</p>
            <p className="text-gold font-medium">{apartment.price.toLocaleString('ru-RU')} ₽</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(apartment);
            }}
            className="btn-luxury-outline text-xs flex-1 py-2.5 min-h-[40px]"
          >
            <Eye size={14} /> Планировка
          </button>
          <a
            href="#contact"
            onClick={(e) => e.stopPropagation()}
            className="btn-luxury-primary text-xs flex-1 py-2.5 min-h-[40px] text-center"
          >
            Забронировать
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ChessBoard({
  building,
  floor,
  onBuildingChange,
  onFloorChange,
  onSelect,
}: {
  building: 1 | 2 | 3;
  floor: number;
  onBuildingChange: (b: 1 | 2 | 3) => void;
  onFloorChange: (f: number) => void;
  onSelect: (a: Apartment) => void;
}) {
  const floorApartments = useMemo(
    () => numberedApartments.filter((a) => a.building === building && a.floor === floor),
    [building, floor]
  );

  const maxFloors = BUILDINGS[building].floors;

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <p className="text-xs text-milk/40 uppercase tracking-wider mb-2">Корпус</p>
          <div className="flex gap-2">
            {([1, 2, 3] as const).map((b) => (
              <button
                key={b}
                onClick={() => { onBuildingChange(b); onFloorChange(1); }}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm transition-all',
                  building === b ? 'bg-gold/20 text-gold border border-gold/40' : 'glass text-milk/60 hover:text-milk'
                )}
              >
                {BUILDINGS[b].name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-milk/40 uppercase tracking-wider mb-2">Этаж</p>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: maxFloors }, (_, i) => i + 1).map((f) => (
              <button
                key={f}
                onClick={() => onFloorChange(f)}
                className={cn(
                  'w-10 h-10 rounded-lg text-sm transition-all',
                  floor === f ? 'bg-gold/20 text-gold border border-gold/40' : 'glass text-milk/60 hover:text-milk'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {floorApartments.map((apt) => (
          <motion.button
            key={apt.id}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(apt)}
            disabled={apt.status === 'sold'}
            className={cn(
              'relative p-4 rounded-xl border text-left transition-all',
              apt.status === 'available' && 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]',
              apt.status === 'sold' && 'bg-red-500/5 border-red-500/20 opacity-50 cursor-not-allowed'
            )}
          >
            <span className="font-accent text-lg text-milk">№{apt.number}</span>
            <p className="text-xs text-milk/50 mt-1">{apt.area} м²</p>
            <p className="text-xs text-gold/80 mt-0.5">{apt.price.toLocaleString('ru-RU')} ₽</p>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current opacity-60" />
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
        {[
          { color: 'bg-emerald-500', label: 'Свободна' },
          { color: 'bg-red-500', label: 'Продана' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-milk/50">
            <span className={cn('w-2.5 h-2.5 rounded-full', item.color)} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Apartments() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [chessBuilding, setChessBuilding] = useState<1 | 2 | 3>(1);
  const [chessFloor, setChessFloor] = useState(1);

  const filtered = useMemo(() => {
    return numberedApartments.filter((a) => {
      if (a.price < filters.priceMin || a.price > filters.priceMax) return false;
      if (a.area < filters.areaMin || a.area > filters.areaMax) return false;
      if (filters.floor !== null && a.floor !== filters.floor) return false;
      if (filters.rooms !== null && a.rooms !== filters.rooms) return false;
      if (filters.seaView !== null && a.seaView !== filters.seaView) return false;
      if (filters.hasTerrace !== null && a.hasTerrace !== filters.hasTerrace) return false;
      return true;
    });
  }, [filters]);

  const resetFilters = useCallback(() => setFilters(defaultFilters), []);

  const formatPrice = (price: number) => price.toLocaleString('ru-RU') + ' ₽';

  return (
    <section id="apartments" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-graphite via-ocean-deep/20 to-graphite" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <BlurReveal className="text-center mb-12">
          <p className="section-subtitle mb-4">Резиденции</p>
          <h2 className="section-title mb-4">
            <span className="text-gradient-gold">49</span> эксклюзивных жилых помещений
          </h2>
          <p className="text-milk/60 max-w-2xl mx-auto">
            Каждая квартира — уникальная планировка с панорамными видами на горы, лес и море
          </p>
        </BlurReveal>

        {/* Filters */}
        <div className="glass rounded-2xl p-5 md:p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Search size={18} className="text-gold" />
            <h3 className="font-display text-lg text-milk">Фильтр квартир</h3>
            <button onClick={resetFilters} className="ml-auto text-xs text-milk/40 hover:text-gold transition-colors uppercase tracking-wider">
              Сбросить
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs text-milk/40 uppercase tracking-wider mb-2 block">Цена до, ₽</label>
              <input 
                type="range" 
                min={1000000} 
                max={6000000} 
                step={50000} 
                value={filters.priceMax}
                onChange={(e) => setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))} 
                className="w-full accent-gold" 
              />
              <p className="text-sm text-gold mt-1">{formatPrice(filters.priceMax)}</p>
            </div>
            <div>
              <label className="text-xs text-milk/40 uppercase tracking-wider mb-2 block">Площадь от, м²</label>
              <input 
                type="range" 
                min={13} 
                max={50} 
                step={0.5} 
                value={filters.areaMin}
                onChange={(e) => setFilters((f) => ({ ...f, areaMin: Number(e.target.value) }))} 
                className="w-full accent-gold" 
              />
              <p className="text-sm text-gold mt-1">{filters.areaMin} м²</p>
            </div>
            <div>
              <label className="text-xs text-milk/40 uppercase tracking-wider mb-2 block">Этаж</label>
              <select 
                value={filters.floor ?? ''} 
                onChange={(e) => setFilters((f) => ({ ...f, floor: e.target.value ? Number(e.target.value) : null }))}
                className="w-full bg-ocean-deep/50 border border-white/10 rounded-lg px-3 py-2.5 text-milk text-sm"
              >
                <option value="">Все этажи</option>
                {[1,2,3,4,5].map(f => <option key={f} value={f}>{f} этаж</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-milk/40 uppercase tracking-wider mb-2 block">Комнаты</label>
              <select 
                value={filters.rooms ?? ''} 
                onChange={(e) => setFilters((f) => ({ ...f, rooms: (e.target.value as RoomType) || null }))}
                className="w-full bg-ocean-deep/50 border border-white/10 rounded-lg px-3 py-2.5 text-milk text-sm"
              >
                <option value="">Все</option>
                <option value="studio">Студия</option>
                <option value="1">1-комнатная</option>
                <option value="2">2-комнатная</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Вид на море', active: filters.seaView === true, toggle: () => setFilters(f => ({ ...f, seaView: f.seaView === true ? null : true })) },
              { label: 'С террасой', active: filters.hasTerrace === true, toggle: () => setFilters(f => ({ ...f, hasTerrace: f.hasTerrace === true ? null : true })) },
            ].map((chip) => (
              <button 
                key={chip.label} 
                onClick={chip.toggle}
                className={cn('text-xs px-4 py-2 rounded-full border transition-all uppercase tracking-wider',
                  chip.active ? 'bg-gold/20 border-gold/40 text-gold' : 'border-white/10 text-milk/50 hover:border-gold/20'
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-milk/50 text-sm">
            Найдено: <span className="text-gold">{filtered.length}</span> из 49
          </p>
          <div className="flex gap-2 glass rounded-lg p-1">
            <button 
              onClick={() => setViewMode('cards')} 
              className={cn('flex items-center gap-2 px-4 py-2 rounded-md text-xs uppercase tracking-wider transition-all', 
                viewMode === 'cards' ? 'bg-gold/20 text-gold' : 'text-milk/50'
              )}
            >
              <LayoutGrid size={14} /> Карточки
            </button>
            <button 
              onClick={() => setViewMode('chess')} 
              className={cn('flex items-center gap-2 px-4 py-2 rounded-md text-xs uppercase tracking-wider transition-all', 
                viewMode === 'chess' ? 'bg-gold/20 text-gold' : 'text-milk/50'
              )}
            >
              <Grid3X3 size={14} /> Шахматка
            </button>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((apt, i) => (
              <ApartmentCard key={apt.id} apartment={apt} index={i} onSelect={setSelectedApartment} />
            ))}
          </div>
        ) : (
          <ChessBoard
            building={chessBuilding}
            floor={chessFloor}
            onBuildingChange={setChessBuilding}
            onFloorChange={setChessFloor}
            onSelect={setSelectedApartment}
          />
        )}
      </div>

      <AnimatePresence>
        {selectedApartment && (
          <ApartmentModal
            apartment={selectedApartment}
            onClose={() => setSelectedApartment(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}