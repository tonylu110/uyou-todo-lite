import { ref, renderSlot, useSlots } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import emitter from '../../utils/emitter'

const List: SetupFC = () => {
  const props = withDefaults(defineProps<{
    bgColor: string
  }>(), {
    bgColor: 'bg-#eee',
  })

  defineSlots<{
    default: () => any
  }>()

  const slots = useSlots()

  emitter.emit('bgColor', props.bgColor)

  const noTitleBar = ref(localStorage.getItem('noTitleBar') === 'true')
  emitter.on('noTitleBar', (data) => {
    noTitleBar.value = data as boolean
  })

  return () => (
    <PerfectScrollbar
      w="[calc(100vw-20px)]" h={noTitleBar.value ? '[calc(100vh-60px)]' : '[calc(100vh-100px)]'}
      top-p0px px-10px bg="white/50 dark:#333/50"
      className="!fixed" pt-10px
    >
      { renderSlot(slots, 'default') }
    </PerfectScrollbar>
  )
}

export default List
