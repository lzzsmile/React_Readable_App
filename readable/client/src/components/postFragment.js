import React, {Component} from 'react'
import {connect} from 'react-redux'
import Comment from './comment'
import CommentForm from './commentForm'
import * as CommentActions from '../actions/commentActions'
import * as PostActions from '../actions/postActions'
import Post from './post'
import {Button} from 'react-bootstrap'

class PostFragment extends Component {

  state = {
    isAdd: false
  }

  componentWillMount() {
    const {postId} = this.props.match.params
    this.props.loadPost(postId)
    this.props.loadComments(postId)
  }

  handleSubmit() {
    this.setState({isAdd: false})
  }

  onAdd() {
    this.setState({isAdd: true})
  }

  isValidPost(post) {
    return (post.id)
  }

  render() {
    const {post, comments} = this.props
    const {isAdd} = this.state
    if (this.isValidPost(post)) {
      return (
        <div>
          <Post isDetail={true} post={post} />
          <h2>Comments ({comments.length})</h2>
          <ol>
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment}/>
            ))}
          </ol>
          <div className="addCommentContainer">
            <Button bsStyle="primary" onClick={() => {this.onAdd()}}><h5>Add New Comment</h5></Button>
          </div>
          {isAdd &&
            <CommentForm
              isEdit={false}
              comment={{}}
              onSubmit={() => {this.handleSubmit.bind(this)}}
              onCancel={() => {this.handleSubmit.bind(this)}}
              parentId={post.id}
            />
          }
        </div>
      )
    } else {
      return (
        <div>
          <h1><strong>Post Not Exist</strong></h1>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  const { post } = state.posts
  const { comments } = state.comments
  return {post, comments}
}

const mapDispatchToProps = {
  ...CommentActions,
  ...PostActions
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFragment)
