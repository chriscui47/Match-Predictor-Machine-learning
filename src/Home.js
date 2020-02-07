import React from 'react';

import AutocompleteText from './AutocompleteText';
import Radio from './Radio';
import Mapradio from './Mapradio';
import Resultbutton from './Resultbutton';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.items=[
            '100Thieves',
            '3DMAX',
            '5POWER',
            'AGO',
            'ALTERNATEaTTaX',
            'ATK',
            'AVANGAR',
            'AVANT',
            'Absolute',
            'Aequus',
            'AlphaRed',
            'Ambush',
            'Ancient',
            'Aristocracy',
            'Ascent',
            'Asterion',
            'Astralis',
            'BIG',
            'BLITZKRIEG',
            'BLUEJAYS',
            'BOOT-d[S]',
            'BadNewsBears',
            'Berzerk',
            'Besiktas',
            'BigFrames',
            'Bizarre',
            'Bojestvata',
            'Bpro',
            'Bravado',
            'Bren',
            'Buckets',
            'BushidoBoyz',
            'CR4ZY',
            'Chaos',
            'Chiefs',
            'Chrisandtheboys',
            'Cloud9',
            'Complexity',
            'CopenhagenFlames',
            'DINQ',
            'Demise',
            'Denial',
            'Dippers',
            'Downfall',
            'DreamEaters',
            'E-RIVALS',
            'ENCE',
            'Envy',
            'Epsilon',
            'Espada',
            'EvilGeniuses',
            'FATE',
            'FURIA',
            'FaZe',
            'Fierce',
            'FinalFeature',
            'FrenchFrogs',
            'FrostFire',
            'G2',
            'GAMERZONE',
            'GODSENT',
            'Galkynysh',
            'GambitYoungsters',
            'GamerLegion',
            'Genuine',
            'Ghost',
            'Giants',
            'Grayhound',
            'GroundZero',
            'HAVU',
            'HardLegion',
            'HellRaisers',
            'Heretics',
            'Heroic',
            'INTZ',
            'Illuminar',
            'Imperial',
            'Infamous',
            'Instinct',
            'Invictus',
            'Isurus',
            'IzakoBoars',
            'Jade',
            'Japaleno',
            'Justice',
            'KOVA',
            'LDLC',
            'LaZe',
            'Lazarus',
            'Liquid',
            'LucidDream',
            'Luminosity',
            'LyngbyVikings',
            'MASSIVEimpact',
            'MC',
            'MIBR',
            'MVPPK',
            'Maknitude',
            'Mock-it',
            'MovistarRiders',
            'Mythic',
            'NASR',
            'NRG',
            'NatusVincere',
            'Nemiga',
            'NewIdentity',
            'NiP',
            'NoChance',
            'Nordavind',
            'North',
            'ORDER',
            'OldGuysClub',
            'OneMoreTime',
            'OpTic',
            'PACT',
            'PC419',
            'Panda',
            'Paradox',
            'PartyAstronauts',
            'Peeker',
            'sAdvantage',
            'Phoenix',
            'ProjectMajor',
            'Prospects',
            'RedReserve',
            'Renegades',
            'Revolution',
            'RiotSquad',
            'Rogue',
            'Rugratz',
            'Russia',
            'SJ',
            'SMASH',
            'SYF',
            'Salamander',
            'Se7en',
            'Sharks',
            'Singularity',
            'Spacestation',
            'Spirit',
            'Sprout',
            'SwolePatrol',
            'Syman',
            'TYLOO',
            'TeamAustralia',
            'TeamOne',
            'TeamUK',
            'TheQuest',
            'ThunderLogic',
            'Tricked',
            'Triumph',
            'Turkey5',
            'UnicornsofLove',
            'Unique',
            'Uruguay',
            'Uzbekistan',
            'Valiance',
            'Variance',
            'VegaSquadron',
            'ViCi',
            'Virtus.pro',
            'Vitality',
            'VivaAlgeria',
            'W7M',
            'Windigo',
            'Winstrike',
            'ZOOWEEMAMA',
            'adwokacik',
            'ahq',
            'catman',
            'devils.one',
            'eUnited',
            'ex-3DMAX',
            'ex-Athletico',
            'ex-Epsilon',
            'ex-Fragsters',
            'ex-Luminosity',
            'ex-Singularity',
            'ex-SpaceSoldiers',
            'expert',
            'fnatic',
            'forZe',
            'iNTACT',
            'm1x',
            'madlikewizards',
            'mousesports',
            'paiN',
            'pro100',
            'rewound',
            'x-kom',
            'x6tenceGalaxy'
        ];   
        this.state = {
            loaded: false,
            accuracy: null,
            suggestions: [],
            text: '',
            team1: '',
            team2: '',
            suggestions1: '',
            suggestions2: '',
            map: '',
            region: '',
            receivedData: null
        }
        this.receiveData = this.receiveData.bind(this)
        this.receiveDataRadio = this.receiveDataRadio.bind(this)
        this.fetchResults = this.fetchResults.bind(this)
        this.fetchAccuracies = this.fetchAccuracies.bind(this)

    }

    fetchResults(){
        
        var body = {
            "map": this.state.map,
            "team1": this.state.team1,
            "team2": this.state.team2,
            "region": this.state.region
        }
        fetch('/prediction/game', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
          }).then(res => res.json()).then(data => this.setState({receivedData: data, loaded: true}))
    }

    fetchAccuracies(){
        var body = {
            "region": this.state.region
        }
        fetch('/prediction/accuracy', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
          }).then(res => res.json()).then(data => this.setState({accuracy: data}))
    }
    onTextChanged1 = (e) =>{
        const value = e.target.value;
        let suggestions1 = [];
        if (value.length>0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions1 = this.items.sort().filter(v => regex.test(v));

        }
        this.setState({team1: e.target.value});
        this.setState(() => ({suggestions1,text: value}));
    }

    onTextChanged2 = (e) =>{
        const value = e.target.value;
        let suggestions2 = [];
        if (value.length>0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions2 = this.items.sort().filter(v => regex.test(v));

        }
        this.setState({[e.target.name]: e.target.value});
        this.setState(() => ({suggestions2,text: value}));
    }

    

    suggestionSelected1 (value){
        this.setState(()=> ({
            team1: value,
            suggestions1: [],
        }))
    }

    suggestionSelected2 (value){
        this.setState(()=> ({
            team2: value,
            suggestions2: []
        }))
    }

    renderSuggestions1(){
        const{ suggestions1 } = this.state;
        if (suggestions1.length===0){
            return null;
        }
        return(
        <ul>
            {suggestions1.map((item) => <li onClick={() => this.suggestionSelected1(item)}>{item}</li>)}
        </ul>
        );

    }
    renderSuggestions2(){
        const{ suggestions2 } = this.state;
        if (suggestions2.length===0){
            return null;
        }
        return(
        <ul>
            {suggestions2.map((item) => <li onClick={() => this.suggestionSelected2(item)}>{item}</li>)}
        </ul>
        );

    }
    receiveData(data){
        this.setState({map: data})

    }

    receiveDataRadio(data){
        this.setState({region: data})
    }

    render(){
        var lowerComp;
        var accuracy;
        if(this.state.loaded){
            if(this.state.receivedData[0] == 1){
                lowerComp = <h2>Team 1 is expected to win!</h2>
            } else {
                lowerComp = <h2>Team 2 is expected to win!</h2>
            }
            
        } else {
            lowerComp=null
        }

        if(this.state.accuracy){
            accuracy=this.state.accuracy
        } else {
            accuracy=null
        }
        console.log(this.state.team1)
        console.log(this.state.team2)

        return(
            (
                <Card style={{height:'70rem'}}>
                    <div className="q">
                        <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'100%'}} className="App">
                        <div className="App-Component">  
                            <Radio sendData={this.receiveDataRadio}/>
                                <div className="AutoCompleteText1">
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{...{fontFamily: 'Open Sans'}, ...{fontWeight: 'bold'}}}>Team 1</Form.Label>
                                        <Form.Control value={this.state.team1} onChange={this.onTextChanged1} type="text" name="team1" placeholder="Team 1" />
                                        {this.renderSuggestions1()}
                                    </Form.Group>
                                    {/* <input value={this.state.team1} name="team1" onChange={this.onTextChanged1} type="text"/> */}
                                    
                                </div>
                                <br></br>
                                <div className="AutoCompleteText1">
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{...{fontFamily: 'Open Sans'},...{fontWeight: 'bold'}}}>Team 2</Form.Label>
                                        <Form.Control value={this.state.team2} onChange={this.onTextChanged2} type="text" name="team2" placeholder="Team 2" />
                                        {this.renderSuggestions2()}
                                    </Form.Group>
                                    {/* <input value={this.state.team2} name="team2" onChange={this.onTextChanged2} type="text"/> */}
                                </div>
                                <br></br>
                                <br></br>
                                <Mapradio sendData={this.receiveData}/>
                                <p style={{fontFamily: "Open Sans"}}>
                                   Region: {this.state.region}<br/> Map: {this.state.map} <br/>Team 1: {this.state.team1} <br/> Team 2: {this.state.team2}
                                </p>
                                <Resultbutton clickBtn={this.fetchResults}/>
                                <div className="mt-4">
                                    {lowerComp}
                                </div>
                                <Button varient="primary" block size="lg" onClick={this.fetchAccuracies} className='mt-5'>
                                    Accuracies per region
                                </Button>
                                <div>
                                    {accuracy}
                                </div>
                                

                        </div>
                    </div>   
                    
                    </div>
                  
                </Card>  
                
                
            )
        )     
    }

}

