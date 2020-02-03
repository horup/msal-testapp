import * as React from 'React';
import * as ReactDom from 'react-dom';
import * as Msal from 'msal';

const msalConfig:Msal.Configuration = {
    auth: {
        authority:'https://login.microsoftonline.com/513e820d-0ce6-4130-84b8-f6de1cc66e94/',
        clientId: '1084bc85-7e9b-4aa6-97a9-a047c3eb2c46',
    }
};

const msal = new Msal.UserAgentApplication(msalConfig);
msal.handleRedirectCallback((error, response) => {
    // handle redirect response or error

});

var loginRequest = {
    scopes: ["user.read", "mail.send"] // optional Array<string>
};

setInterval(async ()=>
{
    if (msal.getAccount())
    {
        console.log(await msal.acquireTokenPopup(loginRequest));
    }
}, 5000)

const Index = ()=>
{
    return (
    <div>
        <div>
        </div>
        <button onClick={()=>msal.loginRedirect(loginRequest)}>Login</button>
        <br/>
        <button onClick={()=>msal.logout()}>Logout</button>
    </div>)
}

ReactDom.render(<Index/>, document.getElementById('main'));