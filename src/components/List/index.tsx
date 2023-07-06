import { defineComponent, ref, renderSlot } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import emitter from '../../utils/emitter'

export default defineComponent({
  props: {
    bgColor: {
      default: 'bg-#eee',
      type: String,
    },
  },
  setup(props, { slots }) {
    emitter.emit('bgColor', props.bgColor)

    const noTitleBar = ref(localStorage.getItem('noTitleBar') === 'true')
    emitter.on('noTitleBar', (data) => {
      noTitleBar.value = data as boolean
    })

    return () => (
      <PerfectScrollbar
        w="[calc(100vw-20px)]" h={noTitleBar.value ? '[calc(100vh-60px)]' : '[calc(100vh-100px)]'}
        top-0 pt={noTitleBar.value ? '60px' : '100px'} px-10px
        className="!fixed"
      >
        { renderSlot(slots, 'default') }
      </PerfectScrollbar>
    )
  },
})
