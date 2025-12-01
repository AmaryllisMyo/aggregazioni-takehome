const RenderHeaders = (campiAggregazione: string[] | null) => {
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

export default RenderHeaders;