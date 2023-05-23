**How to Run** <br><br>
Run the Server
```
node server.js
```
To sign up a new user, make a POST request to http://localhost:3000/signup with a JSON body containing username and password:
```
curl -X POST -H "Content-Type: application/json" -d '{"username":"user1", "password":"password1"}' http://localhost:3000/signup

```
To log in, make a POST request to http://localhost:3000/login with the same credentials:
```
curl -X POST -H "Content-Type: application/json" -d '{"username":"user1", "password":"password1"}' http://localhost:3000/login

```
You will receive a JSON response containing a JWT token.

- To access the protected route, make a GET request to http://localhost:3000/protected and include the JWT token in the Authorization header:
```
curl -X GET -H "Authorization: Bearer <token>" http://localhost:3000/protected

```
Replace <token> with the JWT token obtained from the login response. If the token is valid, you will receive a JSON response with the message "Protected data".