import React from "react";


class ThreadItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.setActive = this.setActive.bind(this)
  }

  componentDidMount(){
    //setup websocket for thread
    this.props.createSocket();
  }

  handleDelete(e){
    e.preventDefault()
    //stop propagation to avoid triggering the set active as well
    e.stopPropagation()
    this.props.deleteThread()
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
        <button
          onClick={this.handleDelete}
        >🗑</button>
      </div>
    )
  }
}

export default ThreadItem;