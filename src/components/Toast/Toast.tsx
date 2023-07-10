const Toast: SetupFC = () => {
  const props = withDefaults(defineProps<{
    msg: string
    center?: boolean
  }>(), {
    msg: 'toast',
  })

  return () => (
    <div
      p-7px z-10000
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

export default Toast
