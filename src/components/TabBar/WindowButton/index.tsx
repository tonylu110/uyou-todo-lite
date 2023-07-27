import { appWindow } from '@tauri-apps/api/window'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Dialog from '../../Dialog/Dialog.vue'

const WindowButton: SetupFC = () => {
  const { t } = useI18n()

  const pin = ref(localStorage.getItem('pin') === 'true')
  appWindow.setAlwaysOnTop(pin.value)

  const pinWindow = () => {
    pin.value = !pin.value
    localStorage.setItem('pin', `${pin.value}`)
    appWindow.setAlwaysOnTop(pin.value)
  }

  const dialogShow = ref(false)

  return () => (
    <>
    <div flex items-center>
      <div
        cursor-pointer p-6px mr-7px
        w-13px h-13px rounded-full
        bg={pin.value
          ? 'error-d hover:error-h active:error-a dark:error-h dark:hover:error-a dark:active:error-d'
          : 'black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30'
        }
        flex justify-center items-center
        class="group"
        onClick={pinWindow}
      >
        <div
          i-fluent:pin-48-filled
          c={pin.value ? 'group-hover:white group-active:white white' : '#555 dark:#bbb'}
          text-13px text-center
        ></div>
      </div>
      <div
        cursor-pointer p-6px mr-7px
        w-13px h-13px rounded-full
        bg="black/10 hover:black/20 active:black/30 dark:#999/10 dark:hover:#999/20 dark:active:#999/30"
        class="group"
        onClick={() => appWindow.minimize()}
      >
        <div
          i-mdi:minus-thick block
          c="#555 dark:#bbb"
          text-13px text-center
        />
      </div>
      <div
        cursor-pointer p-6px
        w-13px h-13px rounded-full
        bg="black/10 hover:error-d active:error-a dark:#999/10 dark:active:error-d dark:hover:error-h"
        class="group"
        onClick={() => dialogShow.value = true}
      >
        <div
          i-mdi:close-thick block
          c="#555 group-hover:white group-active:white dark:#bbb"
          text-13px text-center
        />
      </div>
    </div>
    <Dialog
      title={t('closeWindowDialog.title')}
      dialogShow={dialogShow.value}
      onCancel={() => dialogShow.value = false}
      onReturn={() => appWindow.close()}
    >
      <span>{t('closeWindowDialog.msg')}</span>
    </Dialog>
    </>
  )
}

export default WindowButton
