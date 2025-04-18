/**
 * WEBGL is a class to draw the points on canvas.
 */

class WebGL {

	constructor(canvas, gl_context) {
		this.canvas = canvas;
		this.gl = gl_context;
	}

	setup() {

		// Create and link all shaders and programs
		const shaderSet = [
			{
				type: this.gl.VERTEX_SHADER,
				id: "vertex-shader"
			},
			{
				type: this.gl.FRAGMENT_SHADER,
				id: "fragment-shader"
			}
		]
		this.shaderProgram = this.build_shader_program(shaderSet);

		// Look up attributes locations
		this.vertexPosition = this.gl.getAttribLocation(this.shaderProgram, "vertexPosition");

		// Create vertex buffer
		var vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	};

	build_shader_program(shaderInfo) {
		var program = this.gl.createProgram();

		shaderInfo.forEach(elment=> {
			var shader = this.compile_shader(elment.id, elment.type);

			if (shader) {
				this.gl.attachShader(program, shader);
		  	}
		});

		this.gl.linkProgram(program)

		var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
		if (success) {
			console.log("Successfully linked shader program!");
		}
		else {
			console.log("Error linking shader program:");
			console.log(this.gl.getProgramInfoLog(program));
		}

		return program;
	};

	compile_shader(id, type) {
		var code = document.getElementById(id).firstChild.nodeValue;
		var shader = this.gl.createShader(type);

		this.gl.shaderSource(shader, code);
		this.gl.compileShader(shader);

		var success = this.gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (success) {
			console.log(`Successfully compiled ${type === this.gl.VERTEX_SHADER ? "vertex" : "fragment"} shader!`);
		}
		else {
			console.log(`Error compiling ${type === this.gl.VERTEX_SHADER ? "vertex" : "fragment"} shader:`);
		  	console.log(this.gl.getShaderInfoLog(shader));
		}

		return shader;
	};

	// Convert the points to float array for webgl
    to_array(points) {
        var pointArray = [];

        points.forEach(element=>{
            pointArray.push(element.x);
            pointArray.push(element.y);
        });

        return new Float32Array(pointArray);
	};

	// Setup before the drawing
	draw_setup() {
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

		// Set the background to be grey
		this.gl.clearColor(0.9, 0.9, 0.9, 1.0);
		// Clear the color buffer with specified clear color
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		// Set the shader program
		this.gl.useProgram(this.shaderProgram);
	};

	// Clear previous drawing
	clear() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	};

	// Draw points
	draw_points(points) {
		if (points.length > 0)
		{
			var vertexArray = this.to_array(points);

			this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.STATIC_DRAW);

			var vertexCount = vertexArray.length/2;

			this.gl.enableVertexAttribArray(this.vertexPosition);
			this.gl.vertexAttribPointer(this.vertexPosition, 2, this.gl.FLOAT, false, 0, 0);

			this.gl.drawArrays(this.gl.POINTS, 0, vertexCount);
		}
	};

	// Draw line segment between p1 and p2
	draw_line(p1, p2) {
		var vertexArray = new Float32Array([p1.x, p1.y, p2.x, p2.y]);

		this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.STATIC_DRAW);

		this.gl.enableVertexAttribArray(this.vertexPosition);
		this.gl.vertexAttribPointer(this.vertexPosition, 2, this.gl.FLOAT, false, 0, 0);

		this.gl.drawArrays(this.gl.LINES, 0, 2);
	};
};
