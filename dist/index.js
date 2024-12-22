"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = void 0;
class Parameters {
    /**
     *
     * @param inputsInfo {InputsInfo}
     * @param canvasClass Your class for creating a scene
     */
    constructor(inputsInfo, canvasClass) {
        Object.defineProperty(this, "parametersWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "values", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Your class for creating a scene */
        Object.defineProperty(this, "canvasClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputsInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.inputsInfo = inputsInfo;
        this.values = {};
        this.createParameters();
        this.createInputs(this.getParametersWrapper());
        this.handleClick();
        this.setInitialValues();
        this.canvasClass = canvasClass;
    }
    createParameters() {
        const parametersWrapper = document.createElement("div");
        document.body.appendChild(parametersWrapper);
        this.parametersWrapper = parametersWrapper;
        this.setStyleForParametersWrapperNode();
    }
    createInputs(parametersWrapper) {
        for (let i = 0; i < this.inputsInfo.length; i++) {
            const inputInfo = this.inputsInfo[i];
            const labelNode = document.createElement("label");
            labelNode.textContent = inputInfo.placeholder || "Значение не определено";
            const inputNode = document.createElement("input");
            const randomId = Math.random().toString();
            labelNode.htmlFor = randomId;
            inputNode.id = randomId;
            this.setStyleForInputNode(inputNode);
            for (let j = 0; j < Object.entries(inputInfo).length; j++) {
                const [key, value] = Object.entries(inputInfo)[j];
                if (value) {
                    inputNode.setAttribute(key, value.toString());
                }
            }
            this.handleInputChange(inputNode);
            parametersWrapper.appendChild(labelNode);
            parametersWrapper.appendChild(inputNode);
        }
    }
    getParametersWrapper() {
        if (!this.parametersWrapper) {
            throw new Error("Обертка для параметров не была создана");
        }
        return this.parametersWrapper;
    }
    handleClick() {
        document.addEventListener("dblclick", () => {
            const parametersWrapper = this.getParametersWrapper();
            if (parametersWrapper.style.display === "none") {
                parametersWrapper.style.display = "grid";
            }
            else {
                parametersWrapper.style.display = "none";
            }
        });
    }
    setStyleForInputNode(inputNode) {
        inputNode.style.display = "block";
        inputNode.style.margin = "5px";
        inputNode.style.padding = "5px";
        inputNode.style.outline = "0";
        inputNode.style.border = "none";
    }
    setStyleForParametersWrapperNode() {
        const parametersWrapper = this.getParametersWrapper();
        parametersWrapper.style.position = "absolute";
        parametersWrapper.style.top = "0px";
        parametersWrapper.style.left = "0px";
        parametersWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        parametersWrapper.style.fontFamily = "sans-serif";
        parametersWrapper.style.padding = "5px";
        parametersWrapper.style.display = "grid";
        parametersWrapper.style.gridTemplateColumns = "repeat(2, 1fr)";
        parametersWrapper.style.gap = "5px";
        parametersWrapper.style.alignItems = "center";
        parametersWrapper.style.color = "#ffffff";
    }
    setInitialValues() {
        for (let i = 0; i < this.inputsInfo.length; i++) {
            const inputInfo = this.inputsInfo[i];
            this.values = Object.assign(Object.assign({}, this.values), { [inputInfo.name]: inputInfo.value });
        }
    }
    handleInputChange(inputNode) {
        inputNode.addEventListener("change", (e) => {
            const target = e.target;
            if (!target)
                throw new Error("Параметр не был найден");
            this.values[target.name] = target.value;
            const canvas = document.getElementsByTagName("canvas")[0];
            document.body.removeChild(canvas);
            const newValues = Object.assign(Object.assign({}, this.values), { [target.name]: target.value });
            new this.canvasClass(newValues);
        });
    }
}
exports.Parameters = Parameters;
