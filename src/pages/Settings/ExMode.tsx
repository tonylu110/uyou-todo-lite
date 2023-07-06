import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../../components/TabBar'
import SettingList from '../../components/SettingList'
import Item from '../../components/SettingList/ItemBox/Item/Item.vue'
import emitter from '../../utils/emitter'

export default defineComponent({
  setup() {
    const router = useRouter()

    const exState = ref(true)
    const closeExMode = () => {
      exState.value = !exState.value
      localStorage.setItem('exMode', `${exState.value}`)
    }

    const shortcut = ref(localStorage.getItem('addShortcut') === 'true')
    const setShortcut = () => {
      shortcut.value = !shortcut.value
      localStorage.setItem('addShortcut', `${shortcut.value}`)
      emitter.emit('getShortcut', shortcut.value)
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
          <Item
            title="⚠️ add item shortcut"
            showSwitch={true}
            switchState={shortcut.value}
            onSwitchFun={setShortcut}
          />
        </SettingList>
      </>
    )
  },
})
