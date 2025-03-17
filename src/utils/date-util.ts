import {
  differenceInMinutes,
  differenceInSeconds,
  differenceInYears,
  format,
  isAfter,
  isWeekend,
  sub,
} from 'date-fns';

export class DateUtil {
  private static _instance: DateUtil;

  private _undefinedDate = 'N/A';
  private _apiDateFormat = "yyyy-MM-dd'T'HH:mm:ss";
  private _newFormat = 'yyyy-MM-dd HH:mm:ss';

  private _appDateFormat = 'MMM dd, yyyy';
  private _appTimeFormat = 'HH:mm:ss';
  private _timeFormat = 'HH:mm';
  private _appOnlyDateFormatFirebae = 'd-MMM-yyyy';
  private _appOnlyTimeFormatFirebae = 'hh:mm a';
  private _appDateTimeFormatFirebae = 'd-MMM-yyyy hh:mm a';
  private _appDateTimeFormat = 'yyyy-MM-dd HH:mm a';
  private _appDateTimeFormatMail = 'HH:mm a, yyyy-MM-dd';
  private _appTimeFormatDay = 'dd';
  private _newApiDateFormat = 'MM/dd/yyyy';
  private _newDateFormat = 'dd/MM/yyyy';

  private constructor() {}
  public static getInstance = () => {
    if (!this._instance) {
      this._instance = new DateUtil();
    }
    return this._instance;
  };

  public isWeekend = (date?: string) => {
    if (!date) return -1;
    return isWeekend(new Date(date));
  };
  public parseApiDate = (date?: string) => {
    if (!date) return -1;
    new Date(date).getMilliseconds();
  };

  public formatForApiDate = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._newApiDateFormat);
  };

  public formatForDate = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._newDateFormat);
  };
  public formatNew = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._newFormat);
  };
  public formatAppDateToApiDate = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._apiDateFormat);
  };

  public formatMillisToAppDate = (millis?: number) => {
    if (!millis) return this._undefinedDate;
    return format(new Date(millis), this._appDateFormat);
  };

  public formatMillisToAppTime = (millis?: number) => {
    if (!millis) return this._undefinedDate;
    return format(new Date(millis), this._appTimeFormat);
  };

  public formatApiDateToAppDate = (date?: string | Date) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateFormat);
  };

  public formatApiDateToAppTime = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appTimeFormat);
  };
  public formatApiDateToTime = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._timeFormat);
  };

  public formatApiDateToAppOnlyDateFirebase = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appOnlyDateFormatFirebae);
  };

  public formatApiDateToAppOnlyTimeFirebase = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appOnlyTimeFormatFirebae);
  };

  public formatApiDateToAppDateTimeFirebase = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateTimeFormatFirebae);
  };

  public formatApiDateToAppDateTimeMail = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateTimeFormatMail);
  };
  public formatApiDateToAppTimeDay = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appTimeFormatDay);
  };

  public formatApiDateToAppDateTime = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateTimeFormat);
  };

  public getAge = (date?: string) => {
    if (!date) return -1;
    return differenceInYears(new Date(), new Date(date));
  };

  public getMintDiff = (date: Date) => {
    if (!date) return -1;
    return differenceInMinutes(new Date(), date);
  };
  public getSecondDiff = (date: Date | number) => {
    if (!date) return -1;
    return differenceInSeconds(new Date().getTime(), date);
  };

  public isAfterDate = (date: Date | number) => {
    if (!date) return -1;
    return isAfter(new Date(), date);
  };

  public getIsAfterDate = (messageDate: Date | number) => {
    if (!messageDate) return -1;
    return isAfter(messageDate, new Date(2022, 11, 6, 0, 0, 0));
  };
  public getYesterdayDate = (messageDate: Date | number) => {
    if (!messageDate) return -1;
    return sub(messageDate, {days: 1});
  };
  public convertServerDateToLocal(dateInput: string) {
    // EST - UTC offset: 5 hours
    var offset = 5.0,
      /*
        - calculate the difference between the server date and UTC
        - the value returned by the getTime method is the number of milliseconds since 1 January 1970 00:00:00 UTC.
        - the time-zone offset is the difference, in minutes, between UTC and local time
        - 60000 milliseconds = 60 seconds = 1 minute
        */
      serverDate = new Date(dateInput),
      utc = serverDate.getTime() - serverDate.getTimezoneOffset() * 60000,
      /*
        - apply the offset between UTC and EST (5 hours)
        - 3600000 milliseconds = 3600 seconds = 60 minutes = 1 hour
        */
      clientDate = new Date(utc + 3600000 * offset);
    return clientDate.toLocaleString();
  }
}
