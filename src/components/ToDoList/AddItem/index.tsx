import { ref, watchEffect } from 'vue'
import emitter from '../../../utils/emitter'

const AddItem: SetupFC = () => {
  const emit = defineEmits<{
    add: [id: number, text: string]
  }>()

  const text = ref('')
  const showAddButton = ref(false)
  const time = ref(new Date().getTime())

  watchEffect(() => {
    showAddButton.value = text.value !== ''
  })

  const add = () => {
    emit('add', time.value, text.value)
    emitter.emit('showAddItem')
  }

  const enterAddItem = localStorage.getItem('enterAddItem') === 'true'

  return () => (
    <>
      <div
        relative w="[calc(100vw-40px)]"
        bg="white/50 dark:#333/50" h-auto p-10px mb-10px
        rounded-5px shadow="sm black/30"
      >
        <textarea
          c="#555 dark:#bbb" border-none
          max-w="100%" min-w="100%"
          outline-none bg-transparent resize-none
          text-1rem bg="selection:#dcc6a9"
          rows="4"
          v-focus
          v-model={text.value}
          onKeydown={(e: KeyboardEvent) => e.code.toLocaleLowerCase() === 'enter' && enterAddItem ? add() : null}
        />
      </div>
      <div
        w="100%" mb-10px
        flex justify-center items-center
        overflow-hidden rounded-7px
      >
        <button
          border="3px solid white" c-white
          rounded-7px cursor-pointer
          flex items-center justify-center p-y-5px
          transition="width margin 300 ease-in-out"
          shadow="sm black/30"
          bg="#00b600 active:#00a600"
          m={showAddButton.value ? 'r-10px' : 'l-[-18px]'} w={showAddButton.value ? '50%' : '0px'}
          onClick={add}
        >
          <div i-mdi:check-bold text-24px></div>
        </button>
        <button
          border="3px solid white" c-white
          rounded-7px cursor-pointer
          flex items-center justify-center p-y-5px
          transition="width margin 300 ease-in-out"
          shadow="sm black/30"
          bg="#d6010f active:#b6000b"
          w={showAddButton.value ? '50%' : '100%'}
          onClick={() => emitter.emit('showAddItem')}
        >
          <div i-mdi:close-thick text-24px></div>
        </button>
      </div>
    </>
  )
}

export default AddItem
