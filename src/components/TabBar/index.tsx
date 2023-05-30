import { defineComponent, ref, watchEffect } from "vue";
import emitter from "../../utils/emitter";
import getCloudTodo from "../../utils/getCloudTodo";
import { appWindow } from "@tauri-apps/api/window";
import Dialog from "../Dialog/Dialog.vue";
import { useI18n } from "vue-i18n";

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
    const { t } = useI18n()
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
            absolute left-13px
            border={pin.value ? '1px solid error-d hover:error-h active:error-a' : (isLight.value ? '1px solid black/5' : '1px solid black/5')} 
            h-25px w-25px cursor-pointer
            flex justify-center items-center
            rounded-25px 
            bg={pin.value ? 'error-d hover:error-h active:error-a' : 'hover:black/10 active:black/20 black/5'} 
            onClick={pinWindow}
          >
            <div i-fluent:pin-48-filled c={pin.value ? 'white' : (isLight.value ? '#555' : 'white')} text-13px></div>
          </div> : null}
          {props.showLeftImg ? (
          <div
            absolute left={noTitleBar.value ? '48px' : '10px'}
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
            absolute left={noTitleBar.value ? '84px' : ''} right={noTitleBar.value ? '' : '46px'}
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
            absolute right={noTitleBar.value ? '48px' : '10px'}
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
            absolute right-13px
            border="1px solid black/5 hover:error-d active:error-a"
            h-25px w-25px cursor-pointer
            flex justify-center items-center
            rounded-25px bg="hover:error-d active:error-a black/5" 
            className="group"
            onClick={() => dialogShow.value = true}
          >
            <div i-mdi:close c={isLight.value ? '#333' : 'white'} group-hover-c-white text-15px></div>
          </div>
          : null}
        </div>
        {noTitleBar.value ? 
        <Dialog 
          title={t('closeWindowDialog.title')}
          dialogShow={dialogShow.value} 
          onCancel={() => dialogShow.value = false}
          onReturn={() => appWindow.close()}
        >
          <span>{t('closeWindowDialog.msg')}</span>
        </Dialog>
        : null}
      </>
    )
  }
})