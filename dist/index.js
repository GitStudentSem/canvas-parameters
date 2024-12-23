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
    Object.defineProperty(CanvasParameters.prototype, "createParameters", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var parametersWrapper = document.createElement("div");
            document.body.appendChild(parametersWrapper);
            this.parametersWrapper = parametersWrapper;
            this.setStyleForParametersWrapperNode();
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "createInputs", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (parametersWrapper) {
            for (var i = 0; i < this.inputsInfo.length; i++) {
                var inputInfo = this.inputsInfo[i];
                var labelNode = document.createElement("label");
                labelNode.textContent =
                    inputInfo.placeholder || "Placeholder is not defined";
                var inputNode = document.createElement("input");
                var randomId = Math.random().toString();
                labelNode.htmlFor = randomId;
                inputNode.id = randomId;
                this.setStyleForInputNode(inputNode);
                for (var j = 0; j < Object.entries(inputInfo).length; j++) {
                    var _a = Object.entries(inputInfo)[j], key = _a[0], value = _a[1];
                    if (value) {
                        inputNode.setAttribute(key, value.toString());
                    }
                }
                this.handleInputChange(inputNode);
                parametersWrapper.appendChild(labelNode);
                parametersWrapper.appendChild(inputNode);
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
    Object.defineProperty(CanvasParameters.prototype, "handleClick", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            document.addEventListener(this.onShowEvent, function () {
                var parametersWrapper = _this.getParametersWrapper();
                if (_this.isVisible) {
                    parametersWrapper.style.display = "none";
                }
                else {
                    parametersWrapper.style.display = "grid";
                }
                _this.isVisible = !_this.isVisible;
            });
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "setStyleForInputNode", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (inputNode) {
            inputNode.style.display = "block";
            inputNode.style.margin = "5px";
            inputNode.style.outline = "0";
            inputNode.style.border = "none";
        }
    });
    Object.defineProperty(CanvasParameters.prototype, "setStyleForParametersWrapperNode", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _a, _b;
            var parametersWrapper = this.getParametersWrapper();
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
    });
    Object.defineProperty(CanvasParameters.prototype, "handleInputChange", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (inputNode) {
            var _this = this;
            inputNode.addEventListener("input", function (e) {
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
    return CanvasParameters;
}());
exports.default = CanvasParameters;
