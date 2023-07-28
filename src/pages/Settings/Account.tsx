import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Dialog from '../../components/Dialog/Dialog.vue'
import TabBar from '../../components/TabBar'
import SettingList from '../../components/SettingList'
import Item from '../../components/SettingList/ItemBox/Item/Item.vue'
import ItemButton from '../../components/SettingList/ItemBox/ItemButton/ItemButton.vue'
import { createToast } from '../../components/Toast'
import { updateData } from '../../utils/getUser'

const Account: SetupFC = () => {
  const { t } = useI18n()
  const router = useRouter()

  const isLogin = ref(localStorage.getItem('uname'))
  const isLogout = ref(false)

  const fromData = reactive({
    uname: '',
    passwd: '',
  })

  const dialogShow = ref(false)
  const dialogMsg = ref('')

  const login = () => {
    if (fromData.uname === '' || fromData.passwd === '') {
      dialogMsg.value = t('accountPage.plzInAccAndPass')
      dialogShow.value = true
    }
    else {
      isLogout.value = false
      fetch('https://api.todo.uyou.org.cn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uname: fromData.uname,
          passwd: fromData.passwd,
        }),
      }).then((res) => {
        return res.json()
      }).then((res) => {
        if (res._id) {
          isLogin.value = fromData.uname
          localStorage.setItem('uname', fromData.uname)
          localStorage.setItem('uid', res._id)
          createToast({
            msg: t('accountPage.syncing'),
          })
          fetch(`https://api.todo.uyou.org.cn/todoexist?uid=${res._id}`).then((res) => {
            return res.json()
          }).then((res) => {
            const uid = localStorage.getItem('uid')
            const data = localStorage.getItem('ToDo')
            if (res.code === 200) {
              fetch('https://api.todo.uyou.org.cn/addtodo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid,
                  data,
                }),
              }).then((res) => {
                return res.json()
              }).then((res) => {
                if (res.code === 200) {
                  createToast({
                    msg: t('accountPage.syncSuccess'),
                  })
                }
                else {
                  createToast({
                    msg: t('accountPage.syncError'),
                  })
                }
              })
            }
            else {
              const uid = localStorage.getItem('uid')
              fetch('https://api.todo.uyou.org.cn/gettodo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid,
                }),
              }).then((res) => {
                return res.json()
              }).then((res) => {
                if (res._id) {
                  createToast({
                    msg: t('accountPage.syncSuccess'),
                  })
                  localStorage.setItem('ToDo', res.data)
                }
                else {
                  createToast({
                    msg: t('accountPage.syncFail'),
                  })
                }
              })
            }
          })
        }
        else {
          dialogMsg.value = t('accountPage.loginError')
          dialogShow.value = true
        }
      })
    }
  }

  const logout = () => {
    isLogout.value = true
    dialogShow.value = true
    dialogMsg.value = t('accountPage.logoutWindow')
  }

  const returnFn = () => {
    fromData.uname = ''
    fromData.passwd = ''
    if (isLogout.value) {
      isLogin.value = ''
      localStorage.setItem('uname', '')
      localStorage.setItem('uid', '')
      dialogShow.value = false
      isLogout.value = false
      return
    }
    dialogShow.value = false
    isLogout.value = false
  }

  const autoUpdateState = ref(updateData)
  const changeAutoUpdate = () => {
    autoUpdateState.value = !autoUpdateState.value
    localStorage.setItem('updateData', `${autoUpdateState.value}`)
  }

  return () => (
    <>
      <TabBar
        showLeftImg={true}
        title={t('accountPage.account')}
        onLeftFn={() => router.back()}
        bgColor="light"
      />
      <SettingList>
        <Item
          title={isLogin.value ? isLogin.value : t('settingsPage.notLogin')}
          showArrow={false}
        />
        {isLogin.value
          ? null
          : (
          <div
            mb-10px rounded-7px p="x-15px y-10px"
            w="[calc(100%-32px)]" bg="white dark:#333/70"
            border="1px solid black/20"
          >
            <input
              p-15px m="x-0 y-5px" w="[calc(100%-32px)]"
              border="1.5px solid #00000020"
              bg="#00000010" rounded-5px outline-primary-d
              c="#555 dark:#bbb"
              type="text"
              placeholder={t('accountPage.plzInputAcc')}
              v-model={fromData.uname}
            />
            <input
              p-15px m="x-0 y-5px" w="[calc(100%-32px)]"
              border="1.5px solid #00000020"
              bg="#00000010" rounded-5px outline-primary-d
              c="#555 dark:#bbb"
              type="password"
              placeholder={t('accountPage.plzInputPass')}
              v-model={fromData.passwd}
            />
          </div>
            )}
        {isLogin.value ? null : <ItemButton mode="primary" onClick={login}>{t('accountPage.login')}</ItemButton>}
        {isLogin.value
          ? <Item
            title={t('accountPage.autoUpdate')}
            showSwitch={true}
            switchState={autoUpdateState.value}
            onSwitchFun={changeAutoUpdate}
          />
          : null}
        {isLogin.value ? <ItemButton mode="error" onClick={logout}>{t('accountPage.logout')}</ItemButton> : null}
        <Dialog
          title={t('accountPage.hit')}
          dialogShow={dialogShow.value}
          onReturn={returnFn}
          onCancel={() => dialogShow.value = !dialogShow.value}
        >
          {dialogMsg.value}
        </Dialog>
      </SettingList>
    </>
  )
}

export default Account
