import React, { Component } from 'react'
import ibonisLogo from '../../assets/img/ibonisrating.png'
import styles from './styles.css'

export default class index extends Component {
    render() {
        return (
            <div className="footer">
                <img src={ibonisLogo} className="logo" />
            </div>
        )
    }
}
