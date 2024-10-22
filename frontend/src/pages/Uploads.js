import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  deleteEmissionApi,
  getEmissionApi,
  postEmissionApi,
} from "../apicalls/emissionApi";
import {
  deleteWaterApi,
  getAllWatersApi,
  postWaterApi,
} from "../apicalls/waterApi";
import {
  deleteWasteApi,
  getAllWastesApi,
  postWastesApi,
} from "../apicalls/wastesApi";
import "../styles/uploadPage.css";
import { Box, Tab, Tabs } from "@mui/material";
import { deleteYear, getAllYearsApi, postYearApi } from "../apicalls/yearAPi";

import { getUserDetails } from "../apicalls/userApi";
import * as XLSX from "xlsx";
import OrganizationUpload from "./OrganizationUpload";
import EmissionUpload from "./EmissionUpload";
import WaterUpload from "./WaterUpload";
import WastesUpload from "./WastesUpload";

const Uploads = () => {
  const [yeardata, setyeardata] = useState();
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [wdata, setwdata] = useState([]);
  const [wtdata, setwtdata] = useState([]);
  const [yearval, setyearval] = useState("");
  const [selopt, setselopt] = useState("Organization");
  const [wastedata, setwastedata] = useState();
  const [waterdata, setwaterdata] = useState([]);
  const [edata, setedata] = useState([]);
  const [SelectedOption1, setSelectedOption1] = useState();
  const [SelectedOption2, setSelectedOption2] = useState();
  const [SelectedOption3, setSelectedOption3] = useState();
  const [typeofdata, settypeofdata] = useState("");
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

  useEffect(() => {
    try {
      const getWaterData = async () => {
        const data = await getAllWatersApi();
        setwaterdata(data.data.getallWaters);
      };
      getWaterData();
    } catch (err) {
      console.log(err);
    }
    try {
      const getWastesData = async () => {
        const data = await getAllWastesApi();
        setwastedata(data.data);
      };
      getWastesData();
    } catch (err) {
      console.log(err);
    }
    const getAllEmissions = async () => {
      try {
        const emissionData = await getEmissionApi();
        setedata(emissionData.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllEmissions();
  }, [refresh]);

  const options = [];

  if (yeardata) {
    yeardata.map((val) => {
      options.push({ label: val.fiscalyear, value: val.fiscalyear });
    });
  }

  const handleChange1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension == "xlsx") {
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const processedData = jsonData.map((row) => {
          return Object.keys(row).reduce((acc, key) => {
            const value = row[key];
            if (
              typeof value === "number" &&
              key.toLowerCase().includes("date")
            ) {
              acc[key] = excelDateToString(value);
            } else {
              acc[key] = value;
            }
            return acc;
          }, {});
        });

        setData(processedData);
        settypeofdata("excell");
      };

      reader.readAsBinaryString(file);
    } else if (fileExtension == "csv") {
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
      settypeofdata("csv");
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await postEmissionApi({
        data,
        SelectedOption: SelectedOption1,
        typeofdata: typeofdata,
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  const handleChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension == "xlsx") {
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const processedData = jsonData.map((row) => {
          return Object.keys(row).reduce((acc, key) => {
            const value = row[key];
            if (
              typeof value === "number" &&
              key.toLowerCase().includes("date")
            ) {
              acc[key] = excelDateToString(value);
            } else {
              acc[key] = value;
            }
            return acc;
          }, {});
        });

        setwdata(processedData);
        settypeofdata("excell");
      };

      reader.readAsBinaryString(file);
    } else if (fileExtension == "csv") {
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
      settypeofdata("csv");
    }
  };

  const handleChange3 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension == "xlsx") {
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const processedData = jsonData.map((row) => {
          return Object.keys(row).reduce((acc, key) => {
            const value = row[key];
            if (
              typeof value === "number" &&
              key.toLowerCase().includes("date")
            ) {
              acc[key] = excelDateToString(value);
            } else {
              acc[key] = value;
            }
            return acc;
          }, {});
        });

        setwtdata(processedData);
        settypeofdata("excell");
      };

      reader.readAsBinaryString(file);
    } else if (fileExtension == "csv") {
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
      settypeofdata("csv");
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      await postWaterApi({
        wdata,
        typeofdata,
        SelectedOption: SelectedOption2,
      });
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    console.log(wdata);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      await postWastesApi({
        wtdata,
        typeofdata,
        SelectedOption: SelectedOption3,
      });
      setRefresh((prev) => !prev);
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
  const handleDeleteEmission = async (id) => {
    try {
      await deleteEmissionApi(id);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteWater = async (id) => {
    try {
      await deleteWaterApi(id);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteWaste = async (id) => {
    try {
      await deleteWasteApi(id);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 300,
      height: 55,
    }),
  };
  const handleDownload = (filepath, filename) => {
    const link = document.createElement("a");
    link.href = filepath;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const excelDateToString = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const jsDate = new Date(
      excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000
    );
    return jsDate.toISOString().split("T")[0];
  };
  const customStyle = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      height: "20%",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "2%",
      display: "flex",
      alignItems: "center",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "2%",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
    }),
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
          <OrganizationUpload
            selopt={selopt}
            handleDelete={handleDelete}
            yeardata={yeardata}
            userOrganization={userOrganization}
            handleTextChange={handleTextChange}
            handleYearSubmit={handleYearSubmit}
            refresh={refresh}
            setRefresh={setRefresh}
            customStyle={customStyle}
          />
          <EmissionUpload
            selopt={selopt}
            SelectedOption1={SelectedOption1}
            handleChangeEmission={handleChangeEmission}
            options={options}
            customStyles={customStyles}
            handleChange1={handleChange1}
            handleSubmit1={handleSubmit1}
            edata={edata}
            handleDownload={handleDownload}
            handleDeleteEmission={handleDeleteEmission}
            refresh={refresh}
            setRefresh={setRefresh}
            customStyle={customStyle}
          />

          <WaterUpload
            selopt={selopt}
            SelectedOption2={SelectedOption2}
            handleChangeWater={handleChangeWater}
            options={options}
            customStyles={customStyles}
            handleChange2={handleChange2}
            handleDownload={handleDownload}
            handleSubmit2={handleSubmit2}
            waterdata={waterdata}
            handleDeleteWater={handleDeleteWater}
            refresh={refresh}
            setRefresh={setRefresh}
            customStyle={customStyle}
          />

          <WastesUpload
            selopt={selopt}
            SelectedOption3={SelectedOption3}
            handleChangeWastes={handleChangeWastes}
            options={options}
            customStyles={customStyles}
            handleChange3={handleChange3}
            handleDownload={handleDownload}
            handleSubmit3={handleSubmit3}
            wastedata={wastedata}
            handleDeleteWaste={handleDeleteWaste}
            refresh={refresh}
            setRefresh={setRefresh}
            customStyle={customStyle}
          />
        </div>
      </div>
    </>
  );
};

export default Uploads;
