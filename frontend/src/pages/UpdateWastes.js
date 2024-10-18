import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleWasteApi, updateWasteApi } from "../apicalls/wastesApi";

const UpdateWastes = () => {
  const [wsdata, setwsdata] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getSingleWaste = async (e) => {
      try {
        const wastedata = await getSingleWasteApi(id);
        setwsdata(wastedata.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleWaste();
  }, []);
  
  const handleChange = (e) => {
    setwsdata({ ...wsdata, [e.target.name]: e.target.value });
  };
  const handleUpdateWastes = async (e) => {
    e.preventDefault();
    try {
      await updateWasteApi(id, wsdata);
    } catch (err) {
      console.log(err);
    }
    navigate("/home");
  };
  return (
    <>
      <div className="form-container">
        <form action="post" onSubmit={handleUpdateWastes}>
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
                placeholder="Enter your Quantity"
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
              <label htmlFor="">Category</label>
              <input
                type="text"
                placeholder="Enter your scope"
                name="status"
                value={wsdata.category}
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

export default UpdateWastes;
