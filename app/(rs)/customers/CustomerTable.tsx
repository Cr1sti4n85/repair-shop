"use client";
import Link from "next/link";
import z from "zod";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TableOfContents } from "lucide-react";
import { selectCustomerSchema } from "@/zod-schemas/customer";

type Props = {
  data: z.infer<typeof selectCustomerSchema>[];
};

const CustomerTable = ({ data }: Props) => {
  const columnHelper =
    createColumnHelper<z.infer<typeof selectCustomerSchema>>();

  const ActionsCell = ({
    row,
  }: CellContext<z.infer<typeof selectCustomerSchema>, unknown>) => {
    return (
      <DropdownMenuGroup>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                prefetch={false}
                className="w-full"
                href={`/tickets/form?customerId=${row.original.id}`}
              >
                Nuevo ticket
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                prefetch={false}
                className="w-full"
                href={`/customers/form?customerId=${row.original.id}`}
              >
                Editar cliente
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DropdownMenuGroup>
    );
  };

  ActionsCell.displayName = "ActionsCell";

  const columns = [
    columnHelper.display({
      id: "actions",
      header: () => <TableOfContents />,
      cell: ActionsCell,
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
                <TableHead
                  key={header.id}
                  className={`bg-secondary ${header.id === "actions" ? "w-12" : ""}`}
                >
                  <div
                    className={`${header.id === "actions" ? "flex justify-center items-center" : ""}`}
                  >
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
