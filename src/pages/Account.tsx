import { defineComponent, reactive, ref } from "vue";
import Dialog from "../components/Dialog/Dialog.vue"
import TabBar from "../components/TabBar";
import SettingList from "../components/SettingList";
import Item from "../components/SettingList/ItemBox/Item/Item.vue";
import ItemButton from "../components/SettingList/ItemBox/ItemButton/ItemButton.vue";
import { useRouter } from "vue-router";
import { createToast } from "../components/Toast";

export default defineComponent({
  setup() {
    const router = useRouter()

    const SettingListRef = ref()

    const isLogin = ref(localStorage.getItem('uname'))

    const fromData = reactive({
      uname: '',
      passwd: ''
    })

    const dialogShow = ref(false)
    const dialogMsg = ref('msg')

    const login = () => {
      if (fromData.uname === '' || fromData.passwd === '') {
        dialogMsg.value = 'please input account and password'
        dialogShow.value = true
      } else {
        isLogout.value = false
        fetch('https://api.todo.uyou.org.cn/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uname: fromData.uname,
            passwd: fromData.passwd
          })
        }).then(res => {
          return res.json()
        }).then(res => {
          if (res._id) {
            isLogin.value = fromData.uname
            localStorage.setItem('uname', fromData.uname)
            localStorage.setItem('uid', res._id)
            createToast(SettingListRef.value.$el, {
              msg: 'syncing todo data'
            })
            fetch(`https://api.todo.uyou.org.cn/todoexist?uid=${res._id}`).then(res => {
              return res.json()
            }).then(res => {
              const uid = localStorage.getItem('uid')
              const data = localStorage.getItem('ToDo')
              if (res.code === 200) {
                fetch('https://api.todo.uyou.org.cn/addtodo', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    uid: uid,
                    data: data
                  })
                }).then(res => {
                  return res.json()
                }).then(res => {
                  if (res.code === 200) {
                    createToast(SettingListRef.value.$el, {
                      msg: 'sync todo data success'
                    })
                  } else {
                    createToast(SettingListRef.value.$el, {
                      msg: 'sync todo data error'
                    })
                  }
                })
              } else {
                const uid = localStorage.getItem('uid')
                fetch('https://api.todo.uyou.org.cn/gettodo', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    uid: uid
                  })
                }).then(res => {
                  return res.json()
                }).then(res => {
                  if (res._id) {
                    createToast(SettingListRef.value.$el, {
                      msg: 'sync todo data success'
                    })
                    localStorage.setItem('ToDo', res.data)
                  } else {
                    createToast(SettingListRef.value.$el, {
                      msg: 'sync todo data fail'
                    })
                  }
                })
              }
            })
          } else {
            dialogMsg.value = 'login error'
            dialogShow.value = true
          }
        })
      }
    }

    const isLogout = ref(false)
    const logout = () => {
      isLogout.value = true
      dialogShow.value = true
      dialogMsg.value = 'Are you want to log out?'
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

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          title="Account"
          onLeftFn={() => router.back()}
          bgColor="light"
        />
        <SettingList ref={SettingListRef}>
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
          {isLogin.value ? null : <ItemButton mode="primary" onClick={login}>Log in</ItemButton>}
          {isLogin.value ? <ItemButton mode="error" onClick={logout}>Log out</ItemButton> : null}
          <Dialog dialogShow={dialogShow.value} onReturn={returnFn} onCancel={() => dialogShow.value = !dialogShow.value}>
            <span>{dialogMsg.value}</span>
          </Dialog>
        </SettingList>
      </>
    )
  }
})