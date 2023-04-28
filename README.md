# Struktogram Creator

WIP Struktogram(Nassi-Shneiderman diagram) creator for the web, with syntax greatly inspired from github user [Nigjo's struktogramview](https://github.com/nigjo/structogramview/).
This tool is being made with Parsec.fs for the language parsing, [Feliz](https://zaid-ajaj.github.io/Feliz) and [Fable](https://fable.io/)

For a rundown on the app's language, please refer to the [wiki](https://github.com/edisnord/Struktogram-Creator/wiki) section of this repo

The app is now deployed on GitHub pages, so if you wish to use it check out [this link](https://edisnord.github.io/Struktogram-Creator/)

## Requirements to run on your own PC

* [dotnet SDK](https://www.microsoft.com/net/download/core) v7.0 or higher (with dotnet CLI in path)
* [node.js](https://nodejs.org) v18+ LTS
* [paket](https://fsprojects.github.io/Paket/index.html)

## Objectives

1. [ ] Implement parser
   1. [X] If
   2. [X] Loop
   3. [X] For
   4. [X] Concurrent
   5. [X] Break, Exit, Return
   6. [X] Call
   7. [X] Sequence
   8. [ ] Comment(and multiline)
   9. [X] Switch-case 
2. [X] Connect parser to diagram generator
3. [ ] Implement diagram generator blocks
   1. [X] Caption block
   2. [X] Return block
   3. [X] Exit block
   4. [X] Call block
   5. [X] Break block
   6. [X] If block
   7. [X] For block
   8. [X] Loop block
   9. [x] Concurrent block
   10. [ ] Comment block
   11. [ ] Switch-case 
4. [ ] Add syntax highlighting for Ace
5. [ ] Parser error reporting(use the console for now, that's where I print syntax errors)
6. [ ] Add theming for diagram and page colors

## Development

Before doing anything, start with installing npm dependencies using `npm install` and `paket install`.

Then to start development mode with hot module reloading, run:
```bash
npm start
```
This will start the development server after compiling the project, once it is finished, navigate to http://localhost:5137 to view the application .

To build the application and make ready for production:
```
npm run build
```
This command builds the application and puts the generated files into the `dist` directory (can be overwritten in vite.config.js).

## Testing

To run the project's tests:
```
npm run test
```