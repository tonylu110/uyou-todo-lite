import { defineComponent, renderSlot } from "vue";
import List from "../List"

export default defineComponent({
  setup() {
    return () => (
      <List bgColor="bg-#edd9b7">
        home
      </List>      
    )
  }
})