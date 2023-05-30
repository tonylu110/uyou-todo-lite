import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import TabBar from "../../components/TabBar";
import SettingList from "../../components/SettingList";
import Item from "../../components/SettingList/ItemBox/Item/Item.vue";
import langImg from "../../assets/images/lang.png";
import ItemBox from "../../components/SettingList/ItemBox/ItemBox.vue";
import ItemButton from "../../components/SettingList/ItemBox/ItemButton/ItemButton.vue";
import Dialog from "../../components/Dialog/Dialog.vue";
import emitter from "../../utils/emitter";

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const isLogin = localStorage.getItem('uid')

    const autoUpdate = ref(localStorage.getItem('autoUpdate') === 'true' || !localStorage.getItem('autoUpdate'))
    const setAutoUpdate = () => {
      autoUpdate.value = !autoUpdate.value
      localStorage.setItem('autoUpdate', autoUpdate.value + '')
    }

    const dialogShow = ref(false)
    const clearData = () => {
      localStorage.clear()
      location.reload()
    }

    const noTitleBar = ref(localStorage.getItem('noTitleBar') === 'true')
    const setTitleBar = () => {
      noTitleBar.value = !noTitleBar.value
      localStorage.setItem('noTitleBar', noTitleBar.value + '')
      emitter.emit('noTitleBar', noTitleBar.value)
      setTimeout(() => {
        emitter.emit('titleColor', true)
      }, 0)
    }

    const enterAddItem = ref(localStorage.getItem('enterAddItem') === 'true')
    const setEnterAddItem = () => {
      enterAddItem.value = !enterAddItem.value
      localStorage.setItem('enterAddItem', enterAddItem.value + '')
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
            <Item title="no title bar mode" showSwitch={true} switchState={noTitleBar.value} onSwitchFun={setTitleBar}/>
            <Item title="enter to add item" showSwitch={true} switchState={enterAddItem.value} onSwitchFun={setEnterAddItem}/>
          </ItemBox>
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
})