import { defineComponent, reactive, ref } from "vue";
import TabBar from "../components/TabBar";
import SettingList from "../components/SettingList";
import Item from "../components/SettingList/ItemBox/Item/Item.vue";
import ItemButton from "../components/SettingList/ItemBox/ItemButton/ItemButton.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter()

    const isLogin = ref(localStorage.getItem('uname'))

    const fromData = reactive({
      uname: '',
      passwd: ''
    })

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          title="Account"
          onLeftFn={() => router.back()}
          bgColor="light"
        />
        <SettingList>
          <Item
            title={isLogin.value ? isLogin.value : 'Not Login'}
            showArrow={false}
          />
          {isLogin.value ? null : (
            <div 
              mb-10px rounded-7px shadow-item p="x-15px y-10px"
              w="[calc(100%-30px)]" bg-white
              flex="~ col" max-w-550px 
            >
              <input 
                p-15px m="x-0 y-5px"
                border="1.5px solid #00000020"
                bg="#00000010" rounded-5px outline-primary-d
                type="text" 
                placeholder="please input account" 
                v-model={fromData.uname}
              />
              <input 
                p-15px m="x-0 y-5px"
                border="1.5px solid #00000020"
                bg="#00000010" rounded-5px outline-primary-d
                type="password" 
                placeholder="please input password" 
                v-model={fromData.passwd}
              />
            </div>
          )}
          {isLogin.value ? null : <ItemButton mode="primary">Login</ItemButton>}
        </SettingList>
      </>
    )
  }
})