import React, { Component } from 'react';

import Homepage from '../ComponentsofHomescreen/Homepage'
import Appbar from './Appbar';

//Screen of Home

class Home extends Component {
    render() {
        return (
            <div className="App">

                <Appbar />
                <Homepage />

            </div >

        )
    }
}


export default Home;