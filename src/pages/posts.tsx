import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useGetPostsByPageQuery } from "../services/api";
import { DataTable } from "components/Table";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import { AddPostModal } from "components/Modals/AddPostModal";
import { EditPostModal } from "components/Modals/EditPostModal";

const columns = (refetchPage: () => void): GridColDef[] => [
  { field: "id", headerName: "Id", width: 70 },
  { field: "title", headerName: "Title", width: 680 },
  {
    field: "",
    renderCell: ({ row }) => (
      <EditPostModal editPostData={row} refetchPage={refetchPage} />
    ),
    width: 100,
  },
];

export const PostsPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, error, isLoading, refetch } = useGetPostsByPageQuery(page);
  return (
    <Box sx={{ position: "relative" }}>
      <>
        <AddPostModal refetchPage={refetch} />
        {error && error}
        <DataTable
          title="Posts"
          rows={data?.posts}
          columns={columns(refetch)}
          isLoading={isLoading}
          pageCount={data?.pageCount || 1}
        />
      </>
    </Box>
  );
};
