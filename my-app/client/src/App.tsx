import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './App.css'
import logo from "./assets/logo.png"
import { useDataAggregation } from './Logic/query.ts'
import RenderHeaders from "./components/renderHeaders.tsx"
import RenderRows, {type RenderRowProps} from './components/renderRows.tsx';


const App: React.FC = () => {
  const { dataSource, filterStatus, handleFilterChange, } = useDataAggregation();

  return (
    <>
      <header className="top">
        <div className="container"><img src={logo} alt="Logo Apuliasoft" className='logoIMG'/></div>
      </header>
      <div className='card'>
        <h1 className='hMonth'>Monthly recap</h1>
        <div className='descriptionDropDown'>
        <h2>Team members and hours on each project</h2>
      {/* Qui è dropdown, nei mockup ho anche di metterlo con checkbox in modo da non avere combo preimpostate ma
      farle scegliere all'utente. forse più complicato (a livello di logica) */}
       <div className='dropDownContainer'>
       <select onChange={(e) => {
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
                {RenderHeaders(filterStatus.campiAggregazione)}
              </tr>
            </thead>
            <tbody>
              {RenderRows({
                  campiAggregazione: filterStatus.campiAggregazione,
                  dataSource
              } as RenderRowProps)}
            </tbody>
          </Table>
      </div>
      </div>
    </>
  );
}



export default App;