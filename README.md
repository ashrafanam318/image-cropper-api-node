

### Scripts
- `npm start`: Starts the server with nodemon watcher on `http://localhost:3000`

- `npm run build`: Transpiles ts code to js and puts it in `build` folder
- `npm run lint`: Runs eslint to check for problems in the ts code
- `npm run prettier`: Runs prettier for format the ts code

- `npm run server`: Runs prettier, eslint and build then starts the server from `build/index.js` on `http://localhost:3000`
- `npm test`: Transpiles ts code to js and performs unit tests


### Testing the Endpoint

the route for fetching images of different sizes is `/image`

**Query params**
 - filename: `encenadaport | fjord | icelandwaterfall | palmtunnel | santamonica`
 - height: `number >= 0`, 
 - width: `number >= 0`
 
 **Example URL**
 
 ```
http://localhost:3000/image?filename=fjord&height=300&width=720
```
