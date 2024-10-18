import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { singleEmissionApi, updateEmissionApi } from "../apicalls/emissionApi";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmission = () => {
  const [emdata, setemdata] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEmissionData = async () => {
      try {
        const data = await singleEmissionApi(id);
        setemdata(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEmissionData();
  }, []);

  const handleChange = (e) => {
    setemdata({ ...emdata, [e.target.name]: e.target.value });
  };

  const handleUpdateEmission = async (e) => {
    e.preventDefault();
    try {
      await updateEmissionApi(id, emdata);
    } catch (err) {
      console.log(err);
    }
    navigate("/home");
  };
  return (
    <div className="form-container">
      <form action="post" onSubmit={handleUpdateEmission}>
        {/* <div className="form-header">
          <h3>Update Emission</h3>
        </div> */}
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

          {/* <div className="fields">
            <button>Sign in</button>
          </div> */}
        </div>
        <div className="form-footer">
          <Button type="submit" variant="contained">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmission;
