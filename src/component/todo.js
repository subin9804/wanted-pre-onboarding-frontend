import {useEffect, useState, useContext} from "react";
import {getTodos, createTodo, deleteTodo} from "../request/todo"
import List from "./list";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function Todo() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todo, setTodo] = useState("");
    const [newTodo, setNewTodo] = useState("");
    const [todolist, setTodolist] = useState([]);
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(false);
        setError(null);
        setTodo("")

        getTodos().then(data => {
            setTodolist(data);
        })
        .catch(error => {
            setError(error)
            console.log(error)
        })
        .finally(() => setIsLoaded(true))
    }, [todo])

    // if (!isLoaded) {
    //     return <p>fetching data...</p>
    // }

    // todo 추가
    async function handleSubmit(e) {
        try {
            e.preventDefault();


            await createTodo(newTodo)
            .then(setTodo(newTodo));

            setNewTodo("")

        } catch(error) {
            console.log(error)
        }
    }

    // todo 삭제
    async function handledelete(id) {
        try {
            await deleteTodo(id)

            const updated = todolist.filter(item => item.id !== id);
            setTodolist(updated)

        }catch(error) {
            console.log(error)
        }
    }

    //console.log(todolist)

    // todo 조회
    const todoList = todolist.map(item => (
        <List 
            key={item.id}
            id={item.id}
            todo={item.todo}
            isCompleted={item.isCompleted}
            todolist={todolist}
            setTodolist={setTodolist}
            handledelete={handledelete}
        />
    ))

    function signout () {
        setUser(null);
        localStorage.removeItem('user')
        navigate('/signin')
    }

    //console.log(todo)
    return (
        <div className="w-96 p-4 mt-16 mx-auto text-center border border-green-400 border-2 px-8 pb-16 text-center relative">
            <h1 className="font-bold text-2xl">TODOLIST</h1>
            <form id="createTodo" onSubmit={handleSubmit} className="p-4 mx-auto">
                <input 
                    data-testid="new-todo-input" 
                    className="border border-green-400 rounded-full px-2 w-2/3 outline-none"
                    autoComplete="off"
                    onChange={(e) => setNewTodo(e.target.value)}
                    value={newTodo}
                />
                <button 
                    data-testid="new-todo-add-button" 
                    className="p-1 ml-2 bg-green-400 rounded-full"
                >
                    추가
                </button>
            </form>
            <ul id="todoList">
                {todoList}
            </ul>
            <button 
                className="font-semibold text-green-600 absolute right-8 bottom-6"
                onClick={signout}
            >
                로그아웃
            </button>
        </div>
    )
}