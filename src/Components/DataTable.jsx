import React from 'react';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { Spinner, Button } from 'react-bootstrap';
import './DataTable.css';

const DataTable = ({ columns, data, loading, onAddProductClick }) => {
  const defaultColumn = React.useMemo(() => ({
    minWidth: 50,
    width: 150,
    maxWidth: 300,
  }), []);

  const customColumns = React.useMemo(() => columns.map(column => {
    if (column.Header === 'Name') {
      return {
        ...column,
        width: 300,
        minWidth: 200,
        maxWidth: 400,
      };
    }
    if (column.Header === 'Description') {
      return {
        ...column,
        width: 400,
        minWidth: 300,
        maxWidth: 600,
      };
    }
    return column;
  }), [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: customColumns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  );

  return (
    <div className="table-responsive p-3">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="mb-0">Product List</h3>
        <Button variant="primary" onClick={onAddProductClick}>
          Add New Product
        </Button>
      </div>
      <table
        {...getTableProps()}
        className="table table-hover table-striped table-bordered"
      >
        <thead className="thead-dark">
          {headerGroups.map(headerGroup => {
            const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={headerGroupKey} {...headerGroupProps}>
                {headerGroup.headers.map(column => {
                  const { key: columnKey, ...columnProps } = column.getHeaderProps();
                  return (
                    <th
                      key={columnKey}
                      {...columnProps}
                      className="text-center align-middle"
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        position: 'relative',
                        padding: '12px 8px',
                      }}
                    >
                      {column.render('Header')}
                      <div
                        {...column.getResizerProps()}
                        className="resizer"
                      />
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                <Spinner animation="border" role="status" />
              </td>
            </tr>
          ) : rows.length > 0 ? (
            rows.map(row => {
              prepareRow(row);
              const { key: rowKey, ...rowProps } = row.getRowProps();
              return (
                <tr key={rowKey} {...rowProps} className="align-middle">
                  {row.cells.map(cell => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                    return (
                      <td
                        key={cellKey}
                        {...cellProps}
                        className="align-middle"
                        style={{
                          width: cell.column.width,
                          minWidth: cell.column.minWidth,
                          maxWidth: cell.column.maxWidth,
                          verticalAlign: 'middle',
                          whiteSpace: 'normal',
                          overflowWrap: 'break-word',
                          padding: '12px 8px',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
