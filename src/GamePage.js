import React, { useState } from 'react'
import { Game } from './Game'

export const GamePage = () => {
    const [gameId, setGameID] = useState(1);
    return (
        <>
            <Game key={gameId} startNewGame={() => setGameID(gameId + 1)}/>
        </>
    )
}
