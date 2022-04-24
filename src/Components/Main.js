import React from 'react'
import Button from './Button'
import Confetti from "react-confetti"


export default function Main({numberOfDice, dice, clickDie, clickRoll, finished}) {
  const buttons = []

  for (let i = 0; i < numberOfDice; i++) {
    buttons.push(<Button
      key={i}
      id={i}
      clsName={`dice-button${dice[i].locked ? ' locked' : ''}`}
      isDie={true}
      onclick={clickDie}
    >
      {dice[i].value}
    </Button>)
  }


  return (
    <main>
      {finished && <Confetti />}
      <div className="dice-wrapper">
        {buttons}
      </div>
      <Button
        clsName="roll-button"
        isDie={false}
        onclick={clickRoll}
      >
        {finished ? 'Reset' : 'Roll'}
      </Button>
    </main>
  )
}

