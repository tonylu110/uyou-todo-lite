import { defineComponent, ref } from "vue";
import TabBar from "../components/TabBar";
import SettingList from "../components/SettingList";
import Item from "../components/SettingList/ItemBox/Item/Item.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter()

    const isLogin = ref(localStorage.getItem('uname'))

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          title="Account"
          onLeftFn={() => router.back()}
        />
        <SettingList>
          <Item
            title={isLogin.value ? isLogin.value : 'Not Login'}
            onItemFun={() => router.push('/account?from=settings')}
            showArrow={false}
          />
        </SettingList>
      </>
    )
  }
})