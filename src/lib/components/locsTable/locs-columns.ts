import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet, renderComponent } from "$lib/components/shadcn/ui/data-table/index.js";
import LocsTableNameBtn from "./LocsTable-Name-btn.svelte";
import { Checkbox } from "$lib/components/shadcn/ui/checkbox/index.js";

import { toReadableTime } from '$lib/common/time.ts';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Location = {
   Name: string;
   CreationDate: string;
   Region: string;
   Registered: boolean;
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
            // checked: row.getIsSelected(),
            checked: row.original.Registered || row.getIsSelected(),
            onCheckedChange: (value: any) => row.toggleSelected(!!value),
            disabled: row.original.Registered,
            "aria-label": "Select row",
         }),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "Name",
      header: ({ column }) =>
         renderComponent(LocsTableNameBtn, {
            onclick: column.getToggleSortingHandler(),
         }),
      cell: ({ getValue }) => {
         const cellSnip = createRawSnippet(() => ({
            render: () => `<div>${getValue()}</div>`,
         }));
         return renderSnippet(cellSnip, "");
      }

   },
   {
      accessorKey: "Region",
      header: () => {
         const headerSnip = createRawSnippet(() => ({
            render: () => `<div class="table-col-header">Region</div>`,
         }));
         return renderSnippet(headerSnip, "");
      },
      cell: ({ getValue }) => {
         const region = getValue();
         const cellSnip = createRawSnippet(() => ({
            render: () => `<div class="table-col-header">${region ? region : "N/A"}</div>`,
         }));
         return renderSnippet(cellSnip, "");
      }
   },
   {
      accessorKey: "CreationDate",
      header: () => {
         const headerSnip = createRawSnippet(() => ({
            render: () => `<div class="table-col-header">Creation Date</div>`,
         }));
         return renderSnippet(headerSnip, "");
      },
      cell: ({ getValue }) => {
         const cellSnip = createRawSnippet(() => ({
            render: () => `<div class="table-col-header">${toReadableTime(String(getValue()))}</div>`,
         }));
         return renderSnippet(cellSnip, "");
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
