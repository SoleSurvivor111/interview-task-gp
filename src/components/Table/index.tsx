import React, { ChangeEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid, GridColumns, GridRowParams } from "@mui/x-data-grid";
import { Box, Pagination } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Typography } from "@mui/material";
import { Post } from "types";

type DataTableProps = {
  title: string;
  rows: Array<Post>;
  columns: GridColumns<Object>;
  isLoading: boolean;
  pageCont: number;
};

export function DataTable({
  title,
  rows = [],
  columns = [],
  isLoading,
  pageCount,
}: DataTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({ page: "1" });
  }, [setSearchParams]);

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: `${page}` });
  };

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/${title.toLowerCase()}/${params.id}`, { replace: true });
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Typography variant="h1">{title}</Typography>
      <DataGrid
        sx={{ minWidth: 870, minHeight: 550 }}
        rows={rows}
        columns={columns}
        pageSize={20}
        hideFooterPagination
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={isLoading}
        onRowClick={handleRowClick}
      />
      <Pagination
        disabled={isLoading}
        page={+page}
        count={+pageCount}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </Box>
  );
}
