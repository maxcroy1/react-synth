import React from 'react';
import {ReactComponent as C4} from '../keySVGs/C4.svg'
import {ReactComponent as Csh} from '../keySVGs/Csh.svg'
import {ReactComponent as D4} from '../keySVGs/D4.svg'
import {ReactComponent as Dsh} from '../keySVGs/Dsh.svg'
import {ReactComponent as E4} from '../keySVGs/E4.svg'
import {ReactComponent as F4} from '../keySVGs/F4.svg'
import {ReactComponent as Fsh} from '../keySVGs/Fsh.svg'
import {ReactComponent as G4} from '../keySVGs/G4.svg'
import {ReactComponent as Gsh} from '../keySVGs/Gsh.svg'
import {ReactComponent as A4} from '../keySVGs/A4.svg'
import {ReactComponent as Ash} from '../keySVGs/Ash.svg'
import {ReactComponent as B4} from '../keySVGs/B4.svg'
import {ReactComponent as C5} from '../keySVGs/C5.svg'
import {ReactComponent as Csh2} from '../keySVGs/Csh2.svg'
import {ReactComponent as D5} from '../keySVGs/D5.svg'
import {ReactComponent as Dsh2} from '../keySVGs/Dsh2.svg'
import {ReactComponent as E5} from '../keySVGs/E5.svg'
import {ReactComponent as F5} from '../keySVGs/F5.svg'

export default class Key extends React.Component{
    render(){
        return(
            <div>
                <C4 />
                <Csh style={{verticalAlign: "top", zIndex: 2}}/>
                <D4 />
                <Dsh style={{verticalAlign: "top", zIndex: 2}}/>
                <E4 />
                <F4 />
                <Fsh style={{verticalAlign: "top", zIndex: 2}}/>
                <G4 />
                <Gsh style={{verticalAlign: "top", zIndex: 2}}/>
                <A4 />
                <Ash style={{verticalAlign: "top", zIndex: 2}}/>
                <B4 />
                <C5 />
                <Csh2 style={{verticalAlign: "top", zIndex: 2}}/>
                <D5 />
                <Dsh2 style={{verticalAlign: "top", zIndex: 2}}/>
                <E5 />
                <F5 />
            </div>
        )
    }
}