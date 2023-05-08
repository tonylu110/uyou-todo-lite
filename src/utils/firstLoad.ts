import LocalStorage from "./localStorage";

const firstLoad = () => {
  const firstToDo = {
    data: [
      {
        text: 'Welcome to use uyou ToDo',
        id: new Date().getTime(),
        ok: false
      },
      {
        text: 'Move the mouse to the left of the ToDo item to complete the ToDo',
        id: new Date().getTime() + 1,
        ok: false
      },
      {
        text: 'Move the mouse to the right of the ToDo item to delete the ToDo',
        id: new Date().getTime() + 3,
        ok: false
      },
      {
        text: 'Move the mouse to the top right corner of the ToDo title bar to copy the ToDo content',
        id: new Date().getTime() + 4,
        ok: false
      }
    ]
  }
  if (localStorage.getItem('ToDo') === null) {
    LocalStorage('set', firstToDo)
  }
}

export default firstLoad;