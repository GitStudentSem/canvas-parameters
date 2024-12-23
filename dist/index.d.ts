export default class CanvasParameters {
    parametersWrapper?: HTMLDivElement;
    inputsInfo: InputsInfo;
    onShowEvent: string;
    isVisible: boolean;
    position?: Position;
    onUpdateCanvas?: () => void;
    constructor(inputsInfo: InputsInfo, options?: Options);
    private createParameters;
    private createInputs;
    private getParametersWrapper;
    private handleClick;
    private setStyleForInputNode;
    private setStyleForParametersWrapperNode;
    private handleInputChange;
}
