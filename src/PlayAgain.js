import React from 'react'

export const PlayAgain = (props) => {
    return (
        <div className="game-done">
            <div className="message"
                style={{color: props.gameStatus === 'lost' ? 'red': 'green'}}>
                {
                    props.gameStatus === 'lost' ? 'Game Over, you lost.': "Good job..."
                }
            </div>
            <button onClick={props.onClick}>Play Again</button>
        </div>
    )
}
 