import './App.css';
import { useEffect, useState } from 'react'; 
import Axios from 'axios'; 
import Dropdown from 'react-dropdown'; 
import { HiSwitchHorizontal } from 'react-icons/hi'; 
import 'react-dropdown/style.css'; 





function App() {
  const [info, setInfo] = useState([]); 
  const [input, setInput] = useState(0); 
  const [from, setFrom] = useState("usd"); 
  const [to, setTo] = useState("eur"); 
  const [options, setOptions] = useState([]); 
  const [output, setOutput] = useState(0); 
  const [list, setList] = useState('usd')
  const [list2, setList2] = useState([])

//console.log(info)
//console.log(list2);
useEffect(() => { 
  Axios.get( 
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${list}.json`) 
 .then((res) => { 
    setList2(res.data[list]); 
  }) 
}, [list]); 

  //  Calling the api whenever the dependency changes 
   useEffect(() => { 
    Axios.get( 
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`) 
   .then((res) => { 
      setInfo(res.data[from]); 
    }) 
  }, [from]); 
  // Calling the convert function whenever 
  // a user switches the currency 
  useEffect(() => { 
    setOptions(Object.keys(info)); 
    convert(); 
  }, [info]) 
  //Changing the output when the currency changes
  useEffect(() => {
    var rate = info[to]
    setOutput(input * rate)
  })
  // Function to convert the currency 
  function convert() { 
    var rate = info[to]; 
    //var rate = info.eur
    console.log(info.eur * input)
    setOutput(input * rate); 
  } 
  
  // Function to switch between two currency 
  function flip() { 
    var temp = from; 
    setFrom(to); 
    setTo(temp); 
  } 
  function handleChange(e) {
     var x = e.target.value
    setInput(x)
    console.log("x = " + x + " input = " + input)
    var rate = info[to]
    setOutput(x * rate)
    
  }
  
  return (
    // NAVBAR
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
  <a className="navbar-brand justify-content-center d-flex w-100" href="!#">Currency Converter</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ">
    </ul>
  </div>
</nav>

{/* CONTENT */}
<div className="container">
  <div className="row">
    <div className="col">
    <div className="left"> 
  <h3>Amount</h3> 
  <input type="text" 
     placeholder="Enter the amount" 
     onChange={(e) => {setInput(e.target.value); handleChange(e)}}
      /> 
</div> 
    </div>
    <div className="col">
    <div className="middle"> 
  <h3>From</h3> 
  <Dropdown options={options}  
            onChange={(e) => { setFrom(e.value);  }} 
  value={from} placeholder="From" /> 
</div> 
    </div>
    <div className="col-1 mt-auto mb-1">
    <div className="switch"> 
  <HiSwitchHorizontal size="30px" 
                onClick={() => { flip()}}/> 
</div> 
    </div>
    <div className="col">

<div className="right"> 
  <h3>To</h3> 
  <Dropdown options={options}  
            onChange={(e) => {setTo(e.value); }}  
  value={to} placeholder="To" /> 
  </div>
    </div>
  </div>
  <div className="row">
    <div className="col">
    <div className="result"> 
    <h2 className='mt-4'>Converted Amount:</h2> 
    <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p> 
  </div>
    </div>
  </div>
</div>
        <h3 className='mt-4 mb-2'>Popular Currencies</h3>
<div className='container list'>
    <div className='row'>
      <div className='col'>
      <p>{input + " " + from + " = " +(info.eur * input).toFixed(2) + " Euros"}</p> 
      <p>{input + " " + from + " = " +(info.jpy * input).toFixed(2) + " Japanese Yen"}</p> 
      <p>{input + " " + from + " = " +(info.gbp * input).toFixed(2) + " British Pounds"}</p> 
      <p>{input + " " + from + " = " +(info.aud * input).toFixed(2) + " Australian Dollars"}</p> 
      <p>{input + " " + from + " = " +(info.cad * input).toFixed(2) + " Canadian Dollars"}</p> 
      </div>
    </div>
</div>
<footer className="bg-light text-center text-white mt-5">
  <div className="container p-4 pb-0">
    {/* <!-- Section: Social media --> */}
    <section className="">
      {/* <!-- Facebook --> */}
      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#3b5998"}}
        href="https://www.facebook.com/marcus.ayers.712"
        role="button"
        target="blank"

        ><i className="fab fa-facebook-f"></i
      ></a>

      {/* <!-- Twitter --> */}
      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#55acee"}}
        href="https://twitter.com/BoringTempFiles/likes"
        role="button"
        target="blank"

        ><i className="fab fa-twitter"></i
      ></a>

      {/* <!-- Instagram --> */}
      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#ac2bac"}}
        href="https://www.instagram.com/maarrcc__4/"
        role="button"
        target="blank"

        ><i className="fab fa-instagram"></i
      ></a>

      {/* <!-- Linkedin --> */}
      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#0082ca"}}
        href="https://www.linkedin.com/in/marcus-ayers-330518219/"
        role="button"
        target="blank"

        ><i className="fab fa-linkedin-in"></i
      ></a>
      {/* <!-- Github --> */}
      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: "#333333"}}
        href="https://github.com/Marcus-Ayers"
        role="button"
        target="blank"
        ><i className="fab fa-github"></i
      ></a>
    </section>
    {/* <!-- Section: Social media --> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div className="text-center p-3 text-black" style={{backgrounColor: "#0082ca"}}>
   
    <a className="text-black" href="https://www.altcademy.com/">AltCademy</a>
  </div>
  {/* <!-- Copyright --> */}
</footer>
    </div>
  );
}

export default App;
