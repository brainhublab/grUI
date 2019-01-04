import React, { Component } from 'react';
import threeEntryPoint from '../threejs/three-entry-point.js';

class Hands extends Component {
    componentDidMount() {
        this.sceneManager = threeEntryPoint(this.threeRootElement);
    }

    render () {
        if (this.sceneManager) {
            this.sceneManager.moveHand(this.props.hands);
        }

        return (
            <div style={{height: '700px'}} ref={element => this.threeRootElement = element} id={this.counter}></div>
        );
    }
}

export default Hands;
