function ComparisonTable({ columns, rows }) {
  return (
    <div className="comparison-table-container">

      <table className="comparison-table">

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

export default ComparisonTable;