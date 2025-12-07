import {useState, useEffect, useCallback} from 'react';
import {getRawRecords, service} from './service.ts';
import type {Filters, WorkRecord} from './types.ts'
import type { AggregationResult } from './types.ts'


const useTableQuery = () => {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<AggregationResult[] | WorkRecord[] |null>(null);

  const queryService = useCallback(async (filter?: Filters) => {
    try {
      setError(null);
      const dati = filter ? await service(filter) : await getRawRecords();
      setData(dati);
    } catch (e) {
      setError(e as Error);
    }
  }, []);

  return { error, data, queryService };
};

const useFilters = () => {
  const [campiAggregazione, setCampiAggregazione] = useState<string[] | null>(null);

  return {
    campiAggregazione,
    setCampiAggregazione,
  };
};

//wrappa handleFilterChange con useCallback per evitare re-rendering. ristrutturato perché ora uso rawData
export const useDataAggregation = () => {
  const {queryService: rawQueryService, data: rawQueryData } = useTableQuery();
    const {queryService: filterQueryService, data: filterQueryData } = useTableQuery();

    const {setCampiAggregazione, campiAggregazione} = useFilters();

  const handleFilterChange = useCallback((campi: string[] | null) => {
    setCampiAggregazione(campi);
  }, [setCampiAggregazione]);

  const onFiltersChanged = useCallback(() => {
      if(!campiAggregazione){
          rawQueryService().then().catch();
          return
      }
      filterQueryService({campiAggregazione}).then().catch();
  }, [campiAggregazione, filterQueryService, rawQueryService])

    useEffect(onFiltersChanged, [onFiltersChanged]);

  return {
      dataSource: campiAggregazione ? filterQueryData : rawQueryData,
      filterStatus: {setCampiAggregazione, campiAggregazione},
      handleFilterChange
  };
};