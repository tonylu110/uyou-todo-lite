import { renderSlot, useSlots } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const List: SetupFC = () => {
  defineSlots<{
    default: () => any
  }>()

  const slots = useSlots()

  return () => (
    <PerfectScrollbar
      w="[calc(100vw-20px)]" h='[calc(100vh-100px)]'
      top-p0px px-10px bg="white/50 dark:#333/50"
      className="!fixed" pt-10px
    >
      { renderSlot(slots, 'default') }
    </PerfectScrollbar>
  )
}

export default List
