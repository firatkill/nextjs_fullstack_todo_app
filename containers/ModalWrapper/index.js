"use client";
import EditModal from "@/components/editTodoModal";
import { useGlobalStore } from "@/zustand/globalStore";
import ModalContainer from "../ModalContainer";
import AddModal from "@/components/addTodoModal";
import AddCategoryModal from "@/components/addCategoryModal";

export default function ModalWrapper() {
  const activeModal = useGlobalStore((state) => state.activeModal);

  if (activeModal == null) {
    return null;
  }
  return (
    <ModalContainer>
      {activeModal == "addCategory" && <AddCategoryModal />}
      {activeModal == "editTodo" && <EditModal />}
      {activeModal == "addTodo" && <AddModal />}
    </ModalContainer>
  );
}
