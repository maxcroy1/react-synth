import React from 'react'

export default class Preset extends React.Component { 
    render(){
        return(
            <div>
                <button className="preset-button"onClick={() => this.props.applyPreset(this.props.preset)}>Preset {this.props.preset.id}</button>
            </div>
        )
    }
}