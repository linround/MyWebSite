import React from "react";
import './link.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt, faFaceGrinBeam,faGift, faContactBook} from "@fortawesome/free-solid-svg-icons";



export function ButtonLink(){
  return (
    <div>
      <div className="container">
        <FontAwesomeIcon className="apple" icon={faAppleAlt} />
        <FontAwesomeIcon className="twitter" icon={faFaceGrinBeam} />
        <FontAwesomeIcon className="github" icon={faGift} />
        <FontAwesomeIcon className="facebook" icon={faContactBook} />
      </div>
    </div>
  )
}