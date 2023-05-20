import { Ref, defineComponent, onBeforeUnmount, ref } from "vue";
import List from "../List"
import Item from "./Item/Item.vue";
import ITodoList from "../../interface/ITodoListArray";
import AddItem from "./AddItem";
import emitter from "../../utils/emitter";
import saveItemSet from "./Item/saveItemSet";

export default defineComponent({
  props: {
    listData: Array
  },
  setup(props) {
    const list: Ref<ITodoList[]> = ref(props.listData) as Ref<ITodoList[]>
    const setOk = (id: number, okState: boolean) => {
      list.value.forEach((_item, index) => {
        if (list.value[index].id === id)
          list.value[index].ok = okState
      })
      saveItemSet(list.value)
    }
    const del = (id: number) => {
      list.value.forEach((_item, index) => {
        if (list.value[index].id === id)
          list.value.splice(index, 1)
      })
      saveItemSet(list.value)
    }

    const showAddItem = ref(false)
    emitter.on('showAddItem', () => {
      showAddItem.value = !showAddItem.value
    })
    onBeforeUnmount(() => emitter.off('showAddItem'))
    
    const add = (time: number, text: string) => {
      list.value.unshift({
        id: time,
        text: text,
        ok: false
      })
      saveItemSet(list.value)
    }

    return () => (
      <List bgColor="bg-#edd9b7">
        {showAddItem.value ? <AddItem onAdd={add}/> : null}
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