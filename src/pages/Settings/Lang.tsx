import { defineComponent } from "vue";
import TabBar from "../../components/TabBar";
import SettingList from "../../components/SettingList";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()

    const menuClick = (lang: string) => {
      localStorage.setItem('lang', lang)
      if (lang === 'withSystem')
        locale.value = navigator.language.toLowerCase()
      else
        locale.value = lang
    }
    
    const langShow = (lang: string): boolean => {
      const langLocal = localStorage.getItem('lang')
      if (lang === 'withSystem' && langLocal === null) {
        return true
      } else if (lang === langLocal) {
        return true
      } else {
        return false
      }
    }

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          title={t('langPage.lang')}
          onLeftFn={() => router.back()}
          bgColor="light"
        />
        <SettingList>
          <div mb-10px shadow-item rounded-7px w="100%">
            <div rounded-7px overflow-hidden>
              <div
                relative min-h-30px h-30px w="[calc(100%-30px)]"
                p="y-10px x-15px" bg="white active:primary-d" cursor-pointer
                flex items-center justify-between
                c="#333 active:white" border-b="1px solid black/10"
                onClick={() => menuClick('withSystem')}
              >
                <span>{t('langPage.withSys')}</span>
                {langShow('withSystem') ? <div i-mdi:check text-24px c-primary-d></div> : null}
              </div>
              <div
                relative min-h-30px h-30px w="[calc(100%-30px)]"
                p="y-10px x-15px" bg="white active:primary-d" cursor-pointer
                flex items-center justify-between
                c="#333 active:white" border-b="1px solid black/10"
                onClick={() => menuClick('en')}
              >
                <span>English</span>
                {langShow('en') ? <div i-mdi:check text-24px c-primary-d></div> : null}
              </div>
              <div
                relative min-h-30px h-30px w="[calc(100%-30px)]"
                p="y-10px x-15px" bg="white active:primary-d" cursor-pointer
                flex items-center justify-between
                c="#333 active:white"
                onClick={() => menuClick('zh-cn')}
              >
                <span>中文简体</span>
                {langShow('zh-cn') ? <div i-mdi:check text-24px c-primary-d></div> : null}
              </div>
            </div>
          </div>
        </SettingList>
      </>
    )
  }
})