import numpy as np
import base64

emb1 = "AIApPwBgecAAgKFAAICSvwBAwEAAwJU/AICSPwCAEcAAgFe/AEAmQAAghr0A4IdAAKDnvgCA8b4AQDe/AKCUvADAFsAAgMQ/AEDdvwBgGD8AIIc/AMAxwAAA4r8AIEg/AEDzwADA678AIM/AAGCBQADgCUAAAFy/AMCNQABgsL4AgFRAAMAGPwCgpL8AIAA/AIA6QACA3j4A4CDAAADvPwDAE74AQDw/AACgQAAgxcAAwI/AAAD+vwAAYMAA4BXAAIALvgAgmz8A4Dg/AMAWwABgSUAAIN2/AGBBvgAA3r8AYGM/AGABPgAAtj8AYLG/AKBvwACgM0AAAJJAAABnQAAgrDwAYH0/AGBdwADAmb8AYCNAACDCPwBALz8AYDtAACCovgAgqUAAoFfAAIBPvwDAg8AAQI9AAOCZQACA/0AAgBVAAEB5vwCAEkAAwCm+AMCVwADgNEAAwNy+AACQvwAAyT8AAGvAAGC+vwAAv78AIAo+AOC1vwCAGb8AYMO/AGBdwAAAxEAA4FhAAMD9vwAgOEAAwA+/AAAiPgBAAEAA4DY+AMD3PwAgAUAAgB7AAEDMwABAi0AAINm/AOAOQACgf78AIKpAAECzvwCAwUAA4AU/AMCQwABg1L8AYJBAAABePwBAbUAAYG1AAEAlwABAmj8AIAS/AABpQACgQsAAoGDAAODPPwAAgT8AID7AAGCswAAgtkAAwIi/AOAMQABAFcAAoDTAAEDTPgBgc74AYGw/AMBSPwAAt70AoGg/AKBbQABgqMAAAFLAAECWvwCAlr4AAEw+AECBvwCAWb8AwGm/AAAdwADg1b4AADs+AMD6PwDg6j8AALI9AABEwAAASMAA4Ns/AMDAPgAA2L4AgIRAAAD1vgAgH0AAQMc9AAAtPgDgFcAAILA9AACxQABgazwAwMG/AIBBwAAA4T8AgBNAAAAuwAAgukAAYIDAACCavwDAXz4AQBnAACCOvwCgj8AAQDG+AECZQACgd8AAYMVAAIABQQDg2LwAQHPAAGBbPwBgrj8AgL49AGAKvwCgq0AAAIVAAKAGvwCggEAAgCa/AGBOPwBgP0AAIBm/AACQQABgE8AAAD0/AOAcwADAokAA4CZAAABVQADA9r8A4Ow/AAD6PwDgsD8AQK6+AGA3wABgFj8AoLtAACANwADAu78AgJ8/AOB3wABgzj4=\n"

emb2 = "AECVPACgir8AYMNAAIBewABAZD4AgJM/AKAOQABgLUAAYB3AAKD7QAAgsMAAwJ9AAMCMwABA2b4AwJa/AKAmvgCgUr8AwERAAGCYwADAOkAA4Ne/AIBHwABgkUAAQLM/ACBMwABgyD8AQFvAAODQvQAAaz8AgPq/AECtvwCgh78AYDlAAIA/QABAsb4AgCm/AGCDvwDARr8AAFDAAEB1vwDgNEAA4Io/AGDnQABgg0AAwCbAAIBuQABgxD8A4JNAAIAqQAAAHr8AQLe/AOCRwAAAL8AA4IHAAMAmOwBATkAAoOC+ACAsQAAAfUAAgIA9AIBIQADAiz4AwL4/AKB7QADALEAAgBo/AEDuvwBgab8AYJZAAMCRQABAXj8AwEXAAABPvwBAWsAAgGPAAEAXQAAgAUAAgOu/ACB1vwAAFz8AQEHAACAowABgQcAAgIXAAIDSPgBAykAAIIm/AKDyPwDA+D8AQOI/AMA3PwDAu78AoNRAACAvwACgpD8AoIE9AEBSwADAw0AAQFm/AABBPwDATj8AAEc/AGASvwAgIEAAINU+AKAXQABghD8A4BrAAICKwACgokAAgDm/AMBGvwDgNkAAgIc+AKABQABA0r8A4FM/AMD5PQDAGkAA4Nc9AGD4vQCAikAAgLg/AICTwADg/b4AwNtAAKA4QAAgAUAAgMzAAKDQPwAgT0AA4J8/AKByvwDgCz8AoMS/AEAPQAAAEsAA4Ji/AMDRvgBg3D8A4NE/AOCNvwDA9r8AAB1AAIC8QADgVsAAgJm/AACNvwCA+T4AYCRAAOBBQADADcAA4CJAAOD1vwDAsUAAgMQ+AEC/vwBAF8AAANC+AIDYPwCAtMAAAMs9AGA0wACgPcAAwKw/AACFPwDgrT4AwMk/AMDTvwAgDcAAoJ3AAGBEQACgMT8AQGA+AICxPgDgBj4AQP89AEBpQADAskAA4F9AAEBEQAAAyz8AIDI+AACDvwDAwT8AwA0+AMByQAAgtj8AgIRAAGAuQACgsUAA4G6/AGDGvgAgsL8AwG2/AODTPwCgnkAA4Is/AKC0vwBgJz8AADa+AMBzPwDA078AAJ2/ACDcvwBgCMAAIOQ/AMDePwDg6b8AIH/AAEDGPwAABMAAYAXAAKAyQABgVEAA4CY/ACCkPwBgJcAAwKPAAMAmQACAGMAAQKU/AEDrvwBg1T4=\n"


def cosine_similarity(emb1, emb2):
    return (1 - np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))) / 2


array = np.frombuffer(base64.binascii.a2b_base64(emb1.encode("ascii")))
# array = array.reshape(
#     224,
# )
array2 = np.frombuffer(base64.binascii.a2b_base64(emb2.encode("ascii")))
# array2 = array2.reshape(
#     224,
# )
print(array)
print(array2)
print(str(cosine_similarity(array, array2)))
