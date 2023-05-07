import { defineComponent, renderSlot } from "vue";
import List from "../List"
import Item from "./Item/Item.vue";

export default defineComponent({
  setup() {
    return () => (
      <List bgColor="bg-#edd9b7">
        <Item/>
      </List>      
    )
  }
})