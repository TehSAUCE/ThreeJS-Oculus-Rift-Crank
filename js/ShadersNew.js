
function ShaderSource() {
	
	this.vertexShader = function vertexShader() {
			var source = [

			'uniform float time;',
			
			'varying vec3 norm;',
			'varying vec2 vUv;',
			'varying vec3 pos;',
		
			'void main() {',
				'norm = normal;',
				'vUv = uv;',
				'pos = position;',
				
				'vec3 p1 = position + ( 0.2 * normal * (sin(time * 13.0) + 0.1) );',
				
				'vec3 p2 = vec3( p1.x , p1.y + 0.1 * sin(time * 13.0) * sin(p1.x * 9.0 + time * 50.0) ,',
				
				'p1.z + 0.08 * sin( -time * 21.0) * sin(p1.y * 9.0 + time * 90.0) );',
				
				'gl_Position = projectionMatrix * modelViewMatrix * vec4(p2, 1.0);',
			'}'
			
			].join('\n');
			return source;
	}
	
		this.fragmentShader = function fragmentShader() {
			var source = [

			'uniform float time;',
			
			'uniform sampler2D tex;',
			
			'varying vec3 norm;',
			'varying vec2 vUv;',
			'varying vec3 pos;',
			
			'void main() {',
			
			//	gl_FragColor = vec4(0.8, sin( time * gl_FragCoord.x ), cos( time * gl_FragCoord.y ), 1.0);
			
				'vec3 pointLight = vec3( 3.0 * cos(20.0 * time), 2.5 * sin(20.0 * time), 3.0);',
				
				'vec3 lightRay = normalize(pointLight - pos);',
			
				'float lightness = pow( dot( norm, lightRay ) + 0.05, 5.5 ) + 0.05;',
				
				'float blip = 1.0 - pow( sin( gl_FragCoord.y / 5.0) + 0.9, 6.0) ;',
			
				'vec3 tColor = texture2D( tex, vec2( vUv.x * sin( 1.8 * time ), vUv.y * cos ( 6.89 * time) ) ).rgb;',
				
				'gl_FragColor = vec4( tColor * lightness, 1.0 );',

			'}'
		
			].join('\n');
			return source;
	}
	
	
}