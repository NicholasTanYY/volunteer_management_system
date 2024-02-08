// Calculates the number of days in a month
const getDaysInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  // Calculates the first day of the month
  const getStartingDay = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generates the Calendar as an array
  export const generateMonthDays = (date: Date): (number | null)[] => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getStartingDay(date);

    const days: (number | null)[] = [];

    const daysFromPrevMonth = (firstDay - 1 + 7) % 7;

    for (let i = 0; i < daysFromPrevMonth; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Formats the generated calendar array into rows
  export const chunkArray = (currentMonth: Date): (number | null)[][] => {
    const size = 7;
    const monthDays = generateMonthDays(currentMonth);
    const result: (number | null)[][] = [];
    for (let i = 0; i < monthDays.length; i += size) {
      result.push(monthDays.slice(i, i + size));
    }
    return result;
  };