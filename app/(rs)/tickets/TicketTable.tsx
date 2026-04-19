"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
import { useRouter } from "next/navigation";
import { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults";

type Props = {
  data: TicketSearchResultsType;
};

type RowType = TicketSearchResultsType[0];

const TicketTable = ({ data }: Props) => {
  const router = useRouter();
  const columnHelper = createColumnHelper<RowType>();

  const columns = [
    columnHelper.accessor("ticketDate", {
      header: "Fecha",
      cell: ({ getValue }) =>
        new Date(getValue()).toLocaleDateString("es-CL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("title", {
      header: "Título",
    }),
    columnHelper.accessor("tech", {
      header: "Técnico",
    }),
    columnHelper.accessor("firstName", {
      header: "Nombre",
    }),
    columnHelper.accessor("lastName", {
      header: "Apellido",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor(
      (row) => {
        return row.completed ? "COMPLETADO" : "ABIERTO";
      },
      {
        header: "Estado",
        cell: ({ getValue }) => {
          const value = getValue();
          console.log({ value });
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
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="bg-secondary">
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
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
  );
};

export default TicketTable;
