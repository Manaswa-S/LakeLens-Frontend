import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet, renderComponent } from "$lib/components/shadcn/ui/data-table/index.js";
import LocsTableNameBtn from "./Metadata-Table-Property-btn.svelte";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Location = {
   Property: string;
   Value: string;
};

export const columns: ColumnDef<Location>[] = [
   {
      accessorKey: "Property",
      header: () => {
         const headerSnip = createRawSnippet(() => ({
            render: () => `<div class="table-col-header">Property</div>`,
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
      accessorKey: "Value",
      header: () => {
         const headerSnip = createRawSnippet(() => ({
            render: () => `<div class="table-col-header">Value</div>`,
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
   }
];



export const demoRows: Location[] = [
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
   {
      Property: "demomns",
      Value: "abc"
   },
]