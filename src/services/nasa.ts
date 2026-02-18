
import type { APODResponse } from '../types/nasa';

const NASA_API_KEY = import.meta.env.NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export async function getAPOD(date?: string): Promise<APODResponse> {
  const url = new URL(BASE_URL);
  url.searchParams.append('api_key', NASA_API_KEY);
  
  if (date) {
    url.searchParams.append('date', date);
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status}`);
  }

  return response.json();
}

export async function getAPODRange(
  startDate: string,
  endDate: string
): Promise<APODResponse[]> {
  const url = new URL(BASE_URL);
  url.searchParams.append('api_key', NASA_API_KEY);
  url.searchParams.append('start_date', startDate);
  url.searchParams.append('end_date', endDate);

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status}`);
  }

  return response.json();
}

export async function getRecentAPODs(count: number = 12): Promise<APODResponse[]> {
  const url = new URL(BASE_URL);
  url.searchParams.append('api_key', NASA_API_KEY);
  url.searchParams.append('count', count.toString());

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status}`);
  }

  return response.json();
}