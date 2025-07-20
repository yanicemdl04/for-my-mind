/**
 * Obtient la date d'il y a X jours
 * @param days - Nombre de jours à soustraire
 * @returns Date d'il y a X jours
 */
export const getDateDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

/**
 * Formate une date au format français (DD/MM/YYYY)
 * @param date - Date à formater
 * @returns Date formatée
 */
export const formatDateFR = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Obtient le début et la fin d'une période (semaine, mois, etc.)
 * @param period - Période ('week', 'month', 'year')
 * @returns Objet contenant les dates de début et de fin
 */
export const getPeriodDates = (period: 'week' | 'month' | 'year'): { start: Date; end: Date } => {
  const end = new Date();
  const start = new Date();
  
  switch (period) {
    case 'week':
      start.setDate(end.getDate() - 7);
      break;
    case 'month':
      start.setMonth(end.getMonth() - 1);
      break;
    case 'year':
      start.setFullYear(end.getFullYear() - 1);
      break;
  }
  
  return { start, end };
};