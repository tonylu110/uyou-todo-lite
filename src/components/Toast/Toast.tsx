import { usePreferredDark } from '@vueuse/core'

const Toast: SetupFC = () => {
  const props = withDefaults(defineProps<{
    msg: string
    center?: boolean
  }>(), {
    msg: 'toast',
  })

  const isDark = usePreferredDark()

  return () => (
    <div
      p="x-21px y-7px" z-10000 rounded-full font-bold
      c={isDark.value ? '#bbb' : '#555'}
      bg={isDark.value ? '#777/70' : 'white/70'}
      shadow="sm black/30" text-center
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
