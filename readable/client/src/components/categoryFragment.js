import React, {Component} from 'react'
import {connect} from 'react-redux'
import Post from './post'
import SortButton from './sortButton'
import * as PostActions from '../actions/postActions'
import * as CategoryActions from '../actions/categoryActions'
import {comparePostByDate, comparePostByScore} from '../utils/helper'

class CategoryFragment extends Component {

  componentWillMount() {
    const {category} = this.props.match.params
    this.props.loadCategoryPosts(category)
    this.props.loadCategories()
  }

  categoryExist() {
    const {posts} = this.props
    return posts.length > 0
  }

  render() {
    const {posts, preference} = this.props
    const {category} = this.props.match.params
    const sortedPosts = preference === "byDate" ? comparePostByDate(posts) : comparePostByScore(posts)
    return (
      <div>
        {this.categoryExist() &&
          <div>
           <h1>Posts for Category: <strong>{category}</strong></h1>
           <SortButton/>
          </div>
        }
        {!this.categoryExist() &&
          <h1>No Posts Found for Category: <strong>{category}</strong></h1>
        }
        {sortedPosts.length > 0 &&
          <ol>
            {sortedPosts.map(post => <Post key={post.id} isDetail={false} post={post} />)}
          </ol>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {preference} = state.preferences
  const {posts} = state.posts
  const {categories} = state.categories
  return {posts, preference, categories}
}

const mapDispatchToProps = {
  ...PostActions,
  ...CategoryActions
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFragment)
