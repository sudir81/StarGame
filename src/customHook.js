import {useState, useEffect} from 'react';
import { utils } from './utils';

export const useGameState = () => {
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
    });

    const setGameState = (newCandidatesNums) => {
        if(utils.sum(newCandidatesNums) !== stars){
            setCandidateNums(newCandidatesNums);
        }else{
            const newAvialableNums = availableNums.filter(
                n => !newCandidatesNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvialableNums, 9));
            setAvailableNums(newAvialableNums);
            setCandidateNums([]);
        }
    }

    return { stars, availableNums, candidateNums, secondsLeft, setGameState}
}