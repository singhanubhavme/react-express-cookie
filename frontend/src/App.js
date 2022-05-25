import React from "react";
import axios from "axios";
class App extends React.Component {
    onRegisterClick = async () => {
        const response = await axios(
            {
                withCredentials: true,
                method: 'post',
                url: "http://localhost:3000/register",
                headers: {},
                data: {
                    username: "test",
                    password: "test"
                }
            }
        );
        console.log(response);
    };
    onLoginClick = async () => {
        const response = await axios(
            {
                withCredentials: true,
                method: 'post',
                url: "http://localhost:3000/login",
                headers: {},
                data: {
                    username: "test",
                    password: "test"
                }
            }
        );
        console.log(response);
    };

    render() {
        return (
            <>
                <div style={{ marginTop: "10px" }} onClick={() => this.onRegisterClick()}>
                    Register (Register Will Also Generate Cookie)
                </div>
                <div style={{ marginTop: "10px" }} onClick={() => this.onLoginClick()}>
                    Login
                </div>
            </>
        );
    }
}

export default App;