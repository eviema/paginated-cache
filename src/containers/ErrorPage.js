import React from 'react';
import img from '../assets/cloud_off.png'

export default ({ error }) => {
    return (
        <div style={{ textAlign: 'center', height: '100%', width: '100%' }} id="error">
            <img src={img} alt='error' />
            <h1>{error}</h1>
        </div>
    );

}
