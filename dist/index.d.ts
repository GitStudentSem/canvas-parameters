export type InputsInfo = Array<Omit<Partial<HTMLInputElement>, "value" | "name"> & {
    /** uniq name for the control */
    name: string;
    /** The value for the input */
    value: string | number;
    onChange: (value: any) => void;
}>;
export interface Position {
    top?: CSSStyleDeclaration["top"];
    left?: CSSStyleDeclaration["left"];
}
export interface Options {
    /**
     * Is show parameters by default
     * @default true
     */
    defaultVisible?: boolean;
    /**
     * HTML event for show parameters
     * @default "dblclick"
     */
    onShowEvent?: string;
    /** For clear canvas or new init function */
    onUpdateCanvas?: () => void;
    /** Positon of the parameters on page */
    position?: Position;
    helpText?: string[];
}
export default class CanvasParameters {
    parametersWrapper?: HTMLDivElement;
    inputsWrapper?: HTMLDivElement;
    inputsInfo: InputsInfo;
    onShowEvent: string;
    isVisible: boolean;
    position?: Position;
    helpText?: string[];
    onUpdateCanvas?: () => void;
    constructor(inputsInfo: InputsInfo, options?: Options);
    private createParameters;
    private createInputs;
    private getParametersWrapper;
    private getInputsWrapper;
    private setDisplayParameters;
    private handleEvent;
    private setStyleForParametersWrapperNode;
    private handleInputChange;
    private createHelpText;
}
