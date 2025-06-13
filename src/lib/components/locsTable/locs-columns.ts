import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet, renderComponent } from "$lib/components/shadcn/ui/data-table/index.js";
import DataTableEmailButton from "./LocsTable-Name-btn.svelte";
import { Checkbox } from "$lib/components/shadcn/ui/checkbox/index.js";
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Location = {
   Name: string;
   CreationDate: string;
   Region: string;
};
 
export const columns: ColumnDef<Location>[] = [
   {
      id: "select",
      header: ({ table }) =>
         renderComponent(Checkbox, {
         checked: table.getIsAllPageRowsSelected(),
         indeterminate:
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected(),
         onCheckedChange: (value: any) => table.toggleAllPageRowsSelected(!!value),
         "aria-label": "Select all",
         }),
      cell: ({ row }) =>
         renderComponent(Checkbox, {
         checked: row.getIsSelected(),
         onCheckedChange: (value: any) => row.toggleSelected(!!value),
         "aria-label": "Select row",
         }),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "Name",
      header: ({ column }) =>
         renderComponent(DataTableEmailButton, {
         onclick: column.getToggleSortingHandler(),
      }),
      cell: ({ getValue }) => {
         return getValue();
      }
      
    },
    {
      accessorKey: "Region",
      header: () => {
        const amountHeaderSnippet = createRawSnippet(() => ({
          render: () => `<div class="text-right">Region</div>`,
        }));
        return renderSnippet(amountHeaderSnippet, "");
      },
      cell: ({ getValue }) => {
         const region = getValue();
         return region ? region : "N/A";
      }
      
    },
    {
      accessorKey: "CreationDate",
      header: () => {
        const amountHeaderSnippet = createRawSnippet(() => ({
          render: () => `<div class="text-right">Creation Date</div>`,
        }));
        return renderSnippet(amountHeaderSnippet, "");
      },
      cell: ({ getValue }) => {
         return getValue();
      }
    },
   
];

export const demoRows = [
   {
       "Name": "demomns",
       "CreationDate": "20 Apr 2025, 11:52:40 pm",
       "Region": null
   },
   {
       "Name": "mns-delta-demo",
       "CreationDate": "11 Mar 2025, 05:04:31 pm",
       "Region": null
   },
   {
       "Name": "mns-hudi-demo",
       "CreationDate": "11 Mar 2025, 05:04:56 pm",
       "Region": null
   },
   {
       "Name": "mns-iceberg-copy-3",
       "CreationDate": "25 Mar 2025, 03:19:41 pm",
       "Region": null
   },
   {
       "Name": "mns-iceberg-demo",
       "CreationDate": "11 Mar 2025, 05:04:03 pm",
       "Region": null
   },
   {
       "Name": "mns-parquet-demo",
       "CreationDate": "26 Mar 2025, 06:48:38 pm",
       "Region": null
   },
   {
      "Name": "demomns",
      "CreationDate": "20 Apr 2025, 11:52:40 pm",
      "Region": null
  },
  {
      "Name": "mns-delta-demo",
      "CreationDate": "11 Mar 2025, 05:04:31 pm",
      "Region": null
  },
  {
      "Name": "mns-hudi-demo",
      "CreationDate": "11 Mar 2025, 05:04:56 pm",
      "Region": null
  },
  {
      "Name": "mns-iceberg-copy-3",
      "CreationDate": "25 Mar 2025, 03:19:41 pm",
      "Region": null
  },
  {
      "Name": "mns-iceberg-demo",
      "CreationDate": "11 Mar 2025, 05:04:03 pm",
      "Region": null
  },
  {
      "Name": "mns-parquet-demo",
      "CreationDate": "26 Mar 2025, 06:48:38 pm",
      "Region": null
  },
  {
   "Name": "demomns",
   "CreationDate": "20 Apr 2025, 11:52:40 pm",
   "Region": null
},
{
   "Name": "mns-delta-demo",
   "CreationDate": "11 Mar 2025, 05:04:31 pm",
   "Region": null
},
{
   "Name": "mns-hudi-demo",
   "CreationDate": "11 Mar 2025, 05:04:56 pm",
   "Region": null
},
{
   "Name": "mns-iceberg-copy-3",
   "CreationDate": "25 Mar 2025, 03:19:41 pm",
   "Region": null
},
{
   "Name": "mns-iceberg-demo",
   "CreationDate": "11 Mar 2025, 05:04:03 pm",
   "Region": null
},
{
   "Name": "mns-parquet-demo",
   "CreationDate": "26 Mar 2025, 06:48:38 pm",
   "Region": null
}
]
