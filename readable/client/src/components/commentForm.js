import React, {Component} from 'react'
import {FormGroup, FormControl, ControlLabel, Button, ButtonGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as CommentActions from '../actions/commentActions'

class CommentForm extends Component {

  state = {
    author: '',
    body: ''
  }

  getEditSubmitStatus() {
    const {body} = this.state
    return (body < 1)
  }

  getAddSubmitStatus() {
    const {author, body} = this.state
    return (author < 1 || body < 1)
  }

  handleSubmit(event) {
    event.preventDefault()
    const {isEdit, onSubmit, parentId, comment} = this.props
    const { author, body } = this.state
    if (isEdit) {
      this.props.editComment(comment.id, body)
    } else {
      this.props.addComment(parentId, author, body)
    }
    onSubmit()
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleCancel() {
    const {onCancel} = this.props
    onCancel()
  }

  render() {
    const {isEdit, comment} = this.props
    const {author, body} = this.state
    if (isEdit) {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="author">
            <ControlLabel>Author</ControlLabel>
            <FormControl.Static>{comment.author}</FormControl.Static>
          </FormGroup>
          <FormGroup controlId="body">
            <ControlLabel>Body</ControlLabel>
            <FormControl type="text" name="body" placeholder="Body" value={body} onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <ButtonGroup>
            <Button bsStyle="primary" type="submit" disabled={this.getEditSubmitStatus()}>Save</Button>
            <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
          </ButtonGroup>
        </form>
      )
    } else {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="author">
            <ControlLabel>Author</ControlLabel>
            <FormControl type="text" name="author" placeholder="Author" value={author} onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup controlId="body">
            <ControlLabel>Body</ControlLabel>
            <FormControl type="text" name="body" placeholder="Body" value={body} onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <ButtonGroup>
            <Button bsStyle="primary" type="submit" disabled={this.getAddSubmitStatus()}>Add</Button>
            <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
          </ButtonGroup>
        </form>
      )
    }
  }

}

const mapStateToProps = state => {
  const { comments } = state.comments
  return {comments}
}

const mapDispatchToProps = {
  ...CommentActions
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
