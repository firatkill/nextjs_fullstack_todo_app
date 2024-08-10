import TodoList from "@/components/todoList";
import MainContainer from "@/containers/mainContainer/MainContainer";

export default function Home() {
  return (
    <MainContainer>
      <TodoList />
    </MainContainer>
  );
}
