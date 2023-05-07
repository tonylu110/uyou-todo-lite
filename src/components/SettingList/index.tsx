import { defineComponent, renderSlot } from "vue";
import List from "../List";

export default defineComponent({
  setup(_props, { slots }) {
    return () => (
      <List>
        {renderSlot(slots, 'default')}
      </List>
    )
  }
})