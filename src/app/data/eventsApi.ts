import { Event } from '../../features/event/eventContants';
import { sampleData } from './sample';

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const fetchEventsFromApi = (): Promise<Event[]> => {
  return delay(1000).then(() => sampleData);
};
