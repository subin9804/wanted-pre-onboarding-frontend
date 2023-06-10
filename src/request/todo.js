import { api } from "./api";

// todo 추가
export async function createTodo(todo) {
    const res = await fetch(`${api}todos`, {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + JSON.parse(localStorage.getItem('user')).access_token,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({todo})
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// todo 조회
export async function getTodos() {
    const res = await fetch(`${api}todos`, {
        method: 'GET',
        headers: {"Authorization" : "Bearer " + JSON.parse(localStorage.getItem('user')).access_token}
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// todo 수정
export async function updateTodo(id, todo, isCompleted) {
    const res = await fetch(`${api}todos/${id}`, {
        method: "PUT",
        headers: {
            "Authorization" : "Bearer " + JSON.parse(localStorage.getItem('user')).access_token,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            todo,
            isCompleted
        })
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// todo 삭제
export async function deleteTodo(id) {
    const res = await fetch(`${api}todos/${id}`, {
        method: "DELETE",
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return res;
}