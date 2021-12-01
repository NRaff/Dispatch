import React from "react";

class ThreadItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.setActive = this.setActive.bind(this)
  }

  componentDidMount(){
    this.props.createSocket();
  }

  handleDelete(e){
    e.preventDefault()
    e.stopPropagation()
    this.props.deleteThread()
  }

  renderUnreads(){
    if (this.props.unreads > 0 && this.props.activeThread != this.props.thread.id) {
      return (
        <div className="inline-notify">
          <span>{this.props.unreads}</span>
        </div>
      )
    }
  }

  setActive(e){
    this.props.setActiveThread()
    
    let oldActive = document.getElementsByClassName('active-thread')[0]
    if (oldActive) oldActive.classList.remove('active-thread')
    e.currentTarget.classList.add('active-thread')
  }


  render(){
    const { thread } = this.props
    return (
      <div
        className='thread-item'
        onClick={this.setActive}
      >
        <h3>{thread.name}</h3>
        {this.renderUnreads()}
        <button
          onClick={this.handleDelete}
        >🗑</button>
      </div>
    )
  }
}

export default ThreadItem;