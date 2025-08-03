declare module 'moment-jalaali' {
  import moment from 'moment';

  interface JMoment extends moment.Moment {
    loadPersian(opts?: { dialect?: 'persian' | 'persian-modern'; usePersianDigits?: boolean }): void;
    format(formatStr: string): string;
    jYear(y?: number): number | JMoment;
    jMonth(m?: number): number | JMoment;
    jDate(d?: number): number | JMoment;
    jDaysInMonth(): number;
    startOf(unit: moment.unitOfTime.StartOf): JMoment;
    endOf(unit: moment.unitOfTime.StartOf): JMoment;
    add(amount: number, unit: moment.unitOfTime.DurationConstructor): JMoment;
    subtract(amount: number, unit: moment.unitOfTime.DurationConstructor): JMoment;
    isBefore(moment: moment.Moment): boolean;
    isAfter(moment: moment.Moment): boolean;
  }

  interface MomentJalaaliStatic extends moment.MomentStatic {
    loadPersian(opts?: { dialect?: 'persian' | 'persian-modern'; usePersianDigits?: boolean }): void;
    fn: JMoment;
    (): JMoment;
    (input?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): JMoment;
  }

  const momentJalaali: MomentJalaaliStatic;
  export = momentJalaali;
}
declare module 'jalaali-js';

