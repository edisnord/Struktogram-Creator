# Struktogram Creator

WIP Struktogram(Nassi-Shneiderman diagram) creator for the web, with syntax greatly inspired from github user [Nigjo's struktogramview](https://github.com/nigjo/structogramview/).
This tool is being made with Parsec.fs for the language parsing, [Feliz](https://zaid-ajaj.github.io/Feliz) and [Fable](https://fable.io/)
## Requirements to run on your own PC

* [dotnet SDK](https://www.microsoft.com/net/download/core) v7.0 or higher
* [node.js](https://nodejs.org) v18+ LTS
* [paket](https://fsprojects.github.io/Paket/index.html)


## Development

Before doing anything, start with installing npm dependencies using `npm install` and `paket install`.

Then to start development mode with hot module reloading, run:
```bash
npm start
```
This will start the development server after compiling the project, once it is finished, navigate to http://localhost:8080 to view the application .

To build the application and make ready for production:
```
npm run build
```
This command builds the application and puts the generated files into the `dist` directory (can be overwritten in vite.config.js).