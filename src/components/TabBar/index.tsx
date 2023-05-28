import { defineComponent, ref, watchEffect } from "vue";
import emitter from "../../utils/emitter";
import getCloudTodo from "../../utils/getCloudTodo";
import { appWindow } from "@tauri-apps/api/window";
import Dialog from "../Dialog/Dialog.vue";

export default defineComponent({
  props: {
    title: {
      default: 'title',
      type: String
    },
    showLeftImg: {
      default: false,
      type: Boolean
    },
    leftImg: {
      default: 'i-fluent:chevron-left-16-filled',
      type: String
    },
    showRightImg: {
      default: false,
      type: Boolean
    },
    bgColor: {
      default: 'default',
      type: String
    }
  },
  emits: ['leftFn'],
  setup(props, { emit }) {
    const isLight = ref(props.bgColor === 'light')

    const pin = ref(localStorage.getItem('pin') === 'true')
    appWindow.setAlwaysOnTop(pin.value)

    const pinWindow = () => {
      pin.value = !pin.value
      localStorage.setItem('pin', pin.value + '')
      appWindow.setAlwaysOnTop(pin.value)
    }

    watchEffect(() => {
      isLight.value = props.bgColor === 'light'
      emitter.emit('titleColor', isLight.value)
    })

    const noTitleBar = ref(localStorage.getItem('noTitleBar') === 'true')
    emitter.on('noTitleBar', data => {
      noTitleBar.value = data as boolean
    })

    const dialogShow = ref(false)

    return () => (
      <>
        <div 
          data-tauri-drag-region
          backdrop-blur-5px
          bg={isLight.value ? 'white/50' : '#7a695cdd'} sticky top={noTitleBar.value ? '0' : '41px'}
          h-50px w-screen z-1
          flex justify-center items-center
          shadow="md black/20"
        >
          {noTitleBar.value ? <div 
            absolute left-10px
            border={pin.value ? '1px solid error-d hover:error-h active:error-a' : (isLight.value ? '1px solid #594b4230' : '1px solid #594b4230')} 
            h-30px w-30px cursor-pointer
            flex justify-center items-center
            rounded-5px 
            bg={pin.value ? 'error-d hover:error-h active:error-a' : 'hover:black/10 active:black/20'} 
            onClick={pinWindow}
          >
            <div i-fluent:pin-48-filled c={pin.value ? 'white' : (isLight.value ? '#555' : 'white')} text-20px></div>
          </div> : null}
          {props.showLeftImg ? (
          <div
            absolute left={noTitleBar.value ? '46px' : '10px'}
            border="1px solid #594b4230"
            h-30px w-30px cursor-pointer
            flex justify-center items-center
            rounded-5px bg="hover:black/10 active:black/20" 
            onClick={() => emit('leftFn')}
          >
            <div className={props.leftImg} c={isLight.value ? '#333' : 'white'} text-20px></div>
          </div>) : null}
          <div data-tauri-drag-region font-bold c={isLight.value ? '#333' : 'white'}>{props.title}</div>
          {props.showRightImg && localStorage.getItem('uid') ? 
          <div 
            absolute left={noTitleBar.value ? '82px' : ''} right={noTitleBar.value ? '' : '46px'}
            border="1px solid #594b4230"
            h-30px w-30px cursor-pointer
            flex justify-center items-center
            rounded-5px bg="hover:black/10 active:black/20" 
            onClick={() => getCloudTodo()}
          >
            <div i-ph:cloud-arrow-down-bold c-white text-20px></div>
          </div> : null}
          {props.showRightImg ? 
          <div 
            absolute right={noTitleBar.value ? '46px' : '10px'}
            border="1px solid #594b4230"
            h-30px w-30px cursor-pointer
            flex justify-center items-center
            rounded-5px bg="hover:black/10 active:black/20" 
            onClick={() => emitter.emit('showAddItem')}
          >
            <div i-mdi-plus c-white text-20px></div>
          </div> : null}
          {noTitleBar.value ? 
          <div 
            absolute right-10px bg-error-d
            border="1px solid error-d hover:error-h active:error-a"
            h-30px w-30px cursor-pointer
            flex justify-center items-center
            rounded-5px bg="hover:error-h active:error-a" 
            onClick={() => dialogShow.value = true}
          >
            <div i-mdi-close c-white text-20px></div>
          </div>
          : null}
        </div>
        <Dialog 
          title="hit"
          dialogShow={dialogShow.value} 
          onCancel={() => dialogShow.value = false}
          onReturn={() => appWindow.close()}
        >
          <span>Do you want to close uyou ToDo?</span>
        </Dialog>
      </>
    )
  }
})