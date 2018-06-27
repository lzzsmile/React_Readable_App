import React from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'

export const EditButton = ({onEdit, onDelete}) => {
  return (
    <ButtonGroup bsSize="xsmall">
      <Button bsStyle="primary" onClick={() => {onEdit()}}>Edit</Button>
      <Button bsStyle="danger" onClick={() => {onDelete()}}>Delete</Button>
    </ButtonGroup>
  )
}
