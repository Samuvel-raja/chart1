import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { postEmissionApi } from "../apicalls/emissionApi";
import { postWaterApi } from "../apicalls/waterApi";
import Select from "react-select";
import { postWastesApi } from "../apicalls/wastesApi";
import "../styles/uploadPage.css";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { deleteYear, getAllYearsApi, postYearApi } from "../apicalls/yearAPi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUserDetails } from "../apicalls/userApi";

const Uploads = () => {
  const [yeardata, setyeardata] = useState();
  const [refresh, setRefresh] = useState(false);
  const [userOrganization, setUserOrganization] = useState();
  useEffect(() => {
    const getYearData = async (req, res) => {
      try {
        const getdata = await getAllYearsApi();

        setyeardata(getdata.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserData = async (req, res) => {
      try {
        const user = await getUserDetails();
        setUserOrganization(user.data.organization.organization);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
    getYearData();
  }, [refresh]);

  const options = [];

  if (yeardata) {
    yeardata.map((val) => {
      options.push({ label: val.fiscalyear, value: val.fiscalyear });
    });
  }

  const [data, setData] = useState([]);
  const [wdata, setwdata] = useState([]);
  const [wtdata, setwtdata] = useState([]);
  const [yearval, setyearval] = useState("");
  const [selopt, setselopt] = useState("Organization");
  // const [title, settitle] = useState("Organization");

  const [SelectedOption1, setSelectedOption1] = useState();
  const [SelectedOption2, setSelectedOption2] = useState();
  const [SelectedOption3, setSelectedOption3] = useState();

  const handleChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await postEmissionApi({ data, SelectedOption: SelectedOption1 });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  const handleChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setwdata(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  const handleChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setwtdata(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      await postWaterApi({ wdata, SelectedOption: SelectedOption2 });
    } catch (err) {
      console.log(err);
    }
    console.log(wdata);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      await postWastesApi({ wtdata, SelectedOption: SelectedOption3 });
    } catch (err) {
      console.log(err);
    }
    console.log(wtdata);
  };

  const handleChangeEmission = (val) => {
    setSelectedOption1(val);
  };
  const handleChangeWater = (val) => {
    setSelectedOption2(val);
  };
  const handleChangeWastes = (val) => {
    setSelectedOption3(val);
  };

  const handleTextChange = async (e) => {
    setyearval(e.target.value);
  };
  const handleChange = (e, val) => {
    setselopt(val);
  };
  const handleYearSubmit = async (e) => {
    try {
      await postYearApi({ yearval });
      setRefresh((prev) => !prev);
    } catch (err) {
      return console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteYear(id);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="uploads-main-cont">
        <div className="uploads-sidebar">
          <Box>
            <Tabs
              value={selopt}
              onChange={handleChange}
              TabIndicatorProps={{ sx: { display: "none" } }}
              orientation="vertical"
              sx={{
                "& button": { margin: 1 },
                "& button:hover": {
                  backgroundColor: "rgba(225, 221, 251, 0.3)",
                  borderRadius: 3,
                },
                "& button.Mui-selected": {
                  color: "rgb(52, 25, 218)",
                  backgroundColor: "rgba(225, 221, 251, 0.3)",
                  borderRadius: 3,
                },
              }}
            >
              <Tab label="Organization" value="Organization" />
              <Tab label="Emissions" value="Upload Emissions Data" />
              <Tab label="Water" value="Upload water Data" />
              <Tab label="Wastes" value="Upload wastes Data" />
            </Tabs>
          </Box>
        </div>

        <div className="uploads-cont">
          {selopt === "Organization" && (
            <>
              <div className="add-year-container">
                <div className="organization-banner">
                  <Typography variant="h4" sx={{  color: "rgb(52, 25, 218)"}}>Organization: </Typography>
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

              <TableContainer className="fyear-table"sx={{paddingLeft:2}
              }>
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
          {selopt === "Upload Emissions Data" && (
            <div className="emission-upload-cont">
              <Select
                value={SelectedOption1}
                onChange={handleChangeEmission}
                options={options}
              />
              <TextField type="file" accept=".csv" onChange={handleChange1} />
              <Button variant="contained" onClick={handleSubmit1}>
                UPLOAD
              </Button>
            </div>
          )}
          {selopt === "Upload water Data" && (
            <div className="water-upload-cont">
              <Select
                value={SelectedOption2}
                onChange={handleChangeWater}
                options={options}
              />
              <TextField type="file" accept=".csv" onChange={handleChange2} />
              <Button variant="contained" onClick={handleSubmit2}>
                UPLOAD
              </Button>
            </div>
          )}
          {selopt === "Upload wastes Data" && (
            <div className="wastes-upload-cont">
              <Select
                value={SelectedOption3}
                onChange={handleChangeWastes}
                options={options}
              />
              <TextField type="file" accept=".csv" onChange={handleChange3} />
              <Button variant="contained" onClick={handleSubmit3}>
                UPLOAD
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Uploads;
