const Login = (props) => {
    const {handleSubmit, setUsername, setPassword} = props
    return(
        <div >
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    username:
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
                </label>
                <br />
                <label>
                    password:
                    <input type="text" onChange={e => setPassword(e.target.value)}/>
                </label>
                <br />
                <button type="submit">Login</button>
                <br />
            </form>
        </div>
    )
}

export default Login