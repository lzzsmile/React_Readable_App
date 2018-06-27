import React from 'react'
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap'

export const Score = ({score, onUpvote, onDownvote}) => {
  return (
    <ButtonGroup bsSize="xsmall" className="scoreButtons">
        <Button><Glyphicon glyph="triangle-bottom" onClick={() => {onDownvote()}}/></Button>
        <div className="btn score-label">{score}</div>
        <Button><Glyphicon glyph="triangle-top" onClick={() => {onUpvote()}}/></Button>
    </ButtonGroup>
  )
}
