import { ref, watchEffect } from 'vue'
import emitter from '../../utils/emitter'
import getCloudTodo from '../../utils/getCloudTodo'
import WindowButton from './WindowButton'

const TabBar: SetupFC = () => {
  const props = withDefaults(defineProps<{
    title: string
    showLeftImg?: boolean
    leftImg?: string
    showRightImg?: boolean
    bgColor?: string
  }>(), {
    title: 'title',
    showLeftImg: false,
    leftImg: 'i-fluent:chevron-left-16-filled',
    showRightImg: false,
    bgColor: 'default',
  })

  const emit = defineEmits<{
    leftFn: []
  }>()

  const isLight = ref(props.bgColor === 'light')

  watchEffect(() => {
    isLight.value = props.bgColor === 'light'
    emitter.emit('titleColor', isLight.value)
  })

  return () => (
    <>
      <div
        data-tauri-drag-region
        sticky h-90px w-screen z-1
        flex justify-between items-center
        bg="white/50 dark:#333/50"
      >
        <div
          m="l-12px y-12px" h="[calc(100%-24px)]"
          flex="~ col" justify-between
        >
          {props.showLeftImg
            ? (
              <div
                bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
                h-30px w-30px cursor-pointer
                flex justify-center items-center rounded-5px
                onClick={() => emit('leftFn')}
              >
                <div className={props.leftImg} c="#555 dark:#bbb" text-20px></div>
              </div>)
            : null}
          <div data-tauri-drag-region font-bold c="#555 dark:#bbb" text-18px>{props.title}</div>
        </div>
        <div
          m="r-12px y-12px" h="[calc(100%-24px)]"
          flex="~ col" justify-between items-end
        >
          <WindowButton/>
          <div flex items-center>
            {props.showRightImg && localStorage.getItem('uid')
              ? <div
                  bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
                  h-30px w-30px cursor-pointer mr-10px
                  flex justify-center items-center rounded-5px
                  onClick={() => getCloudTodo()}
                >
                  <div i-ph:file-cloud-bold c="#555 dark:#bbb" text-20px></div>
                </div>
              : null}
            {props.showRightImg
              ? <div
                  bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
                  h-30px w-30px cursor-pointer
                  flex justify-center items-center rounded-5px
                  onClick={() => emitter.emit('showAddItem')}
                >
                  <div i-ph:plus-circle-bold c="#555 dark:#bbb" text-20px></div>
                </div>
              : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default TabBar
