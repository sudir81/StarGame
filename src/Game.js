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


/* Moved to custom hooks
  const [stars, setStars] = useState(utils.random(1,9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if(secondsLeft > 0 && availableNums.length > 0) {
        const timerId = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
    }
  });*/
  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";


//   const resetGame = () => {
//       setStars(utils.random(1, 9));
//       setAvailableNums(utils.range(1,9));
//       setCandidateNums([]);
//   }

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

    /* moved to custom hooks
    if(utils.sum(newCandidatesNums) !== stars){
        setCandidateNums(newCandidatesNums);
    }else{
        const newAvialableNums = availableNums.filter(
            n => !newCandidatesNums.includes(n)
        );
        setStars(utils.randomSumIn(newAvialableNums, 9));
        setAvailableNums(newAvialableNums);
        setCandidateNums([]);
    }*/
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
