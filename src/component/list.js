import { useState } from "react";
import { updateTodo } from "../request/todo";


export default function List({id, todo, isCompleted, todolist, setTodolist, handledelete}) {
    const [updating, setUpdating] = useState(false);
    const [newTodo, setNewtodo] = useState("");

    // todo 수정
    function handleUpdate(id) {
        console.log(id)
        try {
            const updatedlist = todolist.map(item => {
                
                if(item.id === id) {
                    updateTodo(id, newTodo, item.isCompleted)
                    return {...item, todo: newTodo}
                }
                return item;
            })
            setTodolist(updatedlist);
            setUpdating(false)
        } catch(error) {
            console.log(error)
        }
    }

    // isCompleted
    function handleCheck(id) {
        try {
            const updatedlist = todolist.map(item => {
                if(item.id === id) {
                    updateTodo(id, item.todo, !item.isCompleted)
                    return {...item, isCompleted: !item.isCompleted}
                }
                return item;
            })
            setTodolist(updatedlist);
        } catch(error) {
            console.log(error)
        }
    }

   return (
    <>
        <li key={id} className="text-left p-1 pl-8 flex justify-between border-b-2 border-green-400 border-dotted">
            <div className="leading-8">
                <input type="checkbox" defaultChecked={isCompleted} onClick={() => handleCheck(id)} name={id} id={id} className="mr-2"/>
                {updating ? (
                    <input data-testid="modify-input" className="border w-1/3 rounded-full px-2 w-3/4 outline-none" defaultValue={todo} onChange={({target}) => setNewtodo(target.value)}/>
                    ) : (
                        <label for={id}>
                            <span>{todo}</span>
                        </label>
                )}
            </div>

            {updating ? (
                <span className="shrink-0">
                    <button data-testid="submit-button" onClick={() => handleUpdate(id)} className="mr-2 p-1 border border-green-200 bg-green-200 shink-0">제출</button>
                    <button data-testid="cancel-button" onClick={() => setUpdating(false)} className="p-1 border shrink-0">취소</button>                       
                </span>
                ) : (
                <span>           
                    <button data-testid="modify-button" onClick={() => setUpdating(true)} className="mr-2 p-1 border border-green-200 bg-green-200">수정</button>
                    <button data-testid="delete-button" onClick={() => handledelete(id)} className="p-1 bg-red-200 border border-red-200">삭제</button> 
                </span>
            )}
        </li>
    </>
   );
}
