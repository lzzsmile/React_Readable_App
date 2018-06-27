import React, {Component} from 'react'
import {connect} from 'react-redux'
import timeago from 'timeago.js'
import {Score} from './score'
import {EditButton} from './editButton'
import CommentForm from './commentForm'
import * as CommentActions from '../actions/commentActions'

class Comment extends Component {

  state = {
    isEdit: false
  }

  upvoteComment(commentId) {
    this.props.upvoteComment(commentId)
  }

  downvoteComment(commentId) {
    this.props.downvoteComment(commentId)
  }

  onEdit() {
    this.setState({isEdit: true})
  }

  onDelete(commentId, parentId) {
    this.props.deleteComment(commentId, parentId)
  }

  handleSubmit() {
    this.setState({isEdit: false})
  }

  render() {
    const { comment } = this.props
    const date = timeago().format(comment.timestamp)
    const {isEdit} = this.state
    return (
      <div>
        <h3>{comment.body}</h3>
        <p>{date} | by {comment.author}</p>
        <Score
          score={comment.voteScore}
          onUpvote={() => {this.upvoteComment(comment.id)}}
          onDownvote={() => {this.downvoteComment(comment.id)}}/>
        <EditButton
          onEdit={() => {this.onEdit()}}
          onDelete={() => {this.onDelete(comment.id, comment.parentId)}} />
        {isEdit &&
          <div className="addCommentContainer">
            <h2>Edit Comment</h2>
            <CommentForm
              isEdit={true}
              comment={comment}
              onSubmit={this.handleSubmit.bind(this)}
              onCancel={this.handleSubmit.bind(this)}
              parentId={comment.parentId}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { comments } = state.comments
  return {comments}
}

const mapDispatchToProps = {
  ...CommentActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
