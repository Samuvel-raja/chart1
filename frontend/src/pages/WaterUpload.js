import React, { useEffect, useState } from "react";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleWaterApi, updateWaterApi } from "../apicalls/waterApi";

const WaterUpload = ({
  selopt,
  SelectedOption2,
  handleChangeWater,
  handleDeleteWater,
  options,
  handleChange2,
  handleDownload,
  handleSubmit2,
  waterdata,
  customStyle,
  customStyles,
  setRefresh,
}) => {
  const [wdata, setwdata] = useState({});
  const [id, setid] = useState("");

  useEffect(() => {
    if (id) {
      const getSingleWater = async () => {
        try {
          const waterdata = await getSingleWaterApi(id);
          setwdata(waterdata.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSingleWater();
    }
  }, [id]);

  const handleChange = (e) => {
    setwdata({ ...wdata, [e.target.name]: e.target.value });
  };
  const handleUpdateWater = async (e) => {
    e.preventDefault();
    try {
      await updateWaterApi(id, wdata);
    } catch (err) {
      console.log(err);
    }

    handleClose();
    setRefresh((prev) => !prev);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setid(id);
    setOpen(true);
  };

  const handleChangeOrganization = (val) => {
    setwdata({
      ...wdata,
      organization: {
        ...wdata.organization,
        organization: val.value,
      },
    });
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 5,
  };
  const handleChangeFiscal = (val) => {
    setwdata({
      ...wdata,
      fyear: {
        ...wdata.fyear,
        fiscalyear: val.value,
      },
    });
  };
  const defaultOption = {
    label: wdata.fyear?.fiscalyear,
    value: wdata.fyear?.fiscalyear,
  };
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
                    <TableCell>S.NO</TableCell>
                    <TableCell>Start_date</TableCell>
                    <TableCell>End_date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>FiscalYear</TableCell>
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
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{val.start_date}</TableCell>
                      <TableCell>{val.end_date}</TableCell>
                      <TableCell>{val.status}</TableCell>
                      <TableCell>{val?.fyear?.fiscalyear}</TableCell>
                      <TableCell>{val.type}</TableCell>
                      <TableCell>{val.units}</TableCell>
                      <TableCell>{val.organization.organization}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteWater(val._id)}
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleOpen(val._id)}
                        >
                          Update
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="update-container">
            <form action="post" onSubmit={handleUpdateWater}>
              <div className="form-main">
                <div className="fields">
                  <label htmlFor="">Start_date</label>
                  <input
                    type="text"
                    placeholder="Enter your start data"
                    name="start_date"
                    value={wdata.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">End_date</label>
                  <input
                    type="text"
                    placeholder="Enter your end date"
                    name="end_date"
                    value={wdata.end_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="fields">
                  <label htmlFor="">Units</label>
                  <input
                    type="text"
                    placeholder="Enter your units"
                    name="units"
                    onChange={handleChange}
                    value={wdata.units}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Type</label>
                  <input
                    type="text"
                    placeholder="Enter your type"
                    name="type"
                    value={wdata.type}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Status</label>
                  <input
                    type="text"
                    placeholder="Enter your scope"
                    name="status"
                    value={wdata.status}
                    onChange={handleChange}
                  />
                </div>
                <div className="fiscal-select">
                  <label htmlFor="">Fiscal Year</label>

                  <Select
                    value={defaultOption}
                    onChange={handleChangeFiscal}
                    options={options}
                    styles={customStyle}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Organization</label>
                  <input
                    type="text"
                    placeholder="Enter your scope"
                    name="organization"
                    value={wdata.organization?.organization}
                    onChange={handleChangeOrganization}
                  />
                </div>

                <div className="form-footer">
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default WaterUpload;
