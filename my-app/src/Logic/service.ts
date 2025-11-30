import axios from 'axios';
//import { aggregaDati } from './aggregazione.ts';
import type { Filters } from './types.ts'
import type { AggregationResult } from './types.ts'
//import { db } from '../assets/db.ts';

//ricorda di aggiungere axios quando passi da mock a client-server
const API_BASE_URL = 'http://localhost:3001/api';

export const service = async (filter?: Filters): Promise<AggregationResult[]> => {
  try {
    const params = filter?.campiAggregazione ? { campiAggregazione: filter.campiAggregazione.join(",")} : {};

    const response = await axios.get(`${API_BASE_URL}/records`, { params });
    return response.data;
  } catch (error) {
    console.error('Error in API call: ', error);
    throw error;
  }
};

export const getRawRecords = async() => {
  try {
    const response = await axios.get(`${API_BASE_URL}/records/raw`);
    return response.data;
  } catch(error) {
    console.error('Error in API call: ', error);
    throw error;
  }
};