import React from "react";
import Card from "react-bootstrap/Card";
import "./bl.scss";
import { useLocation } from "react-router-dom";
import dateFormat from "dateformat";
import locationWhite from "../../img/locationWhite.png";

export default function Status() {
  const location = useLocation();
  const { arrival } = location.state;
  const { discharge } = location.state;
  const { status } = location.state;
  const { vessel } = location.state;
  const { bl } = location.state;
  const { shipline } = location.state;
  const { loading } = location.state;

  const eta = dateFormat(arrival, "d mmm yyyy");

  return (
    <div className="bg-gradient-to-r from-white via-sky-100 to-sky-200 w-screen">
      <div className="grid grid-cols-2 gap-10 p-2">
        <ShipmentCard eta={eta} pod={discharge} vesselName={vessel} blNo={bl} />

        <div className="p-2 mt-3">
          <h2 className="text-3xl">Tracking Status</h2>
          <div className="grid grid-cols-2 my-7 font-bold text-xl justify-start">
            <h2 className="">B/L: {bl}</h2>
            <h1 className="">ETA: {eta}</h1>
          </div>
          
          <div >
            <ul className="step-progress">
              <li className="step-progress-item is-done"><strong>Shipment Origin</strong><br /><h2 className="text-xl">{loading}</h2></li>
              <li className="step-progress-item is-done"><strong>Shipment In Progress Via</strong><br /><h2 className="text-xl">{shipline}</h2></li>
              <li className="step-progress-item is-done"><strong>Shipment Disembarked</strong><br /><h2 className="text-xl">{discharge}</h2></li>
              <li className="step-progress-item current"><strong>Shipment Status</strong><br /><h2 className="text-xl">{status}</h2></li>

              <h1 className="ml-80">ETA:{arrival}</h1>

            </ul>
          </div>
          <div>
            {/* <h1 className="p-6 text-3xl font-bold text-[#217BF4]">On Time</h1> */}
          </div>
        </div>


      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="block" viewBox="0 0 1440 320"><path fill="#a2d9ff" fillOpacity="0.8" d="M0,96L40,80C80,64,160,32,240,53.3C320,75,400,149,480,165.3C560,181,640,139,720,117.3C800,96,880,96,960,106.7C1040,117,1120,139,1200,133.3C1280,128,1360,96,1400,80L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
        <svg xmlns="http://www.w3.org/2000/svg" className="block" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="0.2" d="M0,96L80,122.7C160,149,320,203,480,202.7C640,203,800,149,960,128C1120,107,1280,117,1360,122.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
          <svg xmlns="http://www.w3.org/2000/svg" className="block" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,128L60,154.7C120,181,240,235,360,229.3C480,224,600,160,720,154.7C840,149,960,203,1080,213.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" /></svg>
        </svg>
      </svg>
    </div>

  );
}

function ShipmentCard({ eta, pod, vesselName, blNo }) {
  return (
    <Card className="h-fit mt-10 2xl:w-2/3" style={{ backgroundColor: "#217BF4", borderRadius: "10px" }}>
      <Card.Body>
        <div className="grid grid-cols-2 text-white p-5">
          <div className="flex flex-col justify-center">
            <Card.Title className="text-4xl justify-start mb-4">{eta}</Card.Title>
            <Card.Subtitle className="text-xl justify-start">{blNo}</Card.Subtitle>
          </div>
          <div className="flex flex-col justify-center">
            <Card.Title className="flex justify-end mb-4" style={{ alignItems: "center" }}>
              <img className="h-10 mr-2" src={locationWhite} alt="shipping-icon" />
              <span>{pod}</span>
            </Card.Title>
            <Card.Subtitle className="text-xl flex justify-end items-end">
              <span className="text-base mr-1">Vessel: </span>
              {vesselName}
            </Card.Subtitle>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

