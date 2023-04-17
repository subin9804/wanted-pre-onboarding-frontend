import { useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { signUp } from "../requests";
import { useNavigate, Navigate } from "react-router-dom";


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    if(user) {
        return <Navigate to="/todo" replace={true}/>
    }
    
    async function handleSubmit(e) {

        try {
            e.preventDefault();
            setError(null);
            await signUp(email, password);
            console.log('테스트 성공')

            alert('welcome')
            navigate('/signIn',{ replace: true});

        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    return (
        <div id="signUp">
            <form onSubmit={handleSubmit} className="w-96 p-4 mt-16 mx-auto text-center border border-green-400 border-8 px-8 pb-16 ">
                <h1 className="font-bold text-4xl py-12">회원가입</h1>
                <div className="pb-4">
                    <label className="w-full flex justify-between">
                        <span>이메일</span>
                        <input 
                            data-testid="email-input" 
                            className="border-green-500 border rounded-full px-2"
                            placeholder="Email address"
                            name="email"
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
                            name="password"
                            placeholder="8자리 이상 입력해주세요"
                            className="border-green-500 border rounded-full px-2"
                            type="password"
                            onChange={({target}) => setPassword(target.value)}
                        />
                    </label>
                </div>
                {error && <p className="text-sm text-green-500">중복된 아이디가 존재합니다</p>}
                <button 
                    data-testid="signup-button" 
                    type="submit" 
                    className="p-2 px-4 rounded-3xl bg-green-500 font-semibold text-white disabled:bg-green-300"
                    disabled={!email.trim() || !email.includes("@") || password.trim().length < 8} 
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}