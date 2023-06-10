import { useState, useContext } from "react";
import { signIn } from "../request/user";
import { useNavigate, Navigate, Link } from "react-router-dom";
import AuthContext from "./AuthContext";


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);

    if(user) {
        return <Navigate to="/todo" replace={true}/>
    }
    
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            setError(null);

            const user = await signIn(email, password)
            
            setUser(user);
                            
        } catch (error) {
            setError(error);
            console.log(error)
        }
    }


    return (
        <div id="signIn">
            <form onSubmit={handleSubmit} className="w-96 p-4 mt-16 mx-auto text-center border border-green-400 border-8 px-8 pb-16">
                <h1 className="font-bold text-4xl py-12">로그인</h1>
                <div className="pb-8">
                    <label className="w-full flex justify-between">
                        <span>이메일</span>
                        <input 
                            data-testid="email-input"
                            className="border-green-500 border rounded-full px-2"
                            placeholder="이메일 형식으로 작성"
                            type="email"
                            autoComplete="off"
                            onChange={({target}) => setEmail(target.value)}
                        />
                    </label>
                    {!email.includes('@') && email.length > 0 ? <p className="float-right pb-2 text-green-500">이메일 형식으로 입력해주세요.</p> : null}
                </div>
                <div className="pb-8">
                    <label className="w-full flex justify-between">
                        <span>비밀번호</span>
                        <input
                            data-testid="password-input" 
                            placeholder="8자리 이상 입력"
                            className="border-green-500 border rounded-full px-2"
                            type="password"
                            onChange={({target}) => setPassword(target.value)}
                        />
                    </label>
                    {password.length > 0 && password.length < 8 ? <p className="float-right pb-2 text-green-500">8자리 이상 입력해주세요.</p> : null}
                </div>
                {error && <p className="text-sm text-green-500">이메일 또는 비밀번호가 일치하지 않습니다.</p>}
                <button 
                    data-testid="signin-button" 
                    type="submit" 
                    className="p-2 px-4 rounded-3xl bg-green-500 font-semibold text-white border border-2 border-green-400 disabled:bg-green-300"
                    disabled={!email.trim() || !email.includes("@") || password.trim().length < 8} 
                >
                    로그인
                </button>
                <a href="/signup" className="block pt-4 text-blue-700 underline">회원가입 하러가기</a>
            </form>
        </div>
    );
}