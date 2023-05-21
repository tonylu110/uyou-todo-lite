import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import TabBar from "../../components/TabBar";
import SettingList from "../../components/SettingList";
import Item from "../../components/SettingList/ItemBox/Item/Item.vue";
import langImg from "../../assets/images/lang.png";
import ItemBox from "../../components/SettingList/ItemBox/ItemBox.vue";
import ItemButton from "../../components/SettingList/ItemBox/ItemButton/ItemButton.vue";

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

    const clearData = () => {
      localStorage.clear()
      location.reload()
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
          <ItemButton mode="error" onClick={clearData}>clear Data</ItemButton>
          <ItemButton
            onClick={() => router.push('/lang')}
          >
            <img src={langImg} alt="" />
          </ItemButton>
        </SettingList>
      </>
    )
  }
})