import React, { useState } from 'react';
import { Button2, ButtonGroup } from 'reactstrap';
import Button from 'react-bootstrap/Button';

const Resultbutton = (props) => {
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  const clickButton = (selected) => {
    props.clickBtn()
  }
  return (
    <div className="q">
      <div>
        <Button variant="success" size="lg" onClick={() => clickButton()} active={rSelected === 1} block>Predict Result</Button>  
      </div>
    </div>
  );
}

export default Resultbutton;