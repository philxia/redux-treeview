import React from 'react'
import { shallow } from 'enzyme'
import ConnectedNode, { Node } from './Node'

function setup(id, counter, childIds, parentId, status) {
  const actions = {
    increment: jest.fn(),
    removeChild: jest.fn(),
    deleteNode: jest.fn(),
    createNode: jest.fn(),
    addChild: jest.fn(),
    expandNode: jest.fn(),
    collapseNode: jest.fn()
  }

  const eventArgs = {
    preventDefault: jest.fn()
  }

  const component = shallow(
    <Node id={id} text={'Counter'} counter={counter} parentId={parentId} childIds={childIds} status={status} {...actions} />
  )

  return {
    component: component,
    removeLink: component.findWhere(n => n.type() === 'a' && n.contains('×')),
    addLink: component.findWhere(n => n.type() === 'a' && n.contains('Add child')),
    button: component.find('button'),
    childNodes: component.find(ConnectedNode),
    actions: actions,
    eventArgs: eventArgs
  }
}

describe('Node component', () => {
  it('should display counter', () => {
    const { component } = setup(1, 23, [], undefined, 0)
    expect(component.text()).toMatch(/^Counter: 23/)
  })

  // 0 for collapse, 1 for expand.
  it('should call expand on button click when current status is collapse', () => {
    const { button, actions } = setup(1, 23, [], undefined, 0)
    button.simulate('click')

    expect(actions.expandNode).toBeCalledWith(1);
  })

  it('should call expand on button click', () => {
    const { button, actions } = setup(1, 23, [], undefined, 1)
    button.simulate('click')

    expect(actions.collapseNode).toBeCalledWith(1);
  })

  it('should not render remove link', () => {
    const { removeLink } = setup(1, 23, [], undefined, 0)
    expect(removeLink.length).toEqual(0)
  })

  it('should call createNode action on Add child click', () => {
    const { addLink, actions, eventArgs } = setup(2, 1, [], undefined, 0)
    actions.createNode.mockReturnValue({ nodeId: 3 })
    addLink.simulate('click', eventArgs)

    expect(actions.createNode).toBeCalled()
  })

  it('should call addChild action on Add child click', () => {
    const { addLink, actions, eventArgs } = setup(2, 1, [], undefined, 0)
    actions.createNode.mockReturnValue({ nodeId: 3 })

    addLink.simulate('click', eventArgs)

    expect(actions.addChild).toBeCalledWith(2, 3)
  })

  describe('when given childIds', () => {
    it('should render child nodes', () => {
      const { childNodes } = setup(1, 23, [ 2, 3 ], undefined, 1)
      expect(childNodes.length).toEqual(2)
    })
  })

  describe('when given parentId', () => {
    it('should call removeChild action on remove link click', () => {
      const { removeLink, actions, eventArgs } = setup(2, 1, [], 1, 0)
      removeLink.simulate('click', eventArgs)

      expect(actions.removeChild).toBeCalledWith(1, 2)
    })

    it('should call deleteNode action on remove link click', () => {
      const { removeLink, actions, eventArgs } = setup(2, 1, [], 1, 0)
      removeLink.simulate('click', eventArgs)

      expect(actions.deleteNode).toBeCalledWith(2)
    })
  })
})
