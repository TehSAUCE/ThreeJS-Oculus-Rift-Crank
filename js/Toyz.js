

function FunkyTorus () {
	
	this.create = function create() {
		
		var geo = new THREE.TorusGeometry( 1, 0.5, 150, 300);
		geo.computeFaceNormals();
				
		var dim = 512;
		var size = dim * dim;
		var data = new Uint8Array( size * 3);
		for (var i = 0; i < size; i++) {
			data[ i * 3 + 0] = ( Math.sin( i / 2000 ) * 255 );
			data[ i * 3 + 1] = Math.cos(i % 50) * 255;
			data[ i * 3 + 2] = (Math.cos(i / 10000) * 1000) % 255;
		}
				
		map = new THREE.DataTexture( data, dim, dim, THREE.RGBFormat );
		map.needsUpdate = true;
				
		var s = new ShaderSource();
				
		var material = new THREE.MeshBasicMaterial( { map: map, side: THREE.DoubleSide } );
		shaderMat = new THREE.ShaderMaterial( {
			uniforms: { time: { type: "f", value: 2.1 },
						 tex: { type: "t", value: map }
					   },
			vertexShader: s.vertexShader(),
			fragmentShader: s.fragmentShader()
		} );


		return {mesh: new THREE.Mesh(geo, shaderMat), shaderMaterial: shaderMat};
		
	}
	
	
}