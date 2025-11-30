import { useState, useEffect } from 'react';
import { service } from './service.ts';
import type { Filters } from './types.ts'
import type { AggregationResult } from './types.ts'


const useTableQuery = (filter?: Filters) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<AggregationResult[] | null>(null);

  const queryService = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const dati = await service(filter);
      setData(dati);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, queryService };
};

const useFilters = () => {
  const [campiAggregazione, setCampiAggregazione] = useState<string[] | null>(null);
  
  return {
    campiAggregazione,
    setCampiAggregazione,
  };
};

export const useDataAggregation = () => {
  const rawQuery = useTableQuery();
  
  const filterStatus = useFilters();
  
  const filteredQuery = useTableQuery(
    filterStatus.campiAggregazione 
      ? { campiAggregazione: filterStatus.campiAggregazione } 
      : undefined
  );

  useEffect(() => {
    rawQuery.queryService();
  }, []);

  useEffect(() => {
    if (filterStatus.campiAggregazione) {
      filteredQuery.queryService();
    }
  }, [filterStatus.campiAggregazione]);

  const handleFilterChange = (campi: string[] | null) => {
    filterStatus.setCampiAggregazione(campi);
  };

  return {
    rawQuery,
    filteredQuery,
    filterStatus,
    handleFilterChange
  };
};