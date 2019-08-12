import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { Timestamp } from '@firebase/firestore-types';

export const convertTsToDate = (ts: Timestamp): string =>
  format(ts.toDate(), 'eeee do MMM');

export const convertTsToTime = (ts: Timestamp): string =>
  format(ts.toDate(), 'KK:mm a');

export const convertTsToDateTime = (ts: Timestamp): string =>
  convertTsToDate(ts) + ' at ' + convertTsToTime(ts);

// legacy (preference only)

export const convertToDateString = (dateTimeString: string): string => {
  return format(parseISO(dateTimeString), 'eeee do MMM');
};

export const convertToTimeString = (dateTimeString: string): string => {
  return format(parseISO(dateTimeString), 'KK:mm a');
};

export const convertToDateTime = (dateTimeString: string): string => {
  return (
    convertToDateString(dateTimeString) +
    ' at ' +
    convertToTimeString(dateTimeString)
  );
};
