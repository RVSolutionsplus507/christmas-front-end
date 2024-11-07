import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ElveModal from "@/components/elves/ElveModal";
import DeletedTableElve from "@/components/elves/DeletedTableElve";
import { useElves, useAddElves } from "@/services/elvescrud/elvesapi";
import SantaChristmasSpinner from "@/components/global/spinner";

export default function ElvesTable() {
  const { data: elves, isLoading, isError } = useElves();
  const addElveMutation = useAddElves();
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deletedElves, setDeletedElves] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingElve, setEditingElve] = React.useState(null);

  React.useEffect(() => {
    if (elves) setData(elves);
  }, [elves]);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => {
        const formatted = Number(row.getValue("id"));
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "height",
      header: "Height",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("height")}</div>
      ),
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => {
        const formatted = Number(row.getValue("age"));
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const elve = row.original;
        return (
          <Button
            className="size-8"
            variant="ghost"
            onClick={() => editElve(elve)}
          >
            <span className="sr-only">Edit</span>
            <Pencil className="size-8" />
          </Button>
        );
      },
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const deleteRows = () => {
    const rowsToDelete = table.getFilteredSelectedRowModel().rows;
    const newData = data.filter(
      (row) =>
        !rowsToDelete.some((selectedRow) => selectedRow.original.id === row.id)
    );
    const newDeletedElves = [
      ...deletedElves,
      ...rowsToDelete.map((row) => row.original),
    ];
    setData(newData);
    setDeletedElves(newDeletedElves);
    setRowSelection({});
  };

  const restoreElve = (elve) => {
    setData([...data, elve]);
    setDeletedElves(
      deletedElves.filter((deletedElve) => deletedElve.id !== elve.id)
    );
  };

  const addNewElve = async (newElve) => {
    setData([...data, newElve]);
    await addElveMutation.mutateAsync(newElve);
  };

  const editElve = (elve) => {
    setEditingElve(elve);
    setIsModalOpen(true);
  };

  const updateElve = (elveUpdated) => {
    setData(
      data.map((elve) =>
        elve.id === editingElve.id ? { ...elve, ...elveUpdated } : elve
      )
    );
    setEditingElve(null);
  };

  if (isLoading)
    return (
      <div className="grid place-content-center place-items-center h-full">
        <SantaChristmasSpinner />
      </div>
    );
  if (isError) return <div>Error fetching elves</div>;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Elves Management</h1>
      <div className="w-full max-w-7xl">
        <div className="mb-4 flex justify-between">
          <Input
            placeholder="Filter emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              + New Elve
            </Button>
            <Button
              variant="destructive"
              onClick={deleteRows}
              disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            >
              Delete
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gradient-to-b from-red-500 to-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center font-bold text-zinc-800"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
        <ElveModal
          isOpen={isModalOpen}
          isClose={() => {
            setIsModalOpen(false);
            setEditingElve(null);
          }}
          onSubmit={editingElve ? updateElve : addNewElve}
          initialData={editingElve}
        />
        <h2 className="text-3xl font-bold text-center pb-4">Deleted Elves</h2>
        <DeletedTableElve deletedElves={deletedElves} onRestore={restoreElve} />
      </div>
    </div>
  );
}
