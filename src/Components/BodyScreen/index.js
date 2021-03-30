import React, { Component } from 'react'
import imageCoach from '../../assets/img/home-banner.jpeg'
import styles from './styles.css'
import Select from 'react-select'
import axios from 'axios';
export default class Body extends Component {
    constructor(props){
        super(props);
        this.handleNIFChange = this.handleNIFChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.state = {
            nif: '',
            selectOptions : [],
            id: "",
            name: '',
            dataContent:""
        };
        
    }
    async getOptions (){
        const res = await axios.get('https://demos.inbonis.com/api-coach-es-informa/activities')
        const data = res.data;
        
        const options = data.map(d =>({
            "value":d.code,
            "label":d.description
        }))
        this.setState({selectOptions: options});
    }
    handleNIFChange(e) {
        this.setState({nif: e.target.value});
     }
     handleSectorChange(e){
        this.setState({id:e.value, name:e.label})
     }
     continuar(){
        axios({
            method: 'post',
            url: 'https://demos.inbonis.com/api-coach-es-informa/diagnosis/anon',
            data: {
                activity_sector: this.state.id,
                nif: this.state.nif
            }
          }).then((response)=>{
        
            this.setState({dataContent :JSON.stringify(response.data)})
          })
          .catch((error)=>{
             console.log(error);
          });
      
          
    }
    componentDidMount(){
        this.getOptions();
        
    }
    render() {
        return (
            <div className="container justify-content-center">
                <img src={imageCoach} alt="Responsive image" />
                <h2>Evalúa y mejora tu negocio</h2>
                <div className="form-group">
                    <input type="text" className="input form-control" onChange={this.handleNIFChange} placeholder="NIF"/>
                </div>
                    <Select classNamePrefix="input" options={this.state.selectOptions} onChange={this.handleSectorChange.bind(this)} placeholder="Sector de Actividad"/>
                <div className=" button row justify-content-center">
                    <button className="btn btn-primary" type="submit" onClick={this.continuar.bind(this)}>Continuar</button>
                </div>
                <div className=" justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-3">
                        <label><b>1</b> Introduce el NIF y la actividad de tu negocio</label>
                        </div>
                        <div className="col-3">
                        <label><b>2</b> Contesta un breve cuestionario</label>
                        </div>
                        <div className="col-3">
                        <label><b>3</b> Consigue una evaluacion y consejos de mejora</label>
                        </div>
                    </div>
                </div>
                    {this.state.dataContent && 
                    <div>
                        <h2>Response:</h2>
                        <label className="responseData">{this.state.dataContent}</label>
                    </div>
                    }
            </div>
        )
    }
}
