import { defineComponent } from "vue";
import { RouterLink, useRouter } from "vue-router"
import TabBar from "../components/TabBar";
import ToDoList from "../components/ToDoList";

export default defineComponent({
  setup() {
    const router = useRouter()

    return () => (
      <>
        <TabBar
          showLeftImg={true}
          leftImg="i-mdi:cog"
          title="uyou ToDo"
          onLeftFn={() => router.push('/settings')}
        />
        <ToDoList>
          
        </ToDoList>
      </>
    )
  }
})