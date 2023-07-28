import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { disable, enable } from 'tauri-plugin-autostart-api'
import TabBar from '../../components/TabBar'
import SettingList from '../../components/SettingList'
import Item from '../../components/SettingList/ItemBox/Item/Item.vue'
import langImg from '../../assets/images/lang.png'
import ItemBox from '../../components/SettingList/ItemBox/ItemBox.vue'
import ItemButton from '../../components/SettingList/ItemBox/ItemButton/ItemButton.vue'
import Dialog from '../../components/Dialog/Dialog.vue'

const Setting: SetupFC = () => {
  const { t } = useI18n()
  const router = useRouter()

  const isLogin = localStorage.getItem('uid')

  const autoUpdate = ref(localStorage.getItem('autoUpdate') === 'true' || !localStorage.getItem('autoUpdate'))
  const setAutoUpdate = () => {
    autoUpdate.value = !autoUpdate.value
    localStorage.setItem('autoUpdate', `${autoUpdate.value}`)
  }

  const dialogShow = ref(false)
  const clearData = () => {
    localStorage.clear()
    location.reload()
  }

  const enterAddItem = ref(localStorage.getItem('enterAddItem') === 'true')
  const setEnterAddItem = () => {
    enterAddItem.value = !enterAddItem.value
    localStorage.setItem('enterAddItem', `${enterAddItem.value}`)
  }

  const autoStart = ref(localStorage.getItem('autoStart') === 'true')
  const setAutoStart = async () => {
    autoStart.value = !autoStart.value
    localStorage.setItem('autoStart', `${autoStart.value}`)
    autoStart.value ? await enable() : await disable()
  }

  return () => (
    <>
      <TabBar
        showLeftImg={true}
        title={t('settingsPage.settings')}
        onLeftFn={() => router.back()}
        bgColor="light"
      />
      <SettingList>
        {/* <ColorChange/> */}
        <Item
          title={isLogin ? t('settingsPage.myAcc') : t('settingsPage.notLogin')}
          onItemFun={() => router.push('/account')}
        />
        <ItemBox>
          <Item
            title={t('updatePage.autoUpdate')}
            showSwitch={true}
            switchState={autoUpdate.value}
            onSwitchFun={setAutoUpdate}
          />
          <Item title={t('updatePage.toUpdate')} onItemFun={() => router.push('/update')}/>
        </ItemBox>
        <ItemBox>
          <Item title={t('settingsPage.autoStart')} showSwitch={true} switchState={autoStart.value} onSwitchFun={setAutoStart}/>
          <Item title={t('settingsPage.enterAdd')} showSwitch={true} switchState={enterAddItem.value} onSwitchFun={setEnterAddItem}/>
        </ItemBox>
        {localStorage.getItem('exMode') === 'true'
          ? <Item title="ex mode" onItemFun={() => router.push('/exmode')}/>
          : null}
        <ItemButton mode="error" onClick={() => dialogShow.value = true}>{t('settingsPage.clearData')}</ItemButton>
        <ItemButton
          onClick={() => router.push('/lang')}
        >
          <img src={langImg} alt="" />
        </ItemButton>
        <Dialog
          title={t('accountPage.hit')}
          dialogShow={dialogShow.value}
          onReturn={clearData}
          onCancel={() => dialogShow.value = false}
        >
          {t('settingsPage.clearDataTrue')}
        </Dialog>
      </SettingList>
    </>
  )
}

export default Setting
