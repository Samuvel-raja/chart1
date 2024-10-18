import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleWaterApi, updateWaterApi } from "../apicalls/waterApi";
import { Button } from "@mui/material";

const UpdateWater = () => {
  const [wdata, setwdata] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getSingleWater = async () => {
      try {
        const waterdata = await getSingleWaterApi(id);
        setwdata(waterdata.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleWater();
  }, []);
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
    navigate("/home");
  };
 

  return (
    <>
      <div className="form-container">
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

            <div className="form-footer">
              <Button type="submit" variant="contained">
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateWater;
