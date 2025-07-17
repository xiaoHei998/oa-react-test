import { DataTable } from "@/components/data-table";
import data from "../data.json";

export default function TestPage3() {
  return (
    <div>
      <DataTable data={data} />
    </div>
  );
}
