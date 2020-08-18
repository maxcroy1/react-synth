import React, { useState } from 'react'
import { Donut } from 'react-dial-knob'
 
export default function GainSlider() {
    const [value, setValue] = useState(0)
    return <Donut
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={value}
        theme={{
            donutColor: 'basic'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'my-label'}
    >
    </Donut>
}

