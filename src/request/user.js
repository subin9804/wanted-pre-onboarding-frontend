import { api } from "./api";

// 회원가입
export async function signUp (email, password) {
    const res = await fetch(`${api}auth/signup`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return res;
}


// 로그인
export async function signIn(email, password) {
    const res = await fetch(`${api}auth/signin`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    console.log("로그인 성공")
    return await res.json();
}