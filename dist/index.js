"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasParameters = /** @class */ (function () {
    function CanvasParameters(inputsInfo, options) {
        Object.defineProperty(this, "parametersWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputsWrapper", {
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
        Object.defineProperty(this, "helpText", {
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
        this.helpText = (options === null || options === void 0 ? void 0 : options.helpText) || [];
        this.onUpdateCanvas = options === null || options === void 0 ? void 0 : options.onUpdateCanvas;
        this.createParameters();
        this.createInputs();
        this.createHelpText();
        this.handleEvent();
    }
    Object.defineProperty(CanvasParameters.prototype, "createParameters", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var parametersWrapper = document.createElement("div");
            var inputsWrapper = document.createElement("div");
            parametersWrapper.classList.add("parameters-wrapper");
            inputsWrapper.classList.add("inputs-wrapper");
            document.body.appendChild(parametersWrapper);
            document.body.appendChild(inputsWrapper);
            this.parametersWrapper = parametersWrapper;
            this.inputsWrapper = inputsWrapper;
            this.setStyleForParametersWrapperNode();
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "createInputs", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var inputsWrapper = this.getInputsWrapper();
            for (var i = 0; i < this.inputsInfo.length; i++) {
                var inputInfo = this.inputsInfo[i];
                var labelNode = document.createElement("label");
                labelNode.textContent =
                    inputInfo.placeholder || "Placeholder is not defined";
                var inputNode = document.createElement("input");
                labelNode.htmlFor = inputInfo.name;
                inputNode.id = inputInfo.name;
                inputNode.classList.add("parameters-input");
                for (var j = 0; j < Object.entries(inputInfo).length; j++) {
                    var _a = Object.entries(inputInfo)[j], key = _a[0], value = _a[1];
                    if (value) {
                        inputNode.setAttribute(key, value.toString());
                    }
                }
                this.handleInputChange(inputNode);
                inputsWrapper.appendChild(labelNode);
                inputsWrapper.appendChild(inputNode);
            }
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "getParametersWrapper", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (!this.parametersWrapper) {
                throw new Error("The wrapper for the parameters was not created.");
            }
            return this.parametersWrapper;
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "getInputsWrapper", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (!this.inputsWrapper) {
                throw new Error("The wrapper for the inputs was not created.");
            }
            return this.inputsWrapper;
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "setDisplayParameters", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var display = this.isVisible ? "grid" : "none";
            document.documentElement.style.setProperty("--parameters-display", display);
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "handleEvent", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            document.addEventListener(this.onShowEvent, function () {
                _this.setDisplayParameters();
                _this.isVisible = !_this.isVisible;
            });
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "setStyleForParametersWrapperNode", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _a, _b;
            this.setDisplayParameters();
            document.documentElement.style.setProperty("--parameters-position-top", ((_a = this.position) === null || _a === void 0 ? void 0 : _a.top) || "0px");
            document.documentElement.style.setProperty("--parameters-position-left", ((_b = this.position) === null || _b === void 0 ? void 0 : _b.left) || "0px");
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "handleInputChange", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (inputNode) {
            var _this = this;
            inputNode.addEventListener("change", function (e) {
                var _a;
                var target = e.target;
                if (!target)
                    throw new Error("Target was not founed");
                var control = _this.inputsInfo.find(function (inputInfo) {
                    return inputInfo.name === target.name;
                });
                if (!control)
                    throw new Error("Control  was not founed");
                control.onChange(target.value);
                (_a = _this.onUpdateCanvas) === null || _a === void 0 ? void 0 : _a.call(_this);
            });
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "createHelpText", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var texts = this.helpText;
            if (!texts)
                return;
            var parametersWrapper = this.getParametersWrapper();
            for (var i = 0; i < texts.length; i++) {
                var text = texts[i];
                var textNode = document.createElement("p");
                textNode.textContent = text;
                parametersWrapper.appendChild(textNode);
            }
        }
    });
    return CanvasParameters;
}());
exports.default = CanvasParameters;
