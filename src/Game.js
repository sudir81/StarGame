import React from 'react'
import { StarsDisplay } from './StarsDisplay'
import { NumberId } from './NumberId'
import { utils } from './utils';
import { PlayAgain } from './PlayAgain';
import { useGameState } from './customHook';

export const Game = (props) => {

    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    } = useGameState();
  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = number => {
    if(!availableNums.includes(number)){
        return 'used';
    }
    if(candidateNums.includes(number)){
        return candidatesAreWrong ? 'wrong': 'candidate';
    }
    return 'available';
  }

  const onNumberCick = (number, status) => {
    if(gameStatus !== 'active' || status === 'used'){
        return;
    }

    const newCandidatesNums = 
        status === 'available' ? candidateNums.concat(number):
        candidateNums.filter(cn => cn !== number);

    setGameState(newCandidatesNums);
  }


    return (
        <>
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        gameStatus !== "active" ? <PlayAgain gameStatus={gameStatus} onClick={props.startNewGame}/>: 
                        <StarsDisplay stars={stars} />
                    }
                </div>
                <div className="right">
                {
                    utils.range(1, 9).map(number => (
                        <NumberId 
                            key={number} 
                            status={numberStatus(number)}
                            number={number} 
                            onClick={onNumberCick}
                        />
                    ))
                }
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </>
    )
}
