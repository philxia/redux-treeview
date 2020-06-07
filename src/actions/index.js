export const INCREMENT = 'INCREMENT'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const EXPAND_NODE = 'EXPAND_NODE'
export const COLLAPSE_NODE = 'COLLAPSE_NODE'

let nextId = 0
export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: `new_${nextId++}`,
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})

export const expandNode = (nodeId) => ({
  type: EXPAND_NODE,
  nodeId,
  status: 1
})

export const collapseNode = (nodeId) => ({
  type: COLLAPSE_NODE,
  nodeId,
  status: 0
})
