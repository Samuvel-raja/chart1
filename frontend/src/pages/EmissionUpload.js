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

const EmissionUpload = ({
  SelectedOption1,
  selopt,
  handleChangeEmission,
  options,
  customStyles,
  handleChange1,
  handleSubmit1,
  edata,
  handleDownload,
  handleDeleteEmission,
}) => {
  return (
    <>
      {selopt === "Upload Emissions Data" && (
        <>
          <div className="emission-upload-cont">
            <Select
              value={SelectedOption1}
              onChange={handleChangeEmission}
              options={options}
              styles={customStyles}
            />

            <TextField type="file" onChange={handleChange1} />
            <Button
              variant="contained"
              sx={{ height: "100px" }}
              onClick={handleSubmit1}
            >
              UPLOAD
            </Button>
            <Button
              onClick={() =>
                handleDownload("/assets/sample.csv", "Emission.csv")
              }
              variant="contained"
            >
              Download CSV
            </Button>
          </div>
          <TableContainer className="fyear-table" sx={{ paddingLeft: 2 }}>
            {edata && (
              <Table component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell>Start_date</TableCell>
                    <TableCell>end_date</TableCell>
                    <TableCell>Description </TableCell>
                    <TableCell>Emission Units </TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>SCope</TableCell>
                    <TableCell>Organization</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {edata.map((val, index) => (
                    <>
                      <TableRow key={val._id}>
                        <TableCell>{val.start_date}</TableCell>
                        <TableCell>{val.end_date}</TableCell>
                        <TableCell>{val.description}</TableCell>
                        <TableCell>{val.emissions}</TableCell>
                        <TableCell>{val.type}</TableCell>
                        <TableCell>{val.scope}</TableCell>
                        <TableCell>{val.organization.organization}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleDeleteEmission(val._id)}>
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Link to={`/updateEmission/${val._id}`}>Update</Link>
                        </TableCell>
                      </TableRow>
                    </>
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

export default EmissionUpload;
