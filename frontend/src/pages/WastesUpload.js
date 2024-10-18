import React from "react";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const WastesUpload = ({
  selopt,
  handleChangeWastes,
  options,
  customStyles,
  handleChange3,
  handleDownload,
  handleSubmit3,
  wastedata,
  handleDeleteWaste,
  SelectedOption3,
}) => {
  return (
    <>
      {selopt === "Upload wastes Data" && (
        <>
          <div className="wastes-upload-cont">
            <Select
              value={SelectedOption3}
              onChange={handleChangeWastes}
              options={options}
              styles={customStyles}
            />
            <TextField type="file" accept=".csv" onChange={handleChange3} />

            <Button variant="contained" onClick={handleSubmit3}>
              UPLOAD
            </Button>

            <Button
              onClick={() =>
                handleDownload("/assets/sampleWastes.csv", "Wastes.csv")
              }
              variant="contained"
            >
              Download CSV
            </Button>
          </div>
          <TableContainer className="fyear-table" sx={{ paddingLeft: 2 }}>
            {wastedata && (
              <Table component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell>Start_date</TableCell>
                    <TableCell>End_date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wastedata.map((val, index) => (
                    <TableRow key={val._id}>
                      <TableCell>{val.start_date}</TableCell>
                      <TableCell>{val.end_date}</TableCell>
                      <TableCell>{val.category}</TableCell>
                      <TableCell>{val.quantity}</TableCell>
                      <TableCell>{val.type}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleDeleteWaste(val._id)}>
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                          <Link to={`/updateWastes/${val._id}`}>Update</Link>
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

export default WastesUpload;
