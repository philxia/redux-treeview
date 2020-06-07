import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Node extends Component {
  handleExpandOrCollapseNodeClick = () => {
    const {id, status, expandNode, collapseNode} = this.props;
    if (status === 0) { //// 0 for collapse, 1 for expand.
      expandNode(id);
    } else {
      collapseNode(id);
    }
  }

  handleAddChildClick = e => {
    e.preventDefault()

    const { addChild, createNode, id } = this.props
    const childId = createNode().nodeId
    addChild(id, childId)
  }

  handleRemoveClick = e => {
    e.preventDefault()

    const { removeChild, deleteNode, parentId, id } = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    )
  }

  render() {
    const { text, counter, status, parentId, childIds } = this.props
    return (
      <div>
        {text}: {counter}
        {' '}
        <button onClick={this.handleExpandOrCollapseNodeClick}>
          { status === 0 ? '+' : '-' }
        </button>
        {' '}
        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/anchor-is-valid
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <ul>
          {status === 1 && childIds.map(this.renderChild)}
          <li key="add">
            <a href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
              onClick={this.handleAddChildClick}
            >
              Add child
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

// function mapStateToProps(state, ownProps) {
//   return state[ownProps.id]
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addChild: (nodeId, childId) => { return dispatch(actions.addChild(nodeId, childId)) },
//     createNode: () => { return dispatch(actions.createNode()) },
//     removeChild: (nodeId, childId) => {return dispatch(actions.removeChild(nodeId, childId)) },
//     deleteNode: (nodeId) => {return dispatch(actions.deleteNode(nodeId)) },
//     expandNode: (nodeId) => {return dispatch(actions.expandNode(nodeId))},
//     collapseNode: (nodeId) => {return dispatch(actions.collapseNode(nodeId))}
//   };
// }

const ConnectedNode = connect((state, ownProps) => {state[ownProps.id]}, actions)(Node)
export default ConnectedNode
