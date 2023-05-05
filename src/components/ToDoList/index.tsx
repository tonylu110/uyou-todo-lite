import { defineComponent, renderSlot } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import emitter from "../../utils/emitter";

export default defineComponent({
  setup(props, { slots }) {
    emitter.emit('bgColor', 'bg-#edd9b7')

    return () => (
      <PerfectScrollbar
        w="[calc(100vw-20px)]" h="[calc(100vh-110px)]"
        top-0 pt-100px px-10px pb-10px
        className="!fixed"
      >
        { renderSlot(slots, 'default') }
      </PerfectScrollbar>
    )
  }
})