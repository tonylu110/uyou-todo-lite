import { createVNode, defineComponent, render } from "vue"

interface IProps {
  msg: string
  center?: boolean
}

export const createToast = (node: Element, { msg, center }: IProps) => {
  const vm = createVNode(defineComponent({
    props: {
      msg: {
        default: 'toast'
      },
      center: Boolean
    },
    setup(props: IProps) {
      return () => (
        <div
          p-7px
          rounded-5px
          font-bold
          c="#996b3d" bg="#fff6dc" shadow="sm black/30"
          animate-duration-300 animate-fill-mode-forwards animate-ease
          top={props.center ? '50%' : ''}
          left="50%"
          translate={props.center ? '[-50%]' : 'x-[-50%]'}
          position={props.center ? 'absolute' : 'fixed'}
          class={props.center ? '' : 'animate-toastShow'}
        >
          { props.msg }
        </div>
      )
    }
  }), { msg, center })

  const container = document.createElement('div')
  render(vm, container)

  node.append(container)
  setTimeout(() => {
    node.removeChild(container)
  }, 1000)

  return vm
}