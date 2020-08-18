import React from 'react'
import {ReactComponent as FullKeyboard} from '../keys2.svg'


class Keyboard extends React.Component{
	render(){
		return(
			<div className="keyboard-container"> 
				<FullKeyboard onMouseDown={(e)=>{
					this.props.playKey(e)
				}} onMouseUp={(e)=>{
					this.props.endKey(e)
				}}/>
			</div>
		)
	}
}

export default Keyboard