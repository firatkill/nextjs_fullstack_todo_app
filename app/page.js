import TodoList from "@/components/todoList";
import MainContainer from "@/containers/MainContainer/MainContainer";

export default function Home() {
  return (
    <MainContainer>
      <TodoList />
    </MainContainer>
  );
}
