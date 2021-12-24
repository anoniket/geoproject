import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Bloom from "./Bloom";

function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const history = useHistory();
  const [geoData, setGeoData] = useState([]);
  const [load, setLoad] = useState(true);
  const [bloom, setBloom] = useState([]);
  const [google, setGoogle] = useState([]);
  const [arr, setArr] = useState([]);
  const [cat, setCat] = useState([]);

  const fetchData = async () => {
    await Axios.get("/geo").then((res) => {
      console.log(res.data.data);
      setGeoData(res.data.data);
      setBloom(
        res.data.data.filter(
          (ele) => ele._id.source === "bloomberg" && ele._id.country
        )
      );
      setGoogle(
        res.data.data.filter(
          (ele) => ele._id.source === "google" && ele._id.country
        )
      );

      setLoad(false);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {load ? (
        <Spinner animation="grow" variant="danger" />
      ) : (
        <div>
          <Button
            style={{ marginRight: 30 }}
            variant="outline-dark"
            onClick={() => {
              // setArr(bloom);
              history.push({
                pathname: "/bloom",
                state: { data: bloom, data2: google },
              });
            }}
          >
            Bloomberg
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              history.push({
                pathname: "/google",
                state: { data: google, data2: bloom },
              });
            }}
          >
            Google
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
