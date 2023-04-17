import { class_type } from "../fable-library.4.0.1/Reflection.js";
import { render } from "react-dom";

export class ReactDOM {
    "constructor"() {
    }
}

export function ReactDOM$reflection() {
    return class_type("Feliz.ReactDOM", void 0, ReactDOM);
}

export function ReactDOM_render_Z3D10464(element, container) {
    return render(element(), container);
}

export class ReactDOMServer {
    "constructor"() {
    }
}

export function ReactDOMServer$reflection() {
    return class_type("Feliz.ReactDOMServer", void 0, ReactDOMServer);
}

