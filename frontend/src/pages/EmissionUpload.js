import React, { useEffect, useState } from "react";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/updateForm.css";

import { Box, Button, Modal, TextField } from "@mui/material";
import {
  getSingleEmissionApi,
  updateEmissionApi,
} from "../apicalls/emissionApi";

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
  customStyle,
  setRefresh,
}) => {
  const [emdata, setemdata] = useState({});
  const [id, setid] = useState("");

  useEffect(() => {
    if (id) {
      const getSingleWater = async () => {
        try {
          const waterdata = await getSingleEmissionApi(id);
          setemdata(waterdata.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSingleWater();
    }
  }, [id]);

  const handleChange = (e) => {
    setemdata({ ...emdata, [e.target.name]: e.target.value });
  };

  const handleChangeOrganization = (e) => {
    setemdata({
      ...emdata,
      organization: {
        ...emdata.organization,
        organization: e.target.value,
      },
    });
  };

  const handleUpdateEmission = async (e) => {
    e.preventDefault();
    try {
      await updateEmissionApi(id, emdata);
      console.log(emdata);
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
    setemdata({
      ...emdata,
      fyear: {
        ...emdata.fyear,
        fiscalyear: val.value,
      },
    });
  };
  const defaultOption = {
    label: emdata.fyear?.fiscalyear,
    value: emdata.fyear?.fiscalyear,
  };

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
                    <TableCell>S.No</TableCell>
                    <TableCell>Start_date</TableCell>
                    <TableCell>end_date</TableCell>
                    <TableCell>Description </TableCell>
                    <TableCell>Emission Units </TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Fiscal Year</TableCell>
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
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{val.start_date}</TableCell>
                        <TableCell>{val.end_date}</TableCell>
                        <TableCell>{val.description}</TableCell>
                        <TableCell>{val.emissions}</TableCell>
                        <TableCell>{val.type}</TableCell>
                        <TableCell>{val.fyear?.fiscalyear}</TableCell>
                        <TableCell>{val.scope}</TableCell>
                        <TableCell>{val.organization.organization}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDeleteEmission(val._id)}
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
                    </>
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
            <form action="post" onSubmit={handleUpdateEmission}>
              <div className="form-main">
                <div className="fields">
                  <label htmlFor="">Start_date</label>
                  <input
                    type="text"
                    placeholder="Enter your start data"
                    name="start_date"
                    value={emdata.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">End_date</label>
                  <input
                    type="text"
                    placeholder="Enter your end date"
                    name="end_date"
                    value={emdata.end_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    placeholder="Enter your description"
                    name="description"
                    value={emdata.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Emissions</label>
                  <input
                    type="text"
                    placeholder="Enter your units"
                    name="emissions"
                    onChange={handleChange}
                    value={emdata.emissions}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Type</label>
                  <input
                    type="text"
                    placeholder="Enter your type"
                    name="type"
                    value={emdata.type}
                    onChange={handleChange}
                  />
                </div>
                <div className="fiscal-select">
                  <label htmlFor="">Fiscal Year</label>
                  <Select
                    value={defaultOption}
                    onChange={handleChangeFiscal}
                    defaultValue={{
                      label: emdata.fyear?.fiscalyear,
                      value: emdata.fyear?.fiscalyear,
                    }}
                    options={options}
                    styles={customStyle}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Scope</label>
                  <input
                    type="text"
                    placeholder="Enter your scope"
                    name="scope"
                    value={emdata.scope}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Organization</label>
                  <input
                    type="text"
                    placeholder="Enter your scope"
                    name="organization"
                    value={emdata.organization?.organization}
                    onChange={handleChangeOrganization}
                  />
                </div>
              </div>
              <div className="form-footer">
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EmissionUpload;
