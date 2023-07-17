var emb1 = "AMAhwACAw70A4AvAAMCjvwDA9D8AgJO/AADevwDAW8AAwK4+AGCfPwBgyLwAICdAAKDLPwCAkcAAwAtAAMA+wACAbz4AAAdAAMDJPwBgPUAAgFpAAKCMvgAAaDoA4Im/AKDyPgCgyz8A4J/AAKBxPwDAD0AAgF6/ACDevQDgMcAAoFhAAAAXvwBg0z8AYBG/AECKvwDALMAA4LE/AEBAPgDgC0AAYPS/AACBPwDgrLwAgKZAAOAXwADgvj8AwMk/AOAOQABAjD4AoGQ/AODXPwAgkz4AQFvAAEA6QACgTsAAIGs/AEAHvwCAUr4AoIo+AEBSwABgBsAAQNS/AADXPwAgl78A4Ms/AMDCPwBgxj8AwHC/ACArwADgE0AAoLK/AGDCPgDAgz8AIChAAMB1PgCA4T8AwCu/AKAZwADgwj4AAMu/AADAvgBgK0AAIAtAACDOPwCA6z8AwGA/AICQPwBgAEAAgOu/ACC6vwCA5b4AAF1AAOB1PgBgoMAA4Og/AABlPwDAwj8AwJg8AKBVQABAj0AAAJZAAMD1vwBAHkAAoI8+AKB+PgAgocAAwEbAAABivwAgjz4AYIa+AKCKQAAgLUAAQM8/AKDGvgCgWMAAgCTAAAC3vwCgo78AYKy/AAD7vwCgyL0AoChAAOD4vwCA0b8AAAJAAMB+QADgsr8AINw+AODUvwCgL0AAwK8+AKCbvwCAzb8A4FE/AECKQAAAhMAAILy/AMCCvgBAjr8AwA1AACB+PwCACr8AAJ6/AAA8wABAib8A4KO/AACRwACAoDwAQLO/ACBWPwDAkMAAAHo/AGClvwBAjb8AAOU9AEDlPwCANz0AoAHAAKCtPwCgx78AIDc+AKArPwBAkz8AgP8/AKCAwADggcAA4DM/AKCEQABAjT8AoH/AACCovwAAxD8AIDo/AKAqwAAA6j8AwLNAAMBxvwCAvL8AoBtAAOCYwADgtj8AwKW9AAAjQACgdb8AwKC/AKD2PwBgHEAAIPq9AABEQAAAor8AIKA/AEADwADA5L8AIHlAAOAovwBgiz8AYP8/AOCYPgDAJUAA4APAAMCpvwCgxUAAYHA/AACQQABA678A4D0/AMBmvwCgT0AAwI8+AKD7PwBA7T8AwDC+ACBzQADgmD8AoOY/AKAUwAAARMAAIEY/ACALQABgwz8AoKo+AGBRQACgnMA=\n";

