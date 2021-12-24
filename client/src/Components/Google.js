import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import FuzzySet from "fuzzyset";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../Styles/Google.css";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Google(props) {
  var a = FuzzySet();
  const history = useHistory();
  const [google, setGoogle] = useState([]);
  const [value, setValue] = useState("");
  const temp = [];
  const [newGoogle, setNewgoole] = useState([]);
  const [sugg, setSugg] = useState([]);
  const [selectedArr, SetSelectedArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [bgColor, setBgcolor] = useState([]);
  const [borderColor, setBorderColor] = useState([]);
  const [show, setShow] = useState(false);

  var fs;

  useEffect(() => {
    setGoogle(props.location.state.data);

    props.location.state.data.map((data) => {
      temp.push(data._id.country);
    });
    setNewgoole(temp);
  }, []);

  fs = FuzzySet(newGoogle);

  const handleChange = (e) => {
    setValue(e.target.value);
    setShow(false);
    if (e.target.value.length < 2) {
      setSugg([]);
      setArr2([]);
      setArr1([]);
    }

    if (fs.get(e.target.value))
      if (
        fs.get(e.target.value)[0][0] === 1 ||
        fs.get(e.target.value)[0][0] > 0.7
      ) {
        setSugg(fs.get(e.target.value).slice(0, 1));
        setArr2([]);
        setArr1([]);
      } else {
        setSugg(fs.get(e.target.value).slice(0, 3));
        setArr2([]);
        setArr1([]);
      }
  };
  var rarr1 = [];
  var rarr2 = [];
  const randomColors = () => {
    console.log("f");
    for (var i = 0; i < 10; i++) {
      const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

      const randomRGB = `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.2)`;
      const randomRGB2 = `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 1)`;

      rarr1.push(randomRGB);
      rarr2.push(randomRGB2);
    }

    setBgcolor(rarr1);
    setBorderColor(rarr2);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        position: "relative",
      }}
    >
      <input
        className="cinput"
        onChange={handleChange}
        value={value}
        style={{ width: "30%" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "30%",
          marginBottom: "30px",
        }}
      >
        {sugg
          ? sugg.map((el, index) => {
              return (
                <div
                  key={index}
                  className="suggestions"
                  style={{
                    width: "100%",
                    padding: "10px",

                    cursor: "pointer",
                  }}
                  onClick={() => {
                    randomColors();
                    setShow(true);
                    var temp = google.filter(
                      (item) => item._id.country === sugg[index][1]
                    );
                    SetSelectedArr(temp[0].categories.slice(0, 10));

                    temp[0].categories.slice(0, 10).map((item) => {
                      setArr1((prev) => [...prev, item.category]);
                      setArr2((prev) => [...prev, item.count]);
                    });

                    setValue(sugg[index][1]);
                    setSugg([]);
                  }}
                >
                  {el[1]}
                </div>
              );
            })
          : null}
      </div>
      <div style={{ width: "30%", marginBottom: "50px" }}>
        {show && bgColor.length > 0 ? (
          <Pie
            data={{
              labels: arr1,
              datasets: [
                {
                  label: "Google",
                  data: arr2,
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  borderWidth: 1,
                },
              ],
            }}
          />
        ) : null}
      </div>
      <button
        className="bbtn"
        onClick={() => {
          history.push({
            pathname: "/bloom",
            state: {
              data: props.location.state.data2,
              data2: props.location.state.data,
            },
          });
        }}
      >
        Bloomberg
      </button>
    </div>
  );
}

export default Google;
