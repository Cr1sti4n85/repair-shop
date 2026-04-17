"use client";
import { selectCustomerSchema } from "@/zod-schemas/customer";
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
import { useRouter } from "next/navigation";
import z from "zod";

type Props = {
  data: z.infer<typeof selectCustomerSchema>[];
};

const CustomerTable = ({ data }: Props) => {
  const router = useRouter();
  const columnHelper =
    createColumnHelper<z.infer<typeof selectCustomerSchema>>();

  const columns = [
    columnHelper.accessor("firstName", {
      header: "Nombre",
    }),
    columnHelper.accessor("lastName", {
      header: "Apellido",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("phone", {
      header: "Teléfono",
    }),
    columnHelper.accessor("city", {
      header: "Ciudad",
    }),
    columnHelper.accessor("region", {
      header: "Región",
    }),
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
                router.push(`/customers/form?customerId=${row.original.id}`)
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

export default CustomerTable;
