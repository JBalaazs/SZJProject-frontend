export function ParseJWT () {

    function parseJwt(token: string): {userId: number | null, username: string } | null {
        
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const payload = JSON.parse(jsonPayload);

        const username = payload.sub;

        return{

            userId: payload[username].UserId,
            username: username

        };
    
    }

    return{
        parseJwt
    }

}