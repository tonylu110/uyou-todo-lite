import type { Ref } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import { getVersion } from '@tauri-apps/api/app'
import { open } from '@tauri-apps/api/shell'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TabBar from '../../components/TabBar'
import SettingList from '../../components/SettingList'
import logo from '../../assets/images/icon.png'
import ItemButton from '../../components/SettingList/ItemBox/ItemButton/ItemButton.vue'
import { versionCode } from '../../utils/appVersion'
import { createToast } from '../../components/Toast'

const appVersion = await getVersion()

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const listRef = ref()

    const newVersion = ref('')
    const updateMsg: Ref<string[]> = ref([])
    const updateButtonText = ref(t('updatePage.checkingUpdate'))

    const getUpdate = () => {
      setTimeout(() => {
        fetch('https://api.todo.uyou.org.cn/update/get').then((res) => {
          return res.json()
        }).then((res) => {
          if (res[2].code > versionCode) {
            newVersion.value = `${t('updatePage.newVersion')}: v${res[2].version}`
            updateMsg.value = res[2].data
            updateButtonText.value = t('updatePage.gotoUpdate')
          }
          else {
            newVersion.value = t('updatePage.noUpdate')
            updateButtonText.value = t('updatePage.checkUpdate')
            createToast({ msg: newVersion.value })
          }
        })
      }, Math.floor(Math.random () * 900) + 100)
    }

    const updateButtonCilck = () => {
      if (updateMsg.value.length === 0) {
        updateButtonText.value = t('updatePage.checkingUpdate')
        newVersion.value = ''
        getUpdate()
      }
      else {
        open('https://github.com/tonylu110/uyou-todo-lite/releases')
      }
    }

    const exState = ref(1)
    const toDev = () => {
      exState.value = exState.value + 1
      if (exState.value > 6 || localStorage.getItem('exMode') === 'true') {
        localStorage.setItem('exMode', 'true')
        createToast({ msg: 'opened ex mode' })
      }
    }

    onMounted(() => {
      getUpdate()
    })

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          title={t('updatePage.update')}
          onLeftFn={() => router.back()}
          bgColor="light"
        />
        <SettingList ref={listRef}>
          <div flex justify-between items-center w="100%">
            <div
              w="[calc(100%-20px)]" h-auto
              flex="~ col" justify-center items-center
              bg-white rounded-7px mb-10px
              p="x-10px y-0" shadow-item
            >
              <img
                h-100px m="x-0 y-15px"
                src={logo}
                alt="logo"
                onClick={toDev}
              />
              <span mb={newVersion.value ? '' : '15px'} c="black/40" font-bold>
                uyou ToDo lite v{appVersion}
              </span>
              {newVersion.value
                ? <span c="black/40" mt-5px text-14px mb-15px font-bold>
                {newVersion.value}
              </span>
                : null}
              {updateMsg.value.length > 0
                ? <div
                w="[calc(100%-10px)]" h-auto
                flex="~ col" justify-center items-center
                border-t="1px solid black/15"
                p="y-5px x-15px"
              >
                <span c-black text-16px font-bold mt-10px>
                  {t('updatePage.changelog')}
                </span>
                <ul w="100%">
                  {updateMsg.value.map((item, index) => {
                    return <li text-15px c="black/80" font-bold mb-10px key={index}>
                      {item.slice(2)}
                    </li>
                  })}
                </ul>
              </div>
                : null}
            </div>
          </div>
          <ItemButton
            mode="primary"
            bottom={true}
            onClick={updateButtonCilck}
          >
            {updateButtonText.value}
          </ItemButton>
        </SettingList>
      </>
    )
  },
})
