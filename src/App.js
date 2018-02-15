import React, { Component } from 'react';
import { view, store } from 'react-easy-state'

const makeNode = () => {
  const node = store({
    label: 'This is a node',
    children: [],
    type: 'node',
    highlighted: false,
    selected: false,

    addChild () {
      node.children.push(makeNode())
    },
  })
  return node
}

const ux = store({
  selectedNodes: [],
})

class App extends Component {
  constructor () {
    super()
    this.root = makeNode()
  }

  render() {
    return (
      <div className="App">
        <Node node={this.root}/>
        <CanvasNode node={this.root}/>
      </div>
    );
  }
}

const CanvasNode = view(({ node }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        outline: ux.selectedNodes[0] === node ? '1px dashed blue'
          : node.highlighted ? '1px dashed red' : undefined,
        margin: '5px',
        padding: '5px',
        display: 'flex',
      }}
      onDoubleClick={event => {
        event.stopPropagation()
        event.preventDefault()
        node.addChild()
      }}
      onClick={event => {
        event.stopPropagation()
        ux.selectedNodes = [node]
      }}
      onMouseOver={event => {
        event.stopPropagation()
        node.highlighted = true
      }}
      onMouseOut={event => {
        event.stopPropagation()
        node.highlighted = false
      }}
    >
      { node.children.map((child) => <CanvasNode node={child}/>) }
    </div>
  )
})

const Node = view(({ node }) => {
  return (
    <div
      style={{
        marginLeft: '10px',
        outline: ux.selectedNodes[0] === node ? '1px dashed blue'
          : node.highlighted ? '1px dashed red' : undefined,
      }}
    >
      <label
        onDoubleClick={event => {
          event.stopPropagation()
          event.preventDefault()
          node.addChild()
        }}
        onClick={event => {
          event.stopPropagation()
          ux.selectedNodes = [node]
        }}
        onMouseOver={event => {
          event.stopPropagation()
          node.highlighted = true
        }}
        onMouseOut={event => {
          event.stopPropagation()
          node.highlighted = false
        }}
      >
        { node.label }
      </label>

      <div>
        { node.children.map((child) => <Node node={child}/>) }
      </div>
    </div>
  )
})

export default view(App);
