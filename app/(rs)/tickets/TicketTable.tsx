"use client";
import { useState, useMemo, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePolling } from "@/hooks/usePolling";
import { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults";
import { Button } from "@/components/ui/button";
import Filter from "@/components/react-table/Filter";

type Props = {
  data: TicketSearchResultsType;
};

type RowType = TicketSearchResultsType[0];

const TicketTable = ({ data }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  usePolling(60000, searchParams.get("searchText"));

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) - 1 : 0;
  }, [searchParams]);

  const columnWidths = {
    completed: 150,
    ticketDate: 150,
    title: 250,
    tech: 225,
    email: 225,
  };

  const columnHelper = createColumnHelper<RowType>();

  const columns = [
    columnHelper.accessor("ticketDate", {
      size: columnWidths.ticketDate,
      header: "Fecha",
      cell: ({ getValue }) =>
        new Date(getValue()).toLocaleDateString("es-CL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("title", {
      size: columnWidths.title,
      header: "Título",
    }),
    columnHelper.accessor("tech", {
      size: columnWidths.tech,
      header: "Técnico",
    }),
    columnHelper.accessor("firstName", {
      header: "Nombre",
    }),
    columnHelper.accessor("lastName", {
      header: "Apellido",
    }),
    columnHelper.accessor("email", {
      size: columnWidths.email,
      header: "Email",
    }),
    columnHelper.accessor(
      (row) => {
        return row.completed ? "COMPLETADO" : "ABIERTO";
      },
      {
        size: columnWidths.completed,
        header: "Estado",
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <div className="grid place-content-center">
              {value === "ABIERTO" ? (
                <CircleXIcon className="opacity-25" />
              ) : (
                <CircleCheckIcon className="text-green-600" />
              )}
            </div>
          );
        },
      },
    ),
  ];
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    if (pageCount <= currentPageIndex && currentPageIndex > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [table.getState().columnFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-secondary p-1"
                    style={{ width: header.getSize() }}
                  >
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter
                          column={header.column}
                          filteredRows={table
                            .getFilteredRowModel()
                            .rows.map((row) => row.getValue(header.column.id))}
                        />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                onClick={() =>
                  router.push(`/tickets/form?ticketId=${row.original.id}`)
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center gap-1 flex-wrap">
        <div>
          <p className="font-bold whitespace-nowrap">
            {`Página ${table.getState().pagination.pageIndex + 1} de ${Math.max(1, table.getPageCount())}`}
            &nbsp;&nbsp;
            {`[${table.getFilteredRowModel().rows.length} resultado(s)]`}
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <div className="flex flex-row gap-1">
            <Button variant="outline" onClick={() => router.refresh()}>
              Actualizar tabla
            </Button>
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
            >
              Limpiar filtros
            </Button>
          </div>
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex - 1;
                table.setPageIndex(newIndex);
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", (newIndex + 1).toString());
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex + 1;
                table.setPageIndex(newIndex);
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", (newIndex + 1).toString());
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
