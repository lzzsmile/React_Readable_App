import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import timeago from 'timeago.js'
import {Score} from './score'
import {EditButton} from './editButton'
import PostForm from './postForm'
import * as PostActions from '../actions/postActions'

class Post extends Component {
  state = {
    isEdit: false,
  }

  upvotePost(postId) {
    this.props.upvotePost(postId)
  }

  downvotePost(postId) {
    this.props.downvotePost(postId)
  }

  onEdit() {
    this.setState({isEdit: true})
  }

  onDelete(postId) {
    this.props.deletePost(postId)
    this.props.history.push('/')
  }

  handleSubmit() {
    this.setState({isEdit: false})
  }

  render() {
    const { post } = this.props
    const date = timeago().format(post.timestamp)
    const {isDetail} = this.props
    const {isEdit} = this.state
    return (
      <div>
        {isDetail && <h1>{post.title}</h1>}
        {!isDetail && <Link to={`/${post.category}/${post.id}`} ><h2>{post.title}</h2></Link>}
        <p>{date} | by {post.author} | in <Link to={`/${post.category}`}>{post.category}</Link> | comments: {post.commentCount}</p>
        <p>{post.body}</p>
        <Score
          score={post.voteScore}
          onUpvote={() => {this.upvotePost(post.id)}}
          onDownvote={() => {this.downvotePost(post.id)}} />
        <EditButton
          onEdit={() => {this.onEdit()}}
          onDelete={() => {this.onDelete(post.id)}} />
        {isEdit &&
          <div className="addPostContainer">
            <h2>Edit Post</h2>
            <PostForm
              isEdit={true}
              post={post}
              onSubmit={this.handleSubmit.bind(this)}
              onCancel={this.handleSubmit.bind(this)}
              categories={[]}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { posts } = state.posts
  return {posts}
}

const mapDispatchToProps = {
  ...PostActions
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