var emb2 = "AMDdvQDgVL8AAGnAAMCGPwCAEj8AAGbAAEDVvgBgoT4AAO47AMBTQAAAdb8AILJAAGCsPwDAIsAAIBJAAKApwAAAwz4AwJc/AIBGPwCAWEAAAGBAACCMvwAAnTsAIIHAAEBMvwDgoj4AoNHAAKCNvwDAsUAA4E/AAMCiPwAAmT8AgGdAAEASwACgEL8AABNAAAD2vgBAzr4AAPk+ACC7PwDgdD8AgO6/AICpvwDAGT8A4HpAAACEvwDAMr4AAIk+AGB7QADAO0AAAM0/AAAWQABgQL8AoIvAAIAHQAAgtL8AYL8+ACAPvgDAgr8AoChAAKATwABgJkAAQLY/AKACQACAqb4AYIs/AKCKvwAA/D8AgAjAAKAEvgCA4D8AgEo9AMD3vwAg+j0AYAzAAMCKvwDgnj4AwCA/ACDHvwAAED8AABE/ACDWvwCgTkAAoKw+AACOvgCgh0AAoHy/AICIPwCAJr8AgIE/AIAewADgEMAAgKw/AODrPwDAtsAAgKs/AKA5QADAiz0AgERAACBaQADg+j8AAGk+AOApvwCgT0AA4Es/AEBFPwDAiMAAYB3AACD3PgDAsz8AYIi+AIAOvwAgY0AAwKM/AECcPwCgl74AoI3AAMAVwACAFz4AABm+AOAJwADgqr8AoDxAAAABwABAQMAAoD6/AKDvPgBAt78AgCy/AEAMPwDABUAAAJw/AADYvwBAn78AwNW/ACCfQAAAk8AAgBQ/AMCnPwBgkz4AwLS+AKCQPwBAqD4AAATAAIAbvwCgCMAAYDe/ACDAwAAAOUAAIAlAAGBAPgCAhsAAAJo/AMD8vwCAAMAAgAs/AAAZvQBgxD8AIJy/AMApvwAgZ8AAwOi9AMDIPwDg+z8AYE5AAKCOwABg674AoCA/ACBRPwCAg70AYIvAACA9PgDgHr8AoJO/AEDHvwAAmEAAAKFAAOCJPQCgBz4AIJE+AKAwwABAGUAAABdAAKCdPwAAo78AwDg/AKDrPwCASUAAAMk+AMAtQABAlT0A4Cs9AOCevwBgn78AAMNAACBUPwAANEAA4FFAAACnvwDAxz8AAFm/AOBZwADgZ0AA4EY/ACCqPwBAcT8AAMQ+AEACwABAYD8AwA7AAOCjQADgJkAAwEs/AMCMQAAgSkAAIIC/AOA7wADAOEAAYMM/AMAOQAAgkr8AgAU/AEAzvwDgScA=\n";

function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var fLen	= binaryString.length / Float64Array.BYTES_PER_ELEMENT;
    var dView	= new DataView( new ArrayBuffer(Float64Array.BYTES_PER_ELEMENT) );
    var fAry	= new Float64Array(fLen);
    // var bytes = new Float32Array(binaryString.length);
    // for (var i = 0; i < binaryString.length; i++) {
    //     bytes[i] = binaryString.charCodeAt(i);
    // }
    var p		= 0;																// Position

for(var j=0; j < fLen; j++){
	p = j * 4;
	dView.setUint8(0,binaryString.charCodeAt(p));
	dView.setUint8(1,binaryString.charCodeAt(p+1));
	dView.setUint8(2,binaryString.charCodeAt(p+2));
	dView.setUint8(3,binaryString.charCodeAt(p+3));
	fAry[j] = dView.getFloat64(0,true);
}
    return fAry;
}

function convert(encodedString){
  let binary_string = atob(encodedString);
    let buffer = new ArrayBuffer(binary_string.length);
    let bytes_buffer = new Uint8Array(buffer);

    for (let i = 0; i < binary_string.length; i++) {
      bytes_buffer[i] = binary_string.charCodeAt(i);
    }

   let values = new Float64Array(buffer);
   return Array.from(values); 
}

console.log(convert(emb1));

function cosineSimilarity(emb1, emb2) {
    const dotProduct = emb1.reduce(
      (sum, value, index) => sum + value * emb2[index],
      0,
    );
    const normEmb1 = Math.sqrt(
      emb1.reduce((sum, value) => sum + value ** 2, 0),
    );
    const normEmb2 = Math.sqrt(
      emb2.reduce((sum, value) => sum + value ** 2, 0),
    );

    return (1 - dotProduct / (normEmb1 * normEmb2)) / 2;
  }
// console.log(base64ToArrayBuffer(emb1));
// console.log(base64ToArrayBuffer(emb2));

var l = cosineSimilarity(convert(emb1), convert(emb2));
console.log(l)

var position = "AAAAAAAA6T9ERERERES0PzMzMzMz8+8/AAAAAAAA8D8="
console.log(convert(position));
