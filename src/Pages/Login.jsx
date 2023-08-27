import Button from "../component/Button";

function Login() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-row justify-center border-b">
                <h1 className="text-2xl p-5">Login</h1>
            </div>
            <div className="flex flex-col h-full justify-center">
                <form className="flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center h-full">
                    <label className="text-ash-grey">Username</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="text" name="username" />

                    <label className="text-ash-grey">Password</label>
                    <input className="bg-transparent text-ash-grey border-ash-grey border rounded-full py-1 px-3 m-2" type="password" name="password" />

                    <Button className="py-2 px-10 m-2" type="submit" value="Login"> Login</Button>
                  </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
