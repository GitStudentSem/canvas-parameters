
## Installation

Install сanvas-parameters with npm

```bash
  npm i canvas-parameters
```
    
## Usage/Examples

```typescript
import CanvasParameters from "canvas-parameters";

class MyCanvasProject {
	parameterA: number;
	parameterB: string;
	constructor(parameterA: number, parameterB: string) {
		this.parameterA = parameterA;
		this.parameterB = parameterB;
	}
	// other code of your class
}

new CanvasParameters(
	[
		{
			type: "number",
			placeholder: "Count of shapes",
			/**
			 * this name is the same as
			 * parameterA name in the canvas class
			 */
			name: "parameterA",
			value: "3",
		},
		{
			type: "color",
			placeholder: "Shape color",
			/**
			 * this name is the same as
			 * parameterB name in the canvas class
			 */
			name: "parameterB",
			value: "#ffffff",
		},
	],
	MyCanvasProject,
);

```