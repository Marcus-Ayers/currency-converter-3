import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const [data, setData] = useState();
  const [option, setOption] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  //Use effects to call the API
  useEffect(() => {
    Axios.get(`https://api.frankfurter.app/latest?from=${from}`).then((res) => {
      setInfo(res.data.rates);
    });
  }, [from]);
  useEffect(() => {
    setOptions(Object.keys(info));
  }, [info]);

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  // Use effect to convert the currency and update the graph
  useEffect(() => {
    convert();
    axios
      .get(
        `https://api.frankfurter.app/${startDate}..${endDate}?from=${from}&to=${to}`
      )
      .then((response) => {
        const chartLabels = Object.keys(response.data.rates);
        const chartData = Object.values(response.data.rates).map(
          (rate) => rate[to]
        );

        setData({
          labels: chartLabels,
          datasets: [
            {
              label: "1 " + from + " to 1 " + to,
              data: chartData,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      });
  }, [to, from, input, output, info, options]);

  //CONVERTS THE CURRENCY
  function convert() {
    console.log("Here");
    if (info.length === 0 || info[to] == undefined) {
      //console.log(info);
      setOutput(0);
    } else {
      var rate = info[to];
      setOutput(input * rate);
    }
  }
  //CONVERTS THE CURRENCY IN THE POPULAR CURRENCIES BOX
  function convert2(currency) {
    if (info.length === 0 || input === undefined) {
      return "0 = ";
    } else {
      if (currency == undefined) {
        return input + " " + from + " = " + input;
      } else {
        return input + " " + from + " = " + (currency * input).toFixed(2);
      }
    }
  }

  //FLIPS THE 2 SELECTED CURRENCIES
  function flip() {
    if (output === NaN) {
      setOutput(0);
    } else {
      var temp = from;
      setFrom(to);
      setTo(temp);
    }
  }

  return (
    // NAVBAR
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a
          className="navbar-brand justify-content-center d-flex w-100"
          href="!#"
        >
          Currency Converter
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=""></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav "></ul>
        </div>
      </nav>
      {/* CONTENT */}
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="left">
              <h3>Amount</h3>
              <input
                type="text"
                placeholder="Enter the amount"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div className="middle">
              <h3>From</h3>
              <Dropdown
                options={options}
                onChange={(e) => {
                  setFrom(e.value);
                }}
                value={from}
                placeholder="From"
              />
            </div>
          </div>
          <div className="col-md-1 col-sm-12 mt-auto mb-1">
            <div className="switch">
              <HiSwitchHorizontal
                size="30px"
                onClick={() => {
                  flip();
                }}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div className="right">
              <h3>To</h3>
              <Dropdown
                options={options}
                onChange={(e) => {
                  setTo(e.value);
                }}
                value={to}
                placeholder="To"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="result">
              <h2 className="mt-4">Converted Amount:</h2>
              <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
            </div>
          </div>
        </div>
      </div>
      {/* LIST OF POPULAR CURRENCIES */}
      <h3 className="mt-4 mb-2">Popular Currencies</h3>
      <div className="container list">
        <div className="row">
          <div className="col">
            <p>{convert2(info.EUR) + " Euros"}</p>
            <p>{convert2(info.JPY) + " Japanese Yen"}</p>
            <p>{convert2(info.GBP) + " British Pounds"}</p>
            <p>{convert2(info.AUD) + " Australian Dollars"}</p>
            <p>{convert2(info.CAD) + " Canadian Dollars"}</p>
          </div>
        </div>
      </div>

      {/* DISPLAY THE GRAPH */}

      <div className="container">
        <div className="row">
          <div className="col">
            {data ? (
              <div className="graph">
                {" "}
                <Line option={option} data={data} />{" "}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-light text-center text-white mt-5">
        <div className="container p-4 pb-0">
          {/* <!-- Section: Social media --> */}
          <section className="">
            {/* <!-- Facebook --> */}
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com/marcus.ayers.712"
              role="button"
              target="blank"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            {/* <!-- Twitter --> */}
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="https://twitter.com/BoringTempFiles/likes"
              role="button"
              target="blank"
            >
              <i className="fab fa-twitter"></i>
            </a>

            {/* <!-- Instagram --> */}
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com/maarrcc__4/"
              role="button"
              target="blank"
            >
              <i className="fab fa-instagram"></i>
            </a>

            {/* <!-- Linkedin --> */}
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com/in/marcus-ayers-330518219/"
              role="button"
              target="blank"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            {/* <!-- Github --> */}
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com/Marcus-Ayers"
              role="button"
              target="blank"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
          {/* <!-- Section: Social media --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3 text-black"
          style={{ backgrounColor: "#0082ca" }}
        >
          <a
            className="text-black"
            target="blank"
            href="https://www.altcademy.com/"
          >
            AltCademy
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  );
}

export default App;
