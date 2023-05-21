import { defineComponent, ref } from "vue";
import { appWindow } from '@tauri-apps/api/window'
import emitter from "../../utils/emitter";

export default defineComponent({
  setup() {
    const pin = ref(localStorage.getItem('pin') === 'true')
    appWindow.setAlwaysOnTop(pin.value)

    const pinWindow = () => {
      pin.value = !pin.value
      localStorage.setItem('pin', pin.value + '')
      appWindow.setAlwaysOnTop(pin.value)
    }

    const isLight = ref(false)
    emitter.on('titleColor', (data) => {
      isLight.value = (data as boolean)
    })

    return () => (
      <div 
        data-tauri-drag-region
        w-screen h-40px backdrop-blur-5px
        flex items-center justify-between
        bg={isLight.value ? 'white/50' : '#7a695cdd'} sticky top-0 z-1
        border-b="1px solid #594b4230"
      >
        <div
          bg={pin.value ? 'error-d hover:error-h active:error-a' : 'hover:black/10 active:black/20'} 
          w-50px h-20px
          flex items-center justify-center
          ml-9px cursor-pointer rounded-5px
          border={pin.value ? '1px solid error-d hover:error-h active:error-a' : (isLight.value ? '1px solid #594b4230' : '1px solid #594b4230')} 
          onClick={pinWindow}
        >
          <div i-fluent:pin-48-filled text-14px c={pin.value ? 'white' : (isLight.value ? '#555' : 'white')}></div>
        </div>
        <div flex>
          <div 
            bg="hover:black/10 active:black/20" 
            w-50px h-20px
            flex items-center justify-center
            mr-9px cursor-pointer rounded-5px
            border="1px solid #594b4230"
            onClick={() => appWindow.minimize()}
          >
            <div i-mdi:minus-thick c={isLight.value ? '#555' : 'white'} text-14px></div>
          </div>
          <div 
            bg="error-d hover:error-h active:error-a" 
            w-50px h-20px
            flex items-center justify-center
            mr-9px cursor-pointer rounded-5px
            border="1px solid error-d hover:error-h active:error-a"
            onClick={() => appWindow.close()}
          >
            <div i-mdi:close-thick c-white text-12px></div>
          </div>
        </div>
      </div>
    )
  }
})