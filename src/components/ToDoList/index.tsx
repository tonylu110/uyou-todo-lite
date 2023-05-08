import { Ref, defineComponent, ref } from "vue";
import List from "../List"
import Item from "./Item/Item.vue";
import ITodoList from "../../interface/ITodoListArray";
import LocalStorage from "../../utils/localStorage";

export default defineComponent({
  props: {
    listData: Array
  },
  setup(props) {
    const list: Ref<ITodoList[]> = ref(props.listData) as Ref<ITodoList[]>
    const isOk = ref(false)
    const setOk = (id: number, okState: boolean) => {
      list.value.forEach((_item, index) => {
        if (list.value[index].id === id)
          list.value[index].ok = okState
      })
      LocalStorage('set', {
        data: list.value
      })
    }
    const del = (id: number) => {

    }

    return () => (
      <List bgColor="bg-#edd9b7">
        {list.value.map((item) => {
          return (
            <Item 
              time={item.id}
              text={item.text}
              isOk={item.ok}
              key={item.id}
              onSetOk={setOk}
              onDel={del}
            />
          )
        })}
      </List>      
    )
  }
})