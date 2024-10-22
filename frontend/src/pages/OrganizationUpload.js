import React from "react";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrganizationUpload = ({
  selopt,
  handleDelete,
  yeardata,
  userOrganization,
  handleTextChange,
  handleYearSubmit,
}) => {
  return (
    <>
      {selopt === "Organization" && (
        <>
          <div className="add-year-container">
            <div className="organization-banner">
              <Typography variant="h4" sx={{ color: "rgb(52, 25, 218)" }}>
                Organization:
              </Typography>
              <Typography variant="h4"> {userOrganization}</Typography>
            </div>
            <div className="add-year-head">
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(52, 25, 218);",
                }}
              >
                Fiscal Year:
              </Typography>
              <div className="add-year-content">
                <TextField onChange={handleTextChange} />
                <Button variant="contained" onClick={handleYearSubmit}>
                  Add Year
                </Button>
              </div>
            </div>
          </div>

          <TableContainer className="fyear-table" sx={{ paddingLeft: 2 }}>
            {yeardata && (
              <Table component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Fiscal Year</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {yeardata.map((val, index) => (
                    <TableRow key={val._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{val.fiscalyear}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleDelete(val._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </>
      )}
    </>
  );
};

export default OrganizationUpload;
