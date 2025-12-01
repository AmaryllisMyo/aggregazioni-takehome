import { db } from "../../../server/assets/db"

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

export default RecordRow