import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import FuzzySet from "fuzzyset";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../Styles/Google.css";
import {
  Pie,
  getElementAtEvent,
  getElementsAtEvent,
  getDatasetAtEvent,
} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Bloom(props) {
  var a = FuzzySet();
  const chartRef = useRef();
  const history = useHistory();
  const [bloom, setBloom] = useState([]);
  const [value, setValue] = useState(props.location.state.data3);
  const temp = [];
  const [newBloom, setNewbloom] = useState([]);
  const [sugg, setSugg] = useState([]);
  const [selectedArr, SetSelectedArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [bgColor, setBgcolor] = useState([]);
  const [borderColor, setBorderColor] = useState([]);
  const [show, setShow] = useState(false);
  const [otherArray, setOtherArray] = useState([]);
  const [tsum, setTsum] = useState("");

  var fs;

  useEffect(() => {
    setBloom(props.location.state.data);

    props.location.state.data.map((data) => {
      temp.push(data._id.country);
    });
    setNewbloom(temp);
  }, []);

  fs = FuzzySet(newBloom);

  useEffect(() => {
    if (value !== "" && value) {
      handleChange2(value);
    }
  }, [newBloom]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setShow(false);
    if (e.target.value.length < 2) {
      setSugg([]);
      setArr2([]);
      setArr1([]);
      setOtherArray([]);
      setTsum("");
    }

    if (fs.get(e.target.value))
      if (
        fs.get(e.target.value)[0][0] === 1 ||
        fs.get(e.target.value)[0][0] > 0.7
      ) {
        setSugg(fs.get(e.target.value).slice(0, 1));
        setArr2([]);
        setArr1([]);
        setOtherArray([]);
        setTsum("");
      } else {
        setSugg(fs.get(e.target.value).slice(0, 3));
        setArr2([]);
        setArr1([]);
        setOtherArray([]);
        setTsum("");
      }
  };

  const handleChange2 = (e) => {
    setShow(false);

    if (e.length < 2) {
      setSugg([]);
      setArr2([]);
      setArr1([]);
      setOtherArray([]);
      setTsum("");
    }

    if (fs.get(e))
      if (fs.get(e)[0][0] === 1 || fs.get(e)[0][0] > 0.7) {
        randomColors();
        setShow(true);
        var temp = bloom.filter((item) => item._id.country === fs.get(e)[0][1]);

        var sum = 0;
        var sum2 = 0;
        // var sum2 = 0;
        // var sum3 = 0;
        temp[0].categories = temp[0].categories.filter((el) => el.category);
        temp[0].categories.sort(
          (a, b) => parseFloat(b.count) - parseFloat(a.count)
        );

        // console.log(temp[0].categories);
        SetSelectedArr(temp[0].categories);
        temp[0].categories.slice(0, 10).map((el) => (sum2 = sum2 + el.count));
        temp[0].categories
          .slice(10, temp[0].categories.length)
          .map((el) => (sum = sum + el.count));
        // temp[0].categories.map((el) => (sum2 = sum2 + el.count));
        // temp[0].categories.slice(0, 10).map((el) => (sum3 = sum3 + el.count));
        // console.log(sum + " " + sum2 + " " + sum3);
        setTsum(sum + sum2);
        temp[0].categories.slice(0, 10).map((item) => {
          setArr1((prev) => [...prev, item.category]);
          setArr2((prev) => [...prev, item.count]);
        });

        if (temp[0].categories.length > 10) {
          setArr1((prev) => [...prev, "Other"]);
          setArr2((prev) => [...prev, sum]);
        }
      } else {
        setSugg(fs.get(e).slice(0, 3));
        setArr2([]);
        setArr1([]);
        setOtherArray([]);
        setTsum("");
      }
  };

  var rarr1 = [];
  var rarr2 = [];
  const randomColors = () => {
    for (var i = 0; i < 11; i++) {
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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "10%",
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
                    var temp = bloom.filter(
                      (item) => item._id.country === sugg[index][1]
                    );

                    var sum = 0;
                    var sum2 = 0;
                    // var sum2 = 0;
                    // var sum3 = 0;
                    temp[0].categories = temp[0].categories.filter(
                      (el) => el.category
                    );
                    temp[0].categories.sort(
                      (a, b) => parseFloat(b.count) - parseFloat(a.count)
                    );

                    // console.log(temp[0].categories);
                    SetSelectedArr(temp[0].categories);
                    temp[0].categories
                      .slice(0, 10)
                      .map((el) => (sum2 = sum2 + el.count));
                    temp[0].categories
                      .slice(10, temp[0].categories.length)
                      .map((el) => (sum = sum + el.count));
                    // temp[0].categories.map((el) => (sum2 = sum2 + el.count));
                    // temp[0].categories.slice(0, 10).map((el) => (sum3 = sum3 + el.count));
                    // console.log(sum + " " + sum2 + " " + sum3);
                    setTsum(sum + sum2);

                    temp[0].categories.slice(0, 10).map((item) => {
                      setArr1((prev) => [...prev, item.category]);
                      setArr2((prev) => [...prev, item.count]);
                    });

                    if (temp[0].categories.length > 10) {
                      setArr1((prev) => [...prev, "Other"]);
                      setArr2((prev) => [...prev, sum]);
                    }
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "wheat",
            }}
          >
            <p>Total Businesses - {tsum}</p>
            <Pie
              data={{
                labels: arr1,
                datasets: [
                  {
                    label: "Bloomberg",
                    data: arr2,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                  },
                ],
              }}
              ref={chartRef}
              onClick={(event) => {
                if (
                  getElementAtEvent(chartRef.current, event).length > 0 &&
                  arr1[getElementAtEvent(chartRef.current, event)[0].index] ===
                    "Other"
                ) {
                  console.log(
                    selectedArr
                      .slice(10, selectedArr.length)
                      .sort((a, b) => a.category.localeCompare(b.category))
                  );
                  setOtherArray(
                    selectedArr
                      .slice(10, selectedArr.length)
                      .sort((a, b) => a.category.localeCompare(b.category))
                  );
                }
              }}
            />
          </div>
        ) : null}
      </div>
      {otherArray.length > 0 ? (
        <div className="otherb">
          <h5 style={{ marginBottom: 40 }}>Other Categories</h5>
          {otherArray.map((el, index) => {
            var temp1 = [];
            var temp2 = [];
            el.sub_categories.map((e) => {
              temp1.push(e.category);
              temp2.push(e.count);
            });
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 50,
                }}
              >
                <p key={index}>
                  {el.category} - {el.count}
                </p>

                <Pie
                  data={{
                    labels: temp1,
                    datasets: [
                      {
                        label: el.category,
                        data: temp2,
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : null}
      <button
        className="bbtn"
        onClick={() => {
          history.push({
            pathname: "/google",
            state: {
              data: props.location.state.data2,
              data2: props.location.state.data,
              data3: value,
            },
          });
        }}
      >
        Google
      </button>
    </div>
  );
}

export default Bloom;
