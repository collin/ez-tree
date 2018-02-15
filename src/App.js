import React, { Component } from 'react';
import { view, store } from 'react-easy-state'

const makeNode = () => {
  const node = store({
    label: 'This is a node',
    children: [],
    type: 'node',
    highlighted: false,

    addChild () {
      node.children.push(makeNode())
    },
  })
  return node
}

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
        outline: node.highlighted ? '1px dashed red' : undefined,
        margin: '5px',
        padding: '5px',
        display: 'flex',
      }}
      onClick={event => {
        node.addChild()
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
        outline: node.highlighted ? '1px dashed red' : undefined,
      }}
    >
      <label
        onClick={event => {
          node.addChild()
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
