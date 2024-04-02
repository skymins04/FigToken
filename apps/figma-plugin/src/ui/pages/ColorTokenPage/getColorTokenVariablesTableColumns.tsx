import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import { Button, CheckBox } from "@ui/components";
import { copyToClipboard } from "@ui/utils";

const handleCopyValueToClipboard = (value: string) => () =>
  copyToClipboard(value)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Copy failed."));

export const getColorTokenVariablesTableColumns = (
  modes: {
    modeId: string;
    name: string;
  }[]
) => {
  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <CheckBox
            checked={table.getIsAllRowsSelected()}
            onClick={() => table.toggleAllRowsSelected()}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <CheckBox
            checked={row.getIsSelected()}
            onClick={() => row.toggleSelected()}
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => row.getValue("type"),
    },
  ];
  modes.forEach((mode) => {
    columns.push({
      accessorKey: mode.modeId,
      header: mode.name,
      cell: ({ row }) => {
        const value: string = row.getValue(mode.modeId);
        return (
          <button
            className="group flex justify-between items-center gap-2 cursor-pointer w-full"
            onClick={handleCopyValueToClipboard(value)}
          >
            <span className="flex justify-start items-center gap-2">
              {row.getValue("type") === "COLOR" && (
                <div
                  className="w-3 h-3"
                  style={{ backgroundColor: value }}
                ></div>
              )}
              {value}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="!w-6 !h-6 text-primary opacity-0 group-hover:opacity-100"
            >
              <FontAwesomeIcon icon={faCopy} />
            </Button>
          </button>
        );
      },
    });
  });

  return columns;
};
