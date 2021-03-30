import React, { Component } from 'react'
import styles from './styles.css'
export default class Header extends Component {
    render() {
        return (<>
            <div className="header d-flex ">
                <div className="mr-auto p-2"><b>COACH</b>PYME</div>
                <div className="p-2">INICIO</div>
                <div className="p-2">QUÉ OBTENGO</div>
                <div className="p-2">ACCEDER</div>
            </div>
            </>
        )
    }
}
