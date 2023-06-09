import { useRouter } from 'vue-router'
import TabBar from '../components/TabBar'
import ToDoList from '../components/ToDoList'
import firstLoad from '../utils/firstLoad'
import LocalStorage from '../utils/localStorage'

const Home: SetupFC = () => {
  firstLoad()
  const router = useRouter()

  const list = LocalStorage('get') as unknown[]

  return () => (
    <>
      <TabBar
        showLeftImg={true}
        showRightImg={true}
        leftImg="i-ph:gear-fine-bold"
        title="uyou ToDo"
        onLeftFn={() => router.push('/settings')}
      />
      <ToDoList listData={list}/>
    </>
  )
}

export default Home
