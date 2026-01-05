import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Cyber Chrome & 3D',
    duration: '120 мин',
    description: 'Металлик, объёмные фигуры, корейский стиль. Главный тренд 2026.'
  },
  {
    id: '2',
    title: 'Японский Эко-Глянец',
    duration: '60 мин',
    description: 'Глубокое восстановление и натуральный блеск без покрытия.'
  },
  {
    id: '3',
    title: 'Smart Педикюр',
    duration: '90 мин',
    description: 'Инновационная техника обработки стоп дисками. Идеальная гладкость.'
  },
  {
    id: '4',
    title: 'Lux Gel Покрытие',
    duration: '90 мин',
    description: 'Укрепление гелем, идеальные блики, чистый комбинированный маникюр.'
  }
];

export const TIME_SLOTS = [
  '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'
];