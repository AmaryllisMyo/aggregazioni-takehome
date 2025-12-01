import type { AggregationResult } from '../Logic/types.ts'
import type { WorkRecord } from '../Logic/types.ts'
import RecordRow from './tableStructure.tsx'

// rifattorizzo qui rows modulari. si basano sul type WorkRecord che ho definito nel file types.ts
const RenderRows = (
  campiAggregazione: string[] | null,
  records: WorkRecord[],
  aggregatedData: AggregationResult[] | null
) => { 
    if (!campiAggregazione) {
    return records.map((record, i) => (
      <RecordRow key={i} record={record} />
    ));
  }

  if (!aggregatedData || !Array.isArray(aggregatedData)) {
    return null;
  }


  return aggregatedData.map((row, i) => {
        return (
    <tr key={i}>
      {campiAggregazione.map((campo) => {
        if (campo === 'project') {
          return <td key="project">{row.projectName}</td>;
        } else if (campo === 'employee') {
          return <td key="employee">{row.employeeName}</td>;
        } else if (campo === 'date') {
          return <td key="date">{row.date}</td>;
        }
        return null;
      })}
      <td>{row.totaleOre}</td>
    </tr>
        );
  });
};

export default RenderRows