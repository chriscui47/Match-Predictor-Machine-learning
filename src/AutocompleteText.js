import React from 'react';
import './AutoCompleteText.css'

export default class AutocompleteText extends React.Component{
    constructor (props){
        super(props);
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
        this.state={
            suggestions: [],
            text: '',
        };
    }
    
    onTextChanged = (e) =>{
        const value = e.target.value;
        let suggestions = [];
        if (value.length>0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestions,text: value}));
    }

    suggestionSelected (value){
        this.setState(()=> ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions(){
        const{ suggestions } = this.state;
        if (suggestions.length===0){
            return null;
        }
        return(
        <ul>
            {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
        </ul>
        );

    }
    render () {
        const {text} = this.state; 
        return (
            <div className="AutoCompleteText">
                <input value={text} onChange={this.onTextChanged} type="text"/>
                {this.renderSuggestions()}
            </div>
        )
    }
}