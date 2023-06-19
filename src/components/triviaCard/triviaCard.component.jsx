import { useState, useEffect } from 'react'

import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'

const TriviaCard = ({
  question,
  correctAnswer,
  incorrectAnswers,
  length,
  deleteCard,
}) => {
  const [shuffledChoices, setShuffledChoices] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState()
  const [userScore, setUserScore] = useState(0)
  const allChoices = [correctAnswer, ...incorrectAnswers]

  useEffect(() => {
    setShuffledChoices(allChoices.sort(() => (Math.random() > 0.5 ? 1 : -1)))
  }, [])

  const onChangeValue = (e) => {
    setSelectedAnswer(e.target.value)
    console.log(selectedAnswer)
    console.log(correctAnswer)
  }

  const submitAnswer = () => {
    ;(selectedAnswer === correctAnswer && selectedAnswer !== '') || undefined
      ? setUserScore(userScore + 1)
      : setUserScore(userScore)
  }

  return (
    <Card>
      <h1>{question.text}</h1>
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
        >
          {shuffledChoices.map((choice) => {
            return (
              <FormControlLabel
                key={choice}
                value={choice}
                control={<Radio />}
                label={choice}
                onClick={onChangeValue}
              />
            )
          })}
          <Button
            variant='contained'
            size='small'
            style={{ maxWidth: '100px' }}
            onClick={submitAnswer}
          >
            Submit
          </Button>
        </RadioGroup>
      </FormControl>
      <h3>{`${userScore} /${length}`}</h3>
    </Card>
  )
}

export default TriviaCard
