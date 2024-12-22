"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = void 0;
var Parameters = /** @class */ (function () {
    function Parameters(inputsInfo, 
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    canvasClass) {
        this.inputsInfo = inputsInfo;
        this.values = {};
        this.createParameters();
        this.createInputs(this.getParametersWrapper());
        this.handleClick();
        this.setInitialValues();
        this.canvasClass = canvasClass;
    }
    Parameters.prototype.createParameters = function () {
        var parametersWrapper = document.createElement("div");
        document.body.appendChild(parametersWrapper);
        this.parametersWrapper = parametersWrapper;
        this.setStyleForParametersWrapperNode();
    };
    Parameters.prototype.createInputs = function (parametersWrapper) {
        for (var i = 0; i < this.inputsInfo.length; i++) {
            var inputInfo = this.inputsInfo[i];
            var labelNode = document.createElement("label");
            labelNode.textContent = inputInfo.placeholder || "Значение не определено";
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
    };
    Parameters.prototype.getParametersWrapper = function () {
        if (!this.parametersWrapper) {
            throw new Error("Обертка для параметров не была создана");
        }
        return this.parametersWrapper;
    };
    Parameters.prototype.handleClick = function () {
        var _this = this;
        document.addEventListener("dblclick", function () {
            var parametersWrapper = _this.getParametersWrapper();
            if (parametersWrapper.style.display === "none") {
                parametersWrapper.style.display = "grid";
            }
            else {
                parametersWrapper.style.display = "none";
            }
        });
    };
    Parameters.prototype.setStyleForInputNode = function (inputNode) {
        inputNode.style.display = "block";
        inputNode.style.margin = "5px";
        inputNode.style.padding = "5px";
        inputNode.style.outline = "0";
        inputNode.style.border = "none";
    };
    Parameters.prototype.setStyleForParametersWrapperNode = function () {
        var parametersWrapper = this.getParametersWrapper();
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
    };
    Parameters.prototype.setInitialValues = function () {
        var _a;
        for (var i = 0; i < this.inputsInfo.length; i++) {
            var inputInfo = this.inputsInfo[i];
            this.values = __assign(__assign({}, this.values), (_a = {}, _a[inputInfo.name] = inputInfo.value, _a));
        }
    };
    Parameters.prototype.handleInputChange = function (inputNode) {
        var _this = this;
        inputNode.addEventListener("change", function (e) {
            var _a;
            var target = e.target;
            if (!target)
                throw new Error("Параметр не был найден");
            _this.values[target.name] = target.value;
            var canvas = document.getElementsByTagName("canvas")[0];
            document.body.removeChild(canvas);
            var newValues = __assign(__assign({}, _this.values), (_a = {}, _a[target.name] = target.value, _a));
            new _this.canvasClass(newValues);
        });
    };
    return Parameters;
}());
exports.Parameters = Parameters;
