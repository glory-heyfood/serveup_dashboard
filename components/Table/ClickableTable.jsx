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
import { sendCampaignData } from "@/data";
import ClickableTableSideBar from "./ClickableTableSideBar";
import { useSelector } from "react-redux";
import {
  bigSearchIcon,
  chevronLeftBlueIcon,
  chevronRightBlueIcon,
} from "@/SVGs";
import EmptyState from "../EmptyState";

export default function ClickableTableComponent({
  TableTab,
  column,
  row,
  setData,
  tab,
  empty,
  prev,
  next,
  shadeStatus,
  disablePrev,
  disableNext,
  length,
  arr,
  start,
  end,
  total,
  sideBarDetails,
  setSelectedRow,
}) {
  const [page, setPage] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [jumpToPage, setJumpToPage] = React.useState("");
  const orderHistory = useSelector((state) => state.order.orderHistory);

  const columns = column;

  const rows = row;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleJumpToPage = (event) => {
    setPage(event.target.value - 1);
  };

  const hanldeClick = (row) => {
    setShow(true);
    setSelectedRow(row.data);
  };

  console.log(row, "oorw");

  // React.useEffect(() => {
  //   const dat = arr(page, rowsPerPage, tab);
  //   console.log(page, rowsPerPage, tab);
  //   setData(dat?.data);
  // }, [page, rowsPerPage]);

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {TableTab && (
          <div className="flex items-start justify-between border border-transparent border-b-[#E6E6E6] w-full">
            <div className="w-full sm:w-fit">{TableTab}</div>
          </div>
        )}
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
                      hanldeClick(row);
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : shadeStatus ? (
                            <div
                              className={` py-[0.2rem] px-[0.625rem] rounded-[1.25rem] text-center w-fit  ${
                                `${value}`.toLowerCase() === "sent"
                                  ? "bg-[#06AE681A]"
                                  : `${value}`.toLowerCase() === "scheduled"
                                  ? "bg-[#F564121A]"
                                  : `${value}`.toLowerCase() === "draft"
                                  ? "bg-[#F0F0F0]"
                                  : ""
                              } `}
                            >
                              <h2
                                className={`  ${
                                  `${value}`.toLowerCase() === "sent"
                                    ? "text-[#06AE68]"
                                    : `${value}`.toLowerCase() === "scheduled"
                                    ? "text-[#F56412]"
                                    : `${value}`.toLowerCase() === "draft"
                                    ? "text-[#000]"
                                    : ""
                                } `}
                              >
                                {value}
                              </h2>
                            </div>
                          ) : (
                            value
                          )}
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

        {/* <div className="flex flex-col space-y-[24px] sm:space-y-0 sm:flex-row sm:items-center justify-between mt-[24px] ">
          <div className="flex items-center sm:justify-center space-x-[4px]">
            {Array.from(
              { length: Math.ceil(length / rowsPerPage) },
              (_, index) => {
                if (
                  index < 5 ||
                  index === Math.ceil(length / rowsPerPage) - 1
                ) {
                  const currentPage = index + 1;
                  return (
                    <div
                      key={currentPage}
                      className={`${
                        page === index ? "bg-[#F2F4F9]" : "bg-transparent"
                      } w-[24px] p-[4px] rounded-[4px] cursor-pointer flex items-center justify-center hover:bg-[#F2F4F9]`}
                      onClick={() => setPage(index)}
                    >
                      <h3 className="tracking-[-0.24px]">{currentPage}</h3>
                    </div>
                  );
                } else if (index === 5) {
                  return (
                    <Box key="ellipsis" mx={1}>
                      ...
                    </Box>
                  );
                }
                return null;
              }
            )}
          </div>

          <TableSelect
            page={page}
            handleJumpToPage={handleJumpToPage}
            rows={length}
            rowsPerPage={rowsPerPage}
          />
        </div> */}
      </Paper>

      {show && (
        <ClickableTableSideBar
          handleClose={() => {
            setShow(false);
          }}
          sideBarDetails={sideBarDetails}
        />
      )}
    </div>
  );
}
