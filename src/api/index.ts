import { env } from '@/env/server.mjs';
import { type_iso, type_locations } from '@/types';

export async function getLocations() {
  try {
    return new Map(
      Object.entries(
        await fetch(env.DATA_URL + 'countries.json').then(
          response => response.json()
          // response => new Map(Object.entries(response.json()))
        )
      )
    ) as type_locations;
  } catch (error) {
    throw new Error('Failed to fetch data' + error);
  }
}

export async function getData(iso: string) {
  try {
    return (await fetch(env.DATA_URL + iso + '.json').then(res => res.json())) as type_iso;
  } catch (error) {
    throw new Error('Failed to fetch data' + error);
  }
}
