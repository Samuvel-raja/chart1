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
import { Link } from "react-router-dom";
import { getSingleWasteApi, updateWasteApi } from "../apicalls/wastesApi";
import { updateWaterApi } from "../apicalls/waterApi";

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
  setRefresh,
  refresh,
}) => {
  const [wsdata, setwsdata] = useState({});
  const [id, setid] = useState("");

  useEffect(() => {
    if (id) {
      const getSingleWater = async () => {
        try {
          const waterdata = await getSingleWasteApi(id);
          setwsdata(waterdata.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSingleWater();
    }
  }, [id]);

  const handleChange = (e) => {
    setwsdata({ ...wsdata, [e.target.name]: e.target.value });
  };
  const handleUpdateWaste = async (e) => {
    e.preventDefault();
    try {
      await updateWasteApi(id, wsdata);
    } catch (err) {
      console.log(err);
    }

    handleClose();
    setRefresh((prev) => !prev);
  };

  const [open, setOpen] = useState(false);
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
    height:700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p:5
  };

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
                        <Button onClick={() => handleDeleteWaste(val._id)} variant="contained">
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpen(val._id)} variant="contained">
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
            <form action="post" onSubmit={handleUpdateWaste}>
              <div className="form-main">
                <div className="fields">
                  <label htmlFor="">Start_date</label>
                  <input
                    type="text"
                    placeholder="Enter your start data"
                    name="start_date"
                    value={wsdata.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">End_date</label>
                  <input
                    type="text"
                    placeholder="Enter your end date"
                    name="end_date"
                    value={wsdata.end_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="fields">
                  <label htmlFor="">Quantity</label>
                  <input
                    type="text"
                    placeholder="Enter your units"
                    name="quantity"
                    onChange={handleChange}
                    value={wsdata.quantity}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Type</label>
                  <input
                    type="text"
                    placeholder="Enter your type"
                    name="type"
                    value={wsdata.type}
                    onChange={handleChange}
                  />
                </div>
                <div className="fields">
                  <label htmlFor="">Scope</label>
                  <input
                    type="text"
                    placeholder="Enter your scope"
                    name="category"
                    value={wsdata.category}
                    onChange={handleChange}
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

export default WastesUpload;
