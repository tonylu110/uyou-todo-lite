import { defineComponent } from "vue";
import { RouterLink, useRouter } from "vue-router"
import TabBar from "../components/TabBar";
import SettingList from "../components/SettingList";

export default defineComponent({
  setup() {
    const router = useRouter()

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          leftImg="i-fluent:chevron-left-16-filled"
          title="Settings"
          onLeftFn={() => router.back()}
        />
        <SettingList>
          Settings
        </SettingList>
      </>
    )
  }
})