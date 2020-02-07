import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import Dust2 from './assets/Dust_2.png';
import mirage from './assets/mirage.png';
import inferno from './assets/inferno.png';
import cache from './assets/cache.png';
import nuke from './assets/nuke.png';
import overpass from './assets/overpass.png';
import vertigo from './assets/vertigo.png';
import train from './assets/train.png';
import Image from 'react-image-resizer';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class MapRadio extends React.Component{
  constructor(props){
    super(props)
    // this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this)
  }

  onCheckboxBtnClick(s){
    this.props.sendData(s)
    
  }
  render(){
  return (
    <div>
      <div className="p"><h3><b>Select the Map</b></h3><br></br></div>
      <ButtonGroup>
        <Container>
          <Row>
              <Col> <div className="q"><Button color="secondary" style={{marginRight: 35}}  onClick={() => this.onCheckboxBtnClick("Dust2")}>Dust2</Button> <img src={Dust2} style={{marginRight: 30}} height={80} /></div></Col>
              <Col> <div><Button color="secondary" style={{marginRight: 25}} onClick={() => this.onCheckboxBtnClick("Mirage")} >Mirage</Button><img src={mirage} style={{marginRight: 30}} height={90}/></div></Col>
              <Col><div><Button color="secondary" style={{marginRight: 25}} onClick={() => this.onCheckboxBtnClick("Inferno")} >Inferno</Button><img src={inferno} style={{marginRight: 25}} height={85}/></div></Col>
              <Col><div><Button color="secondary" style={{marginRight: 25}} onClick={() => this.onCheckboxBtnClick("Nuke")} >Nuke</Button>    <img src={nuke} style={{marginRight: 27}} height={90}/></div></Col>
              <Col><br></br></Col>
          </Row>
          <Row> 
  
              <Col><div> <Button color="secondary" style={{marginRight: 25}} onClick={() => this.onCheckboxBtnClick("Overpass")} >Overpass</Button><img src={overpass} style={{marginRight: 27}} height={90}/></div></Col>
              <Col><div><Button color="secondary" style={{marginRight: 25}} onClick={() => this.onCheckboxBtnClick("Vertigo")} >Vertigo</Button> <img src={vertigo} style={{marginRight: 20}} height={80}/></div></Col>
              <Col><div> <Button color="secondary" style={{marginRight: 25}} onClick={() => this.onCheckboxBtnClick("Train")} >Train</Button><img src={train} style={{marginRight: 30}} height={90}/></div></Col>
              <Col><div> <Button color="secondary" style={{marginRight: 25}} onClick={() => this.onCheckboxBtnClick("Train")} >Cache</Button><img src={cache} style={{marginRight: 30}} height={90}/></div></Col>
              <Col><br></br></Col>
          </Row>
          <Row>
            <br></br>
            <br></br>
          </Row>
          </Container>
              
          
      </ButtonGroup>
    </div>
  );
  }
}