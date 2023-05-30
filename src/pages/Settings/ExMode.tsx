import { defineComponent, ref } from "vue";
import TabBar from "../../components/TabBar";
import { useRouter } from "vue-router";
import SettingList from "../../components/SettingList";
import Item from "../../components/SettingList/ItemBox/Item/Item.vue";

export default defineComponent({
  setup() {
    const router = useRouter()
    
    const exState = ref(true)
    const closeExMode = () => {
      exState.value = !exState.value
      localStorage.setItem('exMode', exState.value + '')
    }

    return () => (
      <>
        <TabBar
          title="ex mode"
          bgColor="light"
          showLeftImg={true}
          onLeftFn={() => router.back()}
        />
        <SettingList>
          <Item 
            title="open ex mode"
            showSwitch={true} 
            switchState={exState.value} 
            onSwitchFun={closeExMode}
          />
        </SettingList>
      </>
    )
  }
})