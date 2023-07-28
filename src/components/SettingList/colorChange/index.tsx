import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { invoke } from '@tauri-apps/api'

const ColorChange: SetupFC = () => {
  const colorMode = ref<'auto' | 'light' | 'dark'>((localStorage.getItem('colorMode') ? localStorage.getItem('colorMode') : 'auto') as any)

  const mode = useColorMode()
  mode.value = colorMode.value

  const setColor = async (color: 'auto' | 'light' | 'dark') => {
    colorMode.value = color
    mode.value = color
    localStorage.setItem('colorMode', color)
    console.log(await invoke('set_color_theme', { color }))
  }

  return () => (
    <div
      bg="white dark:#333/70" flex="~ wrap gap-10px"
      rounded-7px mb-10px p-15px max-w-550px
      w='[calc(100%-32px)]'
      border="1px solid #00000020"
    >
      <div
        bg={colorMode.value === 'auto' ? 'primary-d dark:primary-a' : ''}
        w='98px' h='69px'
        border="1px solid #00000020" rounded-5px
        flex justify-center items-center cursor-pointer
        onClick={() => setColor('auto')}
      >
        <div
          w='82px' h='54px'
          rounded-3px overflow-hidden bg-white
          border="1px solid #666"
        >
          <div w="50%" h="100%" bg="#333"/>
        </div>
      </div>
      <div
        bg={colorMode.value === 'light' ? 'primary-d dark:primary-a' : ''}
        w='98px' h='69px'
        border="1px solid #00000020" rounded-5px
        flex justify-center items-center cursor-pointer
        onClick={() => setColor('light')}
      >
        <div
          w='82px' h='54px'
          rounded-3px overflow-hidden bg-white
          border="1px solid black/10"
        />
      </div>
      <div
        bg={colorMode.value === 'dark' ? 'primary-d dark:primary-a' : ''}
        w='98px' h='69px'
        border="1px solid #00000020" rounded-5px
        flex justify-center items-center cursor-pointer
        onClick={() => setColor('dark')}
      >
        <div
          w='82px' h='54px'
          rounded-3px overflow-hidden bg="#333"
          border="1px solid black/10"
        />
      </div>
    </div>
  )
}

export default ColorChange
