import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import Post from './post'
import SortButton from './sortButton'
import PostForm from './postForm'
import * as PostActions from '../actions/postActions'
import * as CategoryActions from '../actions/categoryActions'
import {comparePostByDate, comparePostByScore} from '../utils/helper'

class PostsFragment extends Component {

  state = {
    isAdd: false,
  }

  componentWillMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  onAdd() {
    this.setState({isAdd: true})
  }

  handleSubmit() {
    this.setState({isAdd: false})
  }

  render() {
    const {posts, categories, preference} = this.props
    const {isAdd} = this.state
    const sortedPosts = preference === "byDate" ? comparePostByDate(posts) : comparePostByScore(posts)
    return (
      <div>
        <h1>All Posts</h1>
        <SortButton/>
        <ol>
          {sortedPosts.map((post) => (
            <Post key={post.id} isDetail={false} post={post}/>
          ))}
        </ol>
        <div className="addPostContainer">
          <Button bsStyle="primary" onClick={() => {this.onAdd()}}><h3>Add New Post</h3></Button>
        </div>
        {isAdd &&
          <PostForm
            isEdit={false}
            post={{}}
            onSubmit={this.handleSubmit.bind(this)}
            onCancel={this.handleSubmit.bind(this)}
            categories={categories}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { posts } = state.posts
  const {categories} = state.categories
  const {preference} = state.preferences
  return {posts, categories, preference}
}

const mapDispatchToProps = {
  ...PostActions,
  ...CategoryActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsFragment)
