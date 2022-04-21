import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useGetUsersByPageQuery } from "../services/api";
import { DataTable } from "components/Table";
import { useSearchParams } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 220 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
];

export const UsersPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, error, isLoading } = useGetUsersByPageQuery(page);

  return (
    <div>
      {error && error}
      <DataTable
        title="Users"
        rows={data?.users}
        columns={columns}
        isLoading={isLoading}
        pageCount={data?.pageCount || 1}
        onRowClick
      />
    </div>
  );
};
