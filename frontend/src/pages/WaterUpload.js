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

const WaterUpload = ({
  selopt,
  SelectedOption2,
  handleChangeWater,
  handleDeleteWater,
  options,
  customStyles,
  handleChange2,
  handleDownload,
  handleSubmit2,
  waterdata,
}) => {
  return (
    <>
      {selopt === "Upload water Data" && (
        <>
          <div className="water-upload-cont">
            <Select
              value={SelectedOption2}
              onChange={handleChangeWater}
              options={options}
              styles={customStyles}
            />
            <TextField type="file" onChange={handleChange2} />

            <Button variant="contained" onClick={handleSubmit2}>
              UPLOAD
            </Button>

            <Button
              onClick={() =>
                handleDownload("/assets/sampleWater.csv", "Water.csv")
              }
              variant="contained"
            >
              Download CSV
            </Button>
          </div>
          <TableContainer className="fyear-table" sx={{ paddingLeft: 2 }}>
            {waterdata && (
              <Table component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell>Start_date</TableCell>
                    <TableCell>End_date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell>Organization</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {waterdata.map((val, index) => (
                    <TableRow key={val._id}>
                      <TableCell>{val.start_date}</TableCell>
                      <TableCell>{val.end_date}</TableCell>
                      <TableCell>{val.status}</TableCell>
                      <TableCell>{val.type}</TableCell>
                      <TableCell>{val.units}</TableCell>
                      <TableCell>{val.organization.organization.trim()}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleDeleteWater(val._id)}>
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link to={`/updateWater/${val._id}`}>Update</Link>
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

export default WaterUpload;
