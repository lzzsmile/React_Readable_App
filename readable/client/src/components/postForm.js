import React, {Component} from 'react'
import {FormGroup, FormControl, ControlLabel, Button, ButtonGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as PostActions from '../actions/postActions'
import * as CategoryActions from '../actions/categoryActions'

class PostForm extends Component {

  state = {
    author: '',
    category: '',
    title: '',
    body: '',
  }

  handleSubmit(event) {
    event.preventDefault()
    const {author, category, title, body} = this.state
    const {isEdit, post, onSubmit} = this.props
    if(isEdit) {
      this.props.editPost(post.id, title, body)
    } else {
      this.props.addPost(author, category, title, body)
    }
    onSubmit()
  }

  handleCancel() {
    const {onCancel} = this.props
    onCancel()
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  getEditSubmitStatus() {
    const {title, body} = this.state
    return (title < 1 || body < 1)
  }

  getAddSubmitStatus() {
    const {author, category, title, body} = this.state
    return (author < 1 || category < 1 || title < 1 || body < 1)
  }

  render() {
    const {isEdit, post, categories} = this.props
    const {author, category, title, body} = this.state
    if (isEdit) {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="author">
            <ControlLabel>Author</ControlLabel>
            <FormControl.Static>{post.author}</FormControl.Static>
          </FormGroup>
          <FormGroup controlId="category">
            <ControlLabel>Category</ControlLabel>
            <FormControl.Static>{post.category}</FormControl.Static>
          </FormGroup>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" name="title" placeholder="Title" value={title} onChange={this.handleChange.bind(this)}/>
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
          <FormGroup controlId="category">
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" name="category" placeholder="select category" value={category} onChange={this.handleChange.bind(this)}>
              <option value="select">Select category</option>
              {
                categories.categories.map(category => (
                  <option key={category.path} value={category.path}>{category.name}</option>
                ))
              }
            </FormControl>
          </FormGroup>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" name="title" placeholder="Title" value={title} onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <FormGroup controlId="body">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" name="body" placeholder="Body" value={body} onChange={this.handleChange.bind(this)}/>
          </FormGroup>
          <ButtonGroup>
            <Button bsStyle="primary" type="submit" disabled={this.getEditSubmitStatus()}>Add</Button>
            <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
          </ButtonGroup>
        </form>
      )
    }
  }
}

const mapStateToProps = state => {
  const { posts } = state.posts
  return {posts}
}

const mapDispatchToProps = {
  ...PostActions,
  ...CategoryActions
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm))
