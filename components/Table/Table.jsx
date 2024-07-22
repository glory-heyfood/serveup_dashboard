import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import CustomSelect from "../CustomSelect";
import TableSelect from "./TableSelect";
import InStock from "../InStock";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "@/redux/features/stores/menuSlice";
import FadeLoad from "../loaders/FadeLoader";
import { bigSearchIcon, chevronLeftBlueIcon, chevronRightBlueIcon } from "@/SVGs";
import EmptyState from "../EmptyState";

export default function TableComponent({
  TableTab,
  column,
  row,
  setData,
  tab,
  empty,
  prev,
  next,
  disablePrev,
  disableNext,
  length,
  arr,
  start,
  loading,
  handleClick,
  type,
  end,
  total,
  sideBarDetails,
  setSelectedRow,
}) {
  const [page, setPage] = React.useState(1);
  const [selectedData, setSelectedData] = React.useState();
  const [clearSelectedData, setClearSelectedData] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [jumpToPage, setJumpToPage] = React.useState("");
  const dataLoading = useSelector((state) => state.menu.dataLoading);
  const dispatch = useDispatch();

  const columns = column;

  const rows = row;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleJumpToPage = (event) => {
    setPage(event.target.value);
  };

  React.useEffect(() => {
    const menu_id = JSON.parse(
      window.localStorage.getItem("serveup_store")
    )?.menu_id;
    if (type === "items") {
      dispatch(
        getAllItems({
          menu_id: menu_id,
          page: page,
          pageSize: rowsPerPage,
          sortString: sort,
        })
      );
    }
    // const dat = arr(page, rowsPerPage, tab);
    // console.log(page, rowsPerPage, tab);
    // setData(dat?.data);
  }, [page, rowsPerPage]);

  React.useEffect(() => {
    setSelectedData();
    console.log(selectedData);
  }, [clearSelectedData]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="flex items-start justify-between border border-transparent border-b-[#E6E6E6] w-full">
        <div className="w-full sm:w-fit">{TableTab}</div>
        {/* <div className="sm:flex items-center hidden   space-x-[12px]">
          <h3 className="tracking-[-0.24px] ">Showing&nbsp;</h3>
          <CustomSelect
            selectedValue={rowsPerPage}
            handleChange={handleChangeRowsPerPage}
            height="32px"
            options={[
              { value: 10, label: 10 },
              { value: 25, label: 25 },
              { value: 100, label: 100 },
            ]}
          />
          <h3 className="tracking-[-0.24px] w-full ">&nbsp; per page</h3>
        </div> */}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <FadeLoad />
        </div>
      ) : empty ? (
        <div className="w-full  h-full flex items-center justify-center">
          <EmptyState
            icon={bigSearchIcon}
            border={false}
            header="No result"
            text="Your search/filter did not match any results"
          />
        </div>
      ) : (
        <>
          <TableContainer sx={{ border: "none" }} className="scroll-hidden">
            <Table
              sx={{
                border: "none",
              }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => {
                  return (
                    <TableRow
                      role="checkbox"
                      hover
                      sx={{ cursor: "pointer" }}
                      tabIndex={-1}
                      key={row.code}
                      onClick={() => {						
                        handleClick(row.data);
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="mt-[1.5rem] flex items-center space-x-[0.5rem]">
            <h2 className="text-black text-[0.75rem] tracking-[-0.015rem] sodo400 ">
              {start} - {end} of {total}
            </h2>

            <div className="flex items-center space-x-[1.5rem]">
              <span
                className="cursor-pointer"
                onClick={disablePrev ? () => {} : prev}
              >
                {chevronLeftBlueIcon(disablePrev ? "#E6E6E6" : "#072A85")}
              </span>
              <span
                className="cursor-pointer"
                onClick={disableNext ? () => {} : next}
              >
                {chevronRightBlueIcon(disableNext ? "#E6E6E6" : "#072A85")}
              </span>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
}
