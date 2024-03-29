import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import List from '../List'
import type ITodoList from '../../interface/ITodoListArray'
import emitter from '../../utils/emitter'
import Item from './Item/Item.vue'
import AddItem from './AddItem'
import saveItemSet from './Item/saveItemSet'

const ToDoList: SetupFC = () => {
  const props = defineProps<{
    listData: ITodoList[]
  }>()

  const { t } = useI18n()

  const list = ref(props.listData)
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
      text,
      ok: false,
    })
    saveItemSet(list.value)
  }

  const showNotDo = ref(localStorage.getItem('showNotDo') === 'true')
  const setShowNotDo = () => {
    showNotDo.value = !showNotDo.value
    localStorage.setItem('showNotDo', `${showNotDo.value}`)
  }

  onMounted(() => {
    emitter.on('todoData', (data: unknown) => {
      list.value = data as ITodoList[]
    })
  })

  return () => (
    <List>
      {showAddItem.value ? <AddItem onAdd={add}/> : null}
      {list.value.filter(listData => !listData.ok).map((item) => {
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
      {list.value.filter(listData => listData.ok).length !== 0
        ? <div
            bg="white/50 dark:#333/50 active:white/70 dark:active:#333/70"
            w-fit whitespace-nowrap
            mb-10px p-x-10px p-y-5px rounded-5px c="#555 dark:#bbb" font-bold
            flex items-center cursor-pointer shadow="sm black/30"
            onClick={setShowNotDo}
          >
            <div i-fluent:caret-down-12-filled text-18px mr-5px rotate={showNotDo.value ? '0' : '-90'} transition-300></div>
              {t('completed')}
            <div
              ml-5px text-10px
              rounded-20px bg="#555 dark:#bbb"
              c="white dark:#333"
              w-1rem h-1rem font-normal
              flex items-center justify-center
            >
              {list.value.filter(listData => listData.ok === true).length}
            </div>
          </div>
        : null
      }
      {showNotDo.value
        ? (
        <>
          {list.value.filter(listData => listData.ok).map((item) => {
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
        </>
          )
        : null}
    </List>
  )
}

export default ToDoList
