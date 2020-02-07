import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import Row from 'react-bootstrap/Row'

const Radio = (props) => {
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  const onCheckboxBtnClick = (data) => {
    props.sendData(data)
    if(data == "America"){
      setRSelected(1)
    }
    else if(data == "Asia"){
      setRSelected(2)
    }
    else if(data == "Europe"){
      setRSelected(3)
    }
  }
  return (
    <div>
      <div className="p mt-4" ><h3><b>Match Type</b></h3></div>
      <ButtonGroup>
        <Button color="primary" onClick={() => onCheckboxBtnClick("America")} active={rSelected === 1}>NA</Button>
        <Button color="primary" onClick={() => onCheckboxBtnClick("Asia")} active={rSelected === 2}>Asia</Button> 
        <Button color="primary" onClick={() => onCheckboxBtnClick("Europe")} active={rSelected === 3}>EU</Button>     
      </ButtonGroup>
      <Row><br></br></Row>
    </div>
  );
}

export default Radio;