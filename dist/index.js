export default class CanvasParameters {
    constructor(inputsInfo, options) {
        Object.defineProperty(this, "parametersWrapper", {
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
        Object.defineProperty(this, "onShowEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isVisible", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "position", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onUpdateCanvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.inputsInfo = inputsInfo;
        this.isVisible = (options === null || options === void 0 ? void 0 : options.defaultVisible) || true;
        this.onShowEvent = (options === null || options === void 0 ? void 0 : options.onShowEvent) || "dblclick";
        this.position = options === null || options === void 0 ? void 0 : options.position;
        this.onUpdateCanvas = options === null || options === void 0 ? void 0 : options.onUpdateCanvas;
        this.createParameters();
        this.createInputs(this.getParametersWrapper());
        this.handleClick();
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
            labelNode.textContent =
                inputInfo.placeholder || "Placeholder is not defined";
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
            throw new Error("The wrapper for the parameters was not created.");
        }
        return this.parametersWrapper;
    }
    handleClick() {
        document.addEventListener(this.onShowEvent, () => {
            const parametersWrapper = this.getParametersWrapper();
            if (this.isVisible) {
                parametersWrapper.style.display = "none";
            }
            else {
                parametersWrapper.style.display = "grid";
            }
            this.isVisible = !this.isVisible;
        });
    }
    setStyleForInputNode(inputNode) {
        inputNode.style.display = "block";
        inputNode.style.margin = "5px";
        inputNode.style.outline = "0";
        inputNode.style.border = "none";
    }
    setStyleForParametersWrapperNode() {
        var _a, _b;
        const parametersWrapper = this.getParametersWrapper();
        parametersWrapper.style.position = "absolute";
        parametersWrapper.style.top = ((_a = this.position) === null || _a === void 0 ? void 0 : _a.top) || "0px";
        parametersWrapper.style.left = ((_b = this.position) === null || _b === void 0 ? void 0 : _b.left) || "0px";
        parametersWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        parametersWrapper.style.fontFamily = "sans-serif";
        parametersWrapper.style.padding = "5px";
        parametersWrapper.style.display = this.isVisible ? "grid" : "none";
        parametersWrapper.style.gridTemplateColumns = "repeat(2, 1fr)";
        parametersWrapper.style.userSelect = "none";
        parametersWrapper.style.gap = "5px";
        parametersWrapper.style.alignItems = "center";
        parametersWrapper.style.color = "#ffffff";
    }
    handleInputChange(inputNode) {
        inputNode.addEventListener("input", (e) => {
            var _a;
            const target = e.target;
            if (!target)
                throw new Error("Target was not founed");
            const control = this.inputsInfo.find((inputInfo) => {
                return inputInfo.name === target.name;
            });
            if (!control)
                throw new Error("Control  was not founed");
            control.onChange(target.value);
            (_a = this.onUpdateCanvas) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
