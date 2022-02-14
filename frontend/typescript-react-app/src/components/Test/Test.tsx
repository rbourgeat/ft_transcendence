import React, { useState } from 'react';
import './Test.css';
import Wave from 'react-wavify'

function Test() {
    return (
        <div>
              <Wave fill='#f79902'
                    paused={false}
                    options={{
                    height: 20,
                    amplitude: 20,
                    speed: 0.15,
                    points: 3
                    }}
            />
        </div>

    );
} export default Test;
