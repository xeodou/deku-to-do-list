/*
* deku-todo - index.js
* Copyright(c) 2015 xeodou <xeodou@gmail.com>
* MIT Licensed
*/

/** @jsx element */
import {createApp, element} from 'deku'

let Todo = {
  propTypes: {
    item: {
      type: 'string'
    }
  },

  render({ props, dispatch }) {
    let {item} = props

    let onRemove = (data, event) => {
      dispatch({
        type: 'REMOVE',
        data: data
      })
    }
    return (
      <div>
        {item}
        <a href='javascript:' onClick={onRemove.bind(null, item)}>Remove</a>
      </div>
    )
  }
}

let Add = {
  name: 'Add',

  render ({ props, dispatch }) {
    let {add} = props

    function onAdd(e) {
      if(e != null && e.keyCode == 13) {
        dispatch({
          type: 'ADD',
          data: e.target.value
        })
        e.target.value = ''
      }
    }

    return <input type="text" onKeyDown={onAdd} placeholder="to do..."></input>
  }

}

let List = {
  defaultProps: {
    items: []
  },

  propTypes: {
    items:{
      type: 'array'
    }
  },

  render({props}) {
    let children = props.items.map(function(i){
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

let render = createApp(document.body, action => {
  switch (action.type) {
    case 'REMOVE':
      items = items.filter(i => {
        return i != action.data
      })
      break
    case 'ADD':
      items.push(action.data)
      break
  }
  render(<List items={items}/>)
})

render(<List items={items}/>)
