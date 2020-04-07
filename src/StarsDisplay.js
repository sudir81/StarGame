import React from 'react'
import { utils } from './utils'

export const StarsDisplay = (props) => {
    return (
        <>
            {
            utils.range(1, props.stars).map(starId =>
              <div key={starId} className="star" />
              )
          }
        </>
    )
}
