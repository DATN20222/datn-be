var emb1 = "AGA7wACABsAAgCvAAMAovwCAgj8AAIfAAMDcPwAg8D8AoPm/AOB3PwAARj8A4LY+ACCjwACAgL8AYNE/AKAsvgCgWsAAwBvAAKASwADAlz8AoMc/AIDkPwAgib8AQAfAAIAWQAAAG0AAYIzAACAKwACAxr8AQBlAAMAnPwCgO8AAoH2/AADBvwBAM8AAADXAAEAeQADgs0AAwA/AAKDtvgDgSMAAgFY/AKC4PgDA1r0AoAjAAECZQADgJT8AINe/AMDNPwAAAj8AQM6+AMDyPQBA/T8AALq/AEDEvgAASz8AIA3AAKDPPwDgGMAAAJo/AADxvwAgfz8AYEpAAGBbPwBA0b8AIKK+AGBCwABgzD8AYBq/AODCvwDAKUAAgDW+AODwPwCgSL8AAEjAAAAtPwAgNL8AACBAAMCkPwCA/j8AII3AAIAZwABg/j8AAMe/AGAEwABgfL4AgCJAAKBCPQAAE0AAAOe/AAD2vwBAXb8AIA/AAACcQACAcr8A4NTAAIBPPwBACT8AgKJAAEDqPwAAKUAAQPI/AKACwABAMz8AQBLAAODXPwAghD8AINU+AEArQADAxr8AYPQ/AEAXwABAXEAAgJi/AID/vwDAyD8AgP2/AKA7PgDgjsAA4IZAAAA9wABgsL8AABhAAEBLvwDg4b8AIHS/AOATwAAApj8AwCjAAIBbvwBApz8AQBPAACCwwADADkAAALs/AACWPwBATMAAgIK+AGDTwADgMkAAIEJAAEAhwADAk78AwPS9AMDFvQCgpr8AQMU/ACD8PgAAcMAAQBNAAGBRQABAwsAAYLY/AACzvwBACcAAoDxAACAuPwCAPUAAwOA/AACLwAAgTsAAQDHAAMCgPwCAPMAAwE1AAIDCvwAgEr8AYCHAAEABwADAQL8AwDfAAKA8PwCgA8AAADjAAOBtvgBAf0AAgNk/AKADQAAAzT4AQPE/AKAmQADAtz8AQCBAAADcvwDgjL8AYBJAAMCUQAAgGsAAIOa9AGBXQACgGb8AoAo/AECUPwAAFcAAAEk9AEAwQADgbL8AoIc/AOCWQACgrj8AQPa/AMA2vwAAmz8AoG/AAOB+QAAAST8AYHDAAGBNwAAgnr4AwCLAAIBUQAAg/r8AwAdAAIBgQACgoj4AgOa/AGAxwADg5r8AYJ1AAOAtPwCgRcAAQEy/AGD9PwCgcT8=\n";

var emb2 = "AEA/wAAgVcAAgOk/AIBIwACgqT8AgB/AAIA0wABAFDwA4BjAACAMPwBgFcAA4CBAAOCBvwCAs78AAJI/AGAIPwDABcAAIGE+AIDpvgDAp78AgI6/AEARQABgaD4AwCrAAGCMPwBAR0AA4IPAAKBIPgBA6r8AYGO+AOA8PwDg9j4AYATAAMC0vwCghj4AoHa9AAD2PwAAZ0AAQFi/AEAPPgBgPsAAQHG/AAAaQADAlr8AYGnAAGAMPgCgIEAAANq/AKALQABAGsAAQJe/AGCFvwDg1D8AIPi9AECnvwCAzz8AwES/AGCBQABAy78AgJ8/AMA8wACgLkAAgFBAAECFQABgEsAAIEFAAKDpvwAAGb8AwEC/AKBYPwBAe0AAABxAAOAZQABg5T8A4La+AMDgPwBAtr8AwDZAACDfvwAgEEAAAJzAACBlwADgXkAAgCfAAGACwADACL8AQJ8/AKBhPgDALkAAIIg9AGDYPwCAkD4A4Je9AIAHQABgw78AQLPAAEBEPwAAEz8AIGdAAICGPwDgPkAAIKE/AMBgPgCAA0AAAKW/AKC/vgCgur8AoCvAAICmvQCAqL8AILg+AEBXvgBgN0AAwFg+ACBkvwCAF0AAwFbAAOADwACgir8AABFAAKCXvgCgj74AQJ4/AKDivgDAIb8AYJO/AAAAvgBgl78A4Ma/AGCXvgDAhz8AACk/AEBAwADAdz8AgB4/ACA1vgCgQ8AAIKK/AAAlwADgJUAAwDa+AGCJvQAgAMAAoO8/AOC7PwCgLL8A4PK9AGDSvgDgPr8AYEi/AOBpvwDAkcAAoOG+ACDTPADgwr8AwIQ+ACCcPwDg8r8A4EpAAOBIwACgh78AINC/ACAgQACgIcAAoCVAAADevwDgtL8AYKM+AEC0vwBAJ74AANe/AMDsPwCgy70AQHo+AKBuvwCAIUAAAJ9AAEAIvwBg9z8A4Ga/AOB9vgBA2z4A4BFAAOAlPwCgE78AQDhAAMCkPwDAxL8AgPU+AEBZQAAA4j8AgEdAAEAYvwBgK8AAQF4+AODqPwDAZT0AoG2+AEDNPwAAtT0AIEPAAADxvgAgikAAQK2+AOBBQABgnz8A4MG/AKBCwACgTr8AQLM+AEBSPwAAQL8A4Cg9AEBBQADAvz8AgEK9AADtvwCg8z4A4JZAACDVPwCgsr8AwGw/AOCevwAgub8=\n";

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
