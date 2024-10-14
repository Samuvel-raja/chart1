import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { postEmissionApi } from "../apicalls/emissionApi";
import { postWaterApi } from "../apicalls/waterApi";
import Select from "react-select";
import { postWastesApi } from "../apicalls/wastesApi";
import "../styles/uploadPage.css";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { getAllYearsApi, postYearApi } from "../apicalls/yearAPi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Uploads = () => {
  const [yeardata, setyeardata] = useState();
  useEffect(() => {
    const getYearData = async (req, res) => {
      try {
        const getdata = await getAllYearsApi();
        setyeardata(getdata);
      } catch (err) {
        console.log(err);
      }
    };
    getYearData();
  }, [yeardata]);

  useEffect(() => {
    console.log(yeardata);
  }, []);
  const options = [
    { label: "F 22-23", value: "F 22-23" },
    { label: "F 23-24", value: "F 23-24" },
    { label: "F 24-25", value: "F 24-25" },
  ];
  const [data, setData] = useState([]);
  const [wdata, setwdata] = useState([]);
  const [wtdata, setwtdata] = useState([]);
  const [yearval, setyearval] = useState("");
  const [selopt, setselopt] = useState("emissions");
  const [title, settitle] = useState("Upload Emissions Data");

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
    settitle(val);
  };
  const handleYearSubmit = async (e) => {
    try {
      await postYearApi({ yearval });
    } catch (err) {
      return console.log(err);
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
              <Tab label="Emissions" value="emissions" />
              <Tab label="Water" value="water" />
              <Tab label="Wastes" value="wastes" />
              <Tab label="Organization" value="organization" />
            </Tabs>
          </Box>
        </div>
        <div className="uploads-cont">
          <Typography variant="h4">{title}</Typography>
          {selopt === "organization" && (
            <>
              <div className="add-year-cont">
                <TextField onChange={handleTextChange} />
                <Button variant="contained" onClick={handleYearSubmit}>
                  Add Year
                </Button>
              </div>

              <TableContainer className="fyear-table" sx={{padding:10}}>
                {yeardata && yeardata.data && (
                  <Table component={Paper}>
                    <TableHead>
                      <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Fiscal Year</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {yeardata.data.map((val, index) => (
                        <TableRow key={val._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{val.fiscalyear}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </>
          )}
          {selopt === "emissions" && (
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
          {selopt === "water" && (
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
          {selopt === "wastes" && (
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
