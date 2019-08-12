import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

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
