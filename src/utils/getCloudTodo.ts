import emitter from "./emitter"
import LocalStorage from "./localStorage"

export default () => {
  fetch('https://api.todo.uyou.org.cn/gettodo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid: localStorage.getItem('uid')
    })
  }).then(res => {
    return res.json()
  }).then(res => {
    localStorage.setItem('ToDo', res.data)
    emitter.emit('todoData', LocalStorage('get'))
  })
}