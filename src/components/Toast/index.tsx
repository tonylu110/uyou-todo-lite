import { createVNode, render } from 'vue'
import Toast from './Toast'

interface IProps {
  msg: string
  center?: boolean
}

export function createToast({ msg, center }: IProps, node?: Element) {
  const vm = createVNode(Toast, { msg, center })

  const container = document.createElement('div')
  render(vm, container)

  const domNode = node || document.body

  domNode?.append(container)
  setTimeout(() => {
    domNode?.removeChild(container)
  }, 1000)

  return vm
}
