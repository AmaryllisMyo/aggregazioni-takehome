import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './App.css'
import { db } from "./assets/db"
import logo from "./assets/logo.png"
import { useDataAggregation } from './Logic/query.ts'
import type { AggregationResult } from './Logic/types.ts'
import type { WorkRecord } from './Logic/types.ts'


//qui rifattorizzo i dati della tabella per pulizia e modularità
type Record = typeof db.records[0];
const RecordRow: React.FC<{ record: Record}> = ({ record }) => (
  <tr>
      <td>{record.project.name}</td>
      <td>{record.employee.name}</td>
      <td>{new Date(record.date).toLocaleDateString()}</td>
      <td>{record.hours}</td>
  </tr>
);

// rifattorizzo qui header modulari in modo che cambino in base a filtri applicati
const renderHeaders = (campiAggregazione: string[] | null) => {
  if (!campiAggregazione) {
    return (
      <>
        <th scope="col">Project</th>
        <th scope="col">Employee</th>
        <th scope="col">Date</th>
        <th scope="col">Hours</th>
      </>
    );
  }

  return (
    <>
      {campiAggregazione.map((campo) => {
        if (campo === 'project') {
          return <th key="project" scope="col">Project</th>;
        } else if (campo === 'employee') {
          return <th key="employee" scope="col">Employee</th>;
        } else if (campo === 'date') {
          return <th key="date" scope="col">Date</th>;
        }
        return null;
      })}
      <th scope="col">Total Hours</th>
    </>
  );
};

// rifattorizzo qui rows modulari. si basano sul type WorkRecord che ho definito nel file types.ts
const renderRows = (
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
 
const App: React.FC = () => {
  const { filteredQuery, filterStatus, handleFilterChange} = useDataAggregation();

  return (
    <>
      <header className="top">
        <div className="container"><img src={logo} alt="Logo Apuliasoft" className='logoIMG'/></div>
      </header>
      <div className='card'>
        <h1 className='hMonth'>Monthly recap</h1>
        <div className='descriptionDropDown'>
        <h2 className='hRecap'>Team members and hours on each project</h2>
      {/* Qui è dropdown, ma sto valutando di metterlo con checkbox in modo da non avere combo preimpostate ma
      farle scegliere all'utente. forse più complicato (a livello di logica) */}
       <div className='dropDownContainer'>
       <select className = "dropDown" onChange={(e) => {
          const value = e.target.value;
          handleFilterChange(value === "none" ? null : value.split(","));
        }}>
          <option value="none">Unmerged</option>
          <option value="project">Merge by: Project</option>
          <option value="date">Merge by: Date</option>
          <option value="project,employee">Merge by: Project/Employee</option>
          <option value="employee,project">Merge by: Employee/Project</option>
          <option value="employee">Merge by: Employee</option>
          <option value="date,project">Merge by: Date/Project</option>
          <option value="date,employee">Merge by: Date/Employee</option>
          <option value="employee,date">Merge by: Employee/Date</option>
          <option value="project,date">Merge by: Project/Date</option>
        </select>
        </div> 
       </div>
        <div className='tableContainer'>
          <Table striped hover className='table'>
            <thead>
              <tr>
                {renderHeaders(filterStatus.campiAggregazione)}
              </tr>
            </thead>
            <tbody>
              {renderRows(
                filterStatus.campiAggregazione,
                db.records,
                filteredQuery.data as AggregationResult[]
              )}
            </tbody>
          </Table>
      </div>
      </div>
    </>
  );
}



export default App;
