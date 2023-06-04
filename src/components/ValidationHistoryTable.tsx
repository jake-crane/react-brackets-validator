import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useMemo } from 'react';
import type { ValidationEntry } from '../types/ValidationEntry';
import FormattedRelativeTime from './FormattedRelativeTime';
import StatusCell from './StatusCell';
import TableComponent from './TableComponent';

const columnHelper = createColumnHelper<ValidationEntry>();

interface ComponentProps {
    validationHistory: ValidationEntry[];
    onViewText: (text: string) => void
}

/**
 * This component utilizes react-table for paging functionality.
 * react-table would also make it easy to add sorting and searching functionality should that be required.
 */
function ValidationHistoryTable({ validationHistory, onViewText: viewText }: ComponentProps): JSX.Element {

    const columns = useMemo(() => [
        columnHelper.accessor(
            'submitted',
            {
                header: 'Submitted',
                cell: ({ cell }) => <FormattedRelativeTime milliseconds={cell.getValue()} />
            }
        ),
        columnHelper.accessor(
            'text',
            {
                header: 'Text',
                cell: ({ cell }) => (
                    <div
                        style={{
                            maxWidth: '100px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {cell.getValue()}
                    </div>
                )
            }
        ),
        columnHelper.display(
            {
                id: 'view',
                header: 'View Full Text',
                cell: ({ row }) => (
                    <Button variant="contained" size="small" onClick={() => viewText(row.original.text)}>
                        View
                    </Button>
                )
            }
        ),
        columnHelper.accessor(
            'status',
            {
                header: 'Status',
                cell: ({ cell }) => <StatusCell status={cell.getValue()} />
            }
        )
    ], [viewText]);

    const table = useReactTable({
        columns,
        data: validationHistory,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <div>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }} tabIndex={0}>
                <TableComponent table={table} />
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                count={validationHistory.length}
                page={table.getState().pagination.pageIndex}
                onPageChange={(_, page) => table.setPageIndex(page)}
                rowsPerPage={table.getState().pagination.pageSize}
                onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
            />
        </div>
    );
}

export default ValidationHistoryTable;
