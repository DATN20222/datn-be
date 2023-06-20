var emb1 = "AIApPwBgecAAgKFAAICSvwBAwEAAwJU/AICSPwCAEcAAgFe/AEAmQAAghr0A4IdAAKDnvgCA8b4AQDe/AKCUvADAFsAAgMQ/AEDdvwBgGD8AIIc/AMAxwAAA4r8AIEg/AEDzwADA678AIM/AAGCBQADgCUAAAFy/AMCNQABgsL4AgFRAAMAGPwCgpL8AIAA/AIA6QACA3j4A4CDAAADvPwDAE74AQDw/AACgQAAgxcAAwI/AAAD+vwAAYMAA4BXAAIALvgAgmz8A4Dg/AMAWwABgSUAAIN2/AGBBvgAA3r8AYGM/AGABPgAAtj8AYLG/AKBvwACgM0AAAJJAAABnQAAgrDwAYH0/AGBdwADAmb8AYCNAACDCPwBALz8AYDtAACCovgAgqUAAoFfAAIBPvwDAg8AAQI9AAOCZQACA/0AAgBVAAEB5vwCAEkAAwCm+AMCVwADgNEAAwNy+AACQvwAAyT8AAGvAAGC+vwAAv78AIAo+AOC1vwCAGb8AYMO/AGBdwAAAxEAA4FhAAMD9vwAgOEAAwA+/AAAiPgBAAEAA4DY+AMD3PwAgAUAAgB7AAEDMwABAi0AAINm/AOAOQACgf78AIKpAAECzvwCAwUAA4AU/AMCQwABg1L8AYJBAAABePwBAbUAAYG1AAEAlwABAmj8AIAS/AABpQACgQsAAoGDAAODPPwAAgT8AID7AAGCswAAgtkAAwIi/AOAMQABAFcAAoDTAAEDTPgBgc74AYGw/AMBSPwAAt70AoGg/AKBbQABgqMAAAFLAAECWvwCAlr4AAEw+AECBvwCAWb8AwGm/AAAdwADg1b4AADs+AMD6PwDg6j8AALI9AABEwAAASMAA4Ns/AMDAPgAA2L4AgIRAAAD1vgAgH0AAQMc9AAAtPgDgFcAAILA9AACxQABgazwAwMG/AIBBwAAA4T8AgBNAAAAuwAAgukAAYIDAACCavwDAXz4AQBnAACCOvwCgj8AAQDG+AECZQACgd8AAYMVAAIABQQDg2LwAQHPAAGBbPwBgrj8AgL49AGAKvwCgq0AAAIVAAKAGvwCggEAAgCa/AGBOPwBgP0AAIBm/AACQQABgE8AAAD0/AOAcwADAokAA4CZAAABVQADA9r8A4Ow/AAD6PwDgsD8AQK6+AGA3wABgFj8AoLtAACANwADAu78AgJ8/AOB3wABgzj4=\n";

var emb2 = "AECVPACgir8AYMNAAIBewABAZD4AgJM/AKAOQABgLUAAYB3AAKD7QAAgsMAAwJ9AAMCMwABA2b4AwJa/AKAmvgCgUr8AwERAAGCYwADAOkAA4Ne/AIBHwABgkUAAQLM/ACBMwABgyD8AQFvAAODQvQAAaz8AgPq/AECtvwCgh78AYDlAAIA/QABAsb4AgCm/AGCDvwDARr8AAFDAAEB1vwDgNEAA4Io/AGDnQABgg0AAwCbAAIBuQABgxD8A4JNAAIAqQAAAHr8AQLe/AOCRwAAAL8AA4IHAAMAmOwBATkAAoOC+ACAsQAAAfUAAgIA9AIBIQADAiz4AwL4/AKB7QADALEAAgBo/AEDuvwBgab8AYJZAAMCRQABAXj8AwEXAAABPvwBAWsAAgGPAAEAXQAAgAUAAgOu/ACB1vwAAFz8AQEHAACAowABgQcAAgIXAAIDSPgBAykAAIIm/AKDyPwDA+D8AQOI/AMA3PwDAu78AoNRAACAvwACgpD8AoIE9AEBSwADAw0AAQFm/AABBPwDATj8AAEc/AGASvwAgIEAAINU+AKAXQABghD8A4BrAAICKwACgokAAgDm/AMBGvwDgNkAAgIc+AKABQABA0r8A4FM/AMD5PQDAGkAA4Nc9AGD4vQCAikAAgLg/AICTwADg/b4AwNtAAKA4QAAgAUAAgMzAAKDQPwAgT0AA4J8/AKByvwDgCz8AoMS/AEAPQAAAEsAA4Ji/AMDRvgBg3D8A4NE/AOCNvwDA9r8AAB1AAIC8QADgVsAAgJm/AACNvwCA+T4AYCRAAOBBQADADcAA4CJAAOD1vwDAsUAAgMQ+AEC/vwBAF8AAANC+AIDYPwCAtMAAAMs9AGA0wACgPcAAwKw/AACFPwDgrT4AwMk/AMDTvwAgDcAAoJ3AAGBEQACgMT8AQGA+AICxPgDgBj4AQP89AEBpQADAskAA4F9AAEBEQAAAyz8AIDI+AACDvwDAwT8AwA0+AMByQAAgtj8AgIRAAGAuQACgsUAA4G6/AGDGvgAgsL8AwG2/AODTPwCgnkAA4Is/AKC0vwBgJz8AADa+AMBzPwDA078AAJ2/ACDcvwBgCMAAIOQ/AMDePwDg6b8AIH/AAEDGPwAABMAAYAXAAKAyQABgVEAA4CY/ACCkPwBgJcAAwKPAAMAmQACAGMAAQKU/AEDrvwBg1T4=\n";

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