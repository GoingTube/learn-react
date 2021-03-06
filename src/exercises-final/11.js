// Making HTTP requests
import React from 'react'
import axios from 'axios'

class UserCompany extends React.Component {
  state = {company: undefined, loaded: false}
  fetchCompany = () => {
    axios({
      url: 'https://api.github.com/graphql',
      method: 'post',
      data: {
        query: `{
          user(login: "${this.props.username}") {
            company
          }
        }`,
      },
      headers: {
        Authorization: `bearer I DELETED THE TOKEN. YOU'LL HAVE TO MAKE YOUR OWN`,
      },
    }).then(
      response => {
        this.setState({
          loaded: true,
          company: response.data.data.user.company,
        })
      },
      error => {
        this.setState({
          error,
          loaded: true,
        })
      },
    )
  }
  componentDidMount() {
    this.fetchCompany()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      this.fetchCompany()
    }
  }
  render() {
    return this.state.loaded
      ? this.state.error
        ? 'ERROR (You probably need to add your own token)'
        : this.state.company || 'Unknown'
      : '...'
  }
}

class Usage extends React.Component {
  state = {username: undefined}
  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      username: this.inputNode.value,
    })
  }
  render() {
    const {username} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref={node => (this.inputNode = node)} />
        </form>
        {username ? <UserCompany username={username} /> : null}
      </div>
    )
  }
}
Usage.title = 'Making HTTP requests'

export default Usage
