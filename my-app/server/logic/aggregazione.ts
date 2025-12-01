import { db } from '../assets/db.ts';
import type { AggregationResult } from '../../client/src/Logic/types.ts';

//logica di aggregazione dei dati

export function aggregaDati(dati: typeof db.records, campiAggregazione: string[]): AggregationResult[] {
  const result: Record<string, AggregationResult> = {};

  dati.forEach(item => {
    const keyParts: string[] = [];
    const aggregazione: Partial<AggregationResult> = {};

    campiAggregazione.forEach(campo => {
      if (campo === 'project') {
        aggregazione.projectName = item.project.name;
        keyParts.push(item.project.name);
      } else if (campo === 'employee') {
        aggregazione.employeeName = item.employee.name;
        keyParts.push(item.employee.name);
      } else if (campo === 'date') {
        aggregazione.date = new Date(item.date).toLocaleDateString();
        keyParts.push(aggregazione.date);
      }
    });

    const key = keyParts.join('|');

    if (!result[key]) {
      result[key] = { ...aggregazione, totaleOre: 0 } as AggregationResult;
    }
    result[key].totaleOre += item.hours;
  });

  return Object.values(result);
}
 