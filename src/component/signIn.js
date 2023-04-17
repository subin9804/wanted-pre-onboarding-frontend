import { useState, useContext } from "react";
import { signIn } from "../requests";
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

            // console.log(user);
            
            setUser(user);
                            
        } catch (error) {
            setError(error);
            console.log(error)
        }
    }


    return (
        <div id="signIn">
            <form onSubmit={handleSubmit} className="w-96 p-4 mt-16 mx-auto text-center border border-green-400 border-8 px-8 pb-16 ">
                <h1 className="font-bold text-4xl py-12">로그인</h1>
                <div className="pb-4">
                    <label className="w-full flex justify-between">
                        <span>이메일</span>
                        <input 
                            data-testid="email-input" 
                            className="border-green-500 border rounded-full px-2"
                            placeholder="이메일 형식으로 작성"
                            type="text"
                            onChange={({target}) => setEmail(target.value)}
                        />
                    </label>
                </div>
                <div className="pb-4">
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
                </div>
                {error && <p className="text-sm text-green-500">이메일 또는 비밀번호가 일치하지 않습니다.</p>}
                <button 
                    data-testid="signin-button" 
                    type="submit" 
                    className="p-2 px-4 rounded-3xl bg-green-500 font-semibold text-white border border-2 border-green-400 disabled:bg-green-300"
                    disabled={!email.trim() || !email.includes("@") || password.trim().length < 8} 
                >
                    <Link to="/todo">로그인</Link>
                </button>
                <button 
                    className="p-2 px-4 rounded-3xl bg-white border border-2 border-green-400 font-semibold mx-2"
                >
                    <Link to="/signup">회원가입</Link>
                </button>
            </form>
        </div>
    );
}