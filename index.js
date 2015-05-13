/*
* deku-todo - index.js
* Copyright(c) 2015 xeodou <xeodou@gmail.com>
* MIT Licensed
*/

/** @jsx element */
import {tree,render,renderString, element} from 'deku'

let Todo = {

  name: 'Todo',

  propTypes: {
    item: {
      type: 'string'
    },
    remove: {
      source: 'removeTodo'
    }
  },

  render(c) {
    let {props} = c
    let {item, remove} = props

    function onRemove() {
      remove(item)
    }

    return (
      <div>
        {item}
        <a href='javascript:;' onClick={onRemove}>Remove</a>
      </div>
    )
  }
}

let Add = {

  name: 'Add',

  propTypes: {
    add : {
      source : "addTodo"
    }
  },

  render (c) {
    let {props} = c
    let {add} = props

    function onAdd(e) {
      if(e != null && e.keyCode == 13) {
        add(e.target.value)
        e.target.value = ''
      }
    }

    return <input type="text" onKeyDown={onAdd} placeholder="to do..."></input>
  }

}

let List = {

  name: 'list',

  defaultProps: {
    items: []
  },

  propTypes: {
    items:{
      type: 'array'
    }
  },

  render(c) {
    let {props, state} = c
    let children = items.map(function(i){
      return <Todo item={i}/>
    })
    return (
      <div>
        <Add />
        {children}
      </div>
    )
  }
}

let items = []

let app = tree(<List items={items}/>)

app.set('removeTodo', function(v) {
  items = items.filter(i => {
    return i != v
  })
  app.mount(
    <List items={items} />
  )
})

app.set('addTodo', function(i) {
  items.push(i)
  app.mount(
    <List items={items} />
  )
})

render(app, document.body)
