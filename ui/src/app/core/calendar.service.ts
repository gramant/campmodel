/**
 * Service with common functions for dates.
 */
export class CalendarService {

    private static DAYS_NAMES = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY'
    ];

    private static MONTHS_NAMES = [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER'
    ];

    private static MONTHS_SHORT_NAMES = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
    ];


    /**
     * dayIndex - 0..6 (Sunday == 0)
     */
    static dayOfWeekName(dayIndex: number): string {
        if (dayIndex < 0 || dayIndex > CalendarService.DAYS_NAMES.length - 1) {
            return '';
        }
        return CalendarService.DAYS_NAMES[dayIndex];
    }

    /**
     * @param monthIndex: 1-12
     */
    static monthName(monthIndex: number): string {
        if (monthIndex <= 0 || monthIndex > CalendarService.MONTHS_NAMES.length) {
            return '';
        }
        return CalendarService.MONTHS_NAMES[monthIndex - 1];
    }

    /**
     * @param monthIndex: 1-12
     */
    static monthShortName(monthIndex: number): string {
        if (monthIndex <= 0 || monthIndex > CalendarService.MONTHS_SHORT_NAMES.length) {
            return '';
        }
        return CalendarService.MONTHS_SHORT_NAMES[monthIndex - 1];
    }


    // Month here is 1-indexed (January is 1, February is 2, etc). This is
    // because we're using 0 as the day so that it returns the last day
    // of the last month, so you have to add 1 to the month number
    // so it returns the correct amount of days
    static daysCountInMonth(month: number, year: number): number {
        if (month < 1 || month > 12) {
            return 0;
        }
        return new Date(year, month, 0).getDate();
    }

    // Sunday === 0
    static dayOfWeek(dayOfMonth: number, month: number, year: number): number {
        return new Date(year, month, dayOfMonth).getDay();
    }

    // Sunday === 0
    static isWeekendDay(dayOfWeek: number): boolean {
        const name = CalendarService.dayOfWeekName(dayOfWeek);
        return name === 'SATURDAY' || name === 'SUNDAY';
    }

    static isIntersectingPeriods(period1: { start: Date, end: Date }, period2: { start: Date, end: Date }): boolean {
        const p1Start = new Date(period1.start.getFullYear(), period1.start.getMonth(), period1.start.getDate()).getTime();
        const p1End = new Date(period1.end.getFullYear(), period1.end.getMonth(), period1.end.getDate()).getTime();
        const p2Start = new Date(period2.start.getFullYear(), period2.start.getMonth(), period2.start.getDate()).getTime();
        const p2End = new Date(period2.end.getFullYear(), period2.end.getMonth(), period2.end.getDate()).getTime();

        if (p1Start <= p2Start && p1End >= p2Start || p2Start <= p1Start && p2End >= p1Start) {
            return true;
        }
        return false;
    }

    static equalsDate(date1: Date, date2: Date): boolean {
        return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }

    static isEndOfMonth(date: Date): boolean {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        return date.getMonth() !== nextDate.getMonth();
    }

    // returns date in format yyyy-MM-dd
    static getFormattedDate(date: Date): string {
        return date.getFullYear() + '-' + this.prependWithZeroIfNeeded(date.getMonth() + 1) + '-' +
            this.prependWithZeroIfNeeded(date.getDate());
    }

    // returns date in format dd.MM.yyyy
    static getHumanDate(date: Date): string {
        return this.prependWithZeroIfNeeded(date.getDate()) + '.' + this.prependWithZeroIfNeeded(date.getMonth() + 1) +
            '.' + date.getFullYear();
    }

    static isDateWithinPeriod(date: Date, period: { start: Date, end: Date }): boolean {
        const dateAtDayStart = new Date(date).setHours(0, 0, 0, 0);
        const periodStartAtDayStart = new Date(period.start).setHours(0, 0, 0, 0);
        const periodEndAtDayStart = new Date(period.end).setHours(0, 0, 0, 0);
        return periodStartAtDayStart <= dateAtDayStart && dateAtDayStart <= periodEndAtDayStart;
    }

    private static prependWithZeroIfNeeded(num: number): string {
        return num >= 10 ? num.toString() : '0' + num;
    }

}

