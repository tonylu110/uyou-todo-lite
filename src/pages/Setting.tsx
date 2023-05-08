import { defineComponent } from "vue";
import { useRouter } from "vue-router"
import TabBar from "../components/TabBar";
import SettingList from "../components/SettingList";
import Item from "../components/SettingList/ItemBox/Item/Item.vue";

export default defineComponent({
  setup() {
    const router = useRouter()

    const isLogin = localStorage.getItem('uid')

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          title="Settings"
          onLeftFn={() => router.back()}
        />
        <SettingList>
          <Item
            title={isLogin ? 'My Account' : 'Not Login'}
            onItemFun={() => router.push('/account?from=settings')}
          />
        </SettingList>
      </>
    )
  }
})