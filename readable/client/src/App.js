import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {connect} from 'react-redux'
import {Switch, Route, withRouter} from 'react-router-dom'
import {NavigationBar} from './components/navigationBar'
import PostsFragment from './components/postsFragment'
import PostFragment from './components/postFragment'
import CategoryFragment from './components/categoryFragment'
import * as PostActions from './actions/postActions'

class App extends Component {

  componentWillMount() {
    this.props.loadPosts()
  }

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={PostsFragment}/>
            <Route exact path='/:category/:postId' component={PostFragment}/>
            <Route exact path='/:category' component={CategoryFragment}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {posts} = state.posts
  return {posts}
}

const mapDispatchToProps = {
  ...PostActions
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
