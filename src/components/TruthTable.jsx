function TruthTable({ columns, rows }) {
  return (
    <div className="truth-table-container">

      <table className="truth-table">

        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((value, valueIndex) => (
                <td key={valueIndex}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default TruthTable;