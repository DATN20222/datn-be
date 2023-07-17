import numpy as np
import base64

emb1 = "AMAhwACAw70A4AvAAMCjvwDA9D8AgJO/AADevwDAW8AAwK4+AGCfPwBgyLwAICdAAKDLPwCAkcAAwAtAAMA+wACAbz4AAAdAAMDJPwBgPUAAgFpAAKCMvgAAaDoA4Im/AKDyPgCgyz8A4J/AAKBxPwDAD0AAgF6/ACDevQDgMcAAoFhAAAAXvwBg0z8AYBG/AECKvwDALMAA4LE/AEBAPgDgC0AAYPS/AACBPwDgrLwAgKZAAOAXwADgvj8AwMk/AOAOQABAjD4AoGQ/AODXPwAgkz4AQFvAAEA6QACgTsAAIGs/AEAHvwCAUr4AoIo+AEBSwABgBsAAQNS/AADXPwAgl78A4Ms/AMDCPwBgxj8AwHC/ACArwADgE0AAoLK/AGDCPgDAgz8AIChAAMB1PgCA4T8AwCu/AKAZwADgwj4AAMu/AADAvgBgK0AAIAtAACDOPwCA6z8AwGA/AICQPwBgAEAAgOu/ACC6vwCA5b4AAF1AAOB1PgBgoMAA4Og/AABlPwDAwj8AwJg8AKBVQABAj0AAAJZAAMD1vwBAHkAAoI8+AKB+PgAgocAAwEbAAABivwAgjz4AYIa+AKCKQAAgLUAAQM8/AKDGvgCgWMAAgCTAAAC3vwCgo78AYKy/AAD7vwCgyL0AoChAAOD4vwCA0b8AAAJAAMB+QADgsr8AINw+AODUvwCgL0AAwK8+AKCbvwCAzb8A4FE/AECKQAAAhMAAILy/AMCCvgBAjr8AwA1AACB+PwCACr8AAJ6/AAA8wABAib8A4KO/AACRwACAoDwAQLO/ACBWPwDAkMAAAHo/AGClvwBAjb8AAOU9AEDlPwCANz0AoAHAAKCtPwCgx78AIDc+AKArPwBAkz8AgP8/AKCAwADggcAA4DM/AKCEQABAjT8AoH/AACCovwAAxD8AIDo/AKAqwAAA6j8AwLNAAMBxvwCAvL8AoBtAAOCYwADgtj8AwKW9AAAjQACgdb8AwKC/AKD2PwBgHEAAIPq9AABEQAAAor8AIKA/AEADwADA5L8AIHlAAOAovwBgiz8AYP8/AOCYPgDAJUAA4APAAMCpvwCgxUAAYHA/AACQQABA678A4D0/AMBmvwCgT0AAwI8+AKD7PwBA7T8AwDC+ACBzQADgmD8AoOY/AKAUwAAARMAAIEY/ACALQABgwz8AoKo+AGBRQACgnMA=\n"

emb2 = "AMDdvQDgVL8AAGnAAMCGPwCAEj8AAGbAAEDVvgBgoT4AAO47AMBTQAAAdb8AILJAAGCsPwDAIsAAIBJAAKApwAAAwz4AwJc/AIBGPwCAWEAAAGBAACCMvwAAnTsAIIHAAEBMvwDgoj4AoNHAAKCNvwDAsUAA4E/AAMCiPwAAmT8AgGdAAEASwACgEL8AABNAAAD2vgBAzr4AAPk+ACC7PwDgdD8AgO6/AICpvwDAGT8A4HpAAACEvwDAMr4AAIk+AGB7QADAO0AAAM0/AAAWQABgQL8AoIvAAIAHQAAgtL8AYL8+ACAPvgDAgr8AoChAAKATwABgJkAAQLY/AKACQACAqb4AYIs/AKCKvwAA/D8AgAjAAKAEvgCA4D8AgEo9AMD3vwAg+j0AYAzAAMCKvwDgnj4AwCA/ACDHvwAAED8AABE/ACDWvwCgTkAAoKw+AACOvgCgh0AAoHy/AICIPwCAJr8AgIE/AIAewADgEMAAgKw/AODrPwDAtsAAgKs/AKA5QADAiz0AgERAACBaQADg+j8AAGk+AOApvwCgT0AA4Es/AEBFPwDAiMAAYB3AACD3PgDAsz8AYIi+AIAOvwAgY0AAwKM/AECcPwCgl74AoI3AAMAVwACAFz4AABm+AOAJwADgqr8AoDxAAAABwABAQMAAoD6/AKDvPgBAt78AgCy/AEAMPwDABUAAAJw/AADYvwBAn78AwNW/ACCfQAAAk8AAgBQ/AMCnPwBgkz4AwLS+AKCQPwBAqD4AAATAAIAbvwCgCMAAYDe/ACDAwAAAOUAAIAlAAGBAPgCAhsAAAJo/AMD8vwCAAMAAgAs/AAAZvQBgxD8AIJy/AMApvwAgZ8AAwOi9AMDIPwDg+z8AYE5AAKCOwABg674AoCA/ACBRPwCAg70AYIvAACA9PgDgHr8AoJO/AEDHvwAAmEAAAKFAAOCJPQCgBz4AIJE+AKAwwABAGUAAABdAAKCdPwAAo78AwDg/AKDrPwCASUAAAMk+AMAtQABAlT0A4Cs9AOCevwBgn78AAMNAACBUPwAANEAA4FFAAACnvwDAxz8AAFm/AOBZwADgZ0AA4EY/ACCqPwBAcT8AAMQ+AEACwABAYD8AwA7AAOCjQADgJkAAwEs/AMCMQAAgSkAAIIC/AOA7wADAOEAAYMM/AMAOQAAgkr8AgAU/AEAzvwDgScA=\n"

emb3 = "ACBDPgCgmr8AAA7AAIB0uwBgwj0AAGLAAAAnwACg1T4AII6/AAB2PQCgc8AA4IFAAKDsPwAggsAA4O8/ACB3wAAA3j4AABtAAKCuPwBAZkAAoIdAAOBVPwDgYr8AABzAAGCmvgDgxr8AYKLAAGAHPwDAvj8AwITAAECIPwDgDj8A4D4/AADAPwAAdT8AgDG/AIC2vwDgG78AQG9AAOCfPwAgYT8A4MC/ACDlPgDgWD8AoFtAAODXPwBgIkAAgGK/AIB+QABAyz8AIMM9AECHQAAghL4AwAI/ACCWQABAqL8AoOM/AKCAPwBAF74AoEk/AIBfwACgBUAAQN6/ACCIQABg3L8AAFy/ACBRwABA2j8AICG/ACBsvwDApT8A4JC/AEB7vwDAWsAAoIs+AABnvwBAZb8AQMs/AEB0wABANT8A4IbAAABVQABgAb8AAAtAAICFvgBgjEAAABTAAMBQPwCAAsAAAP6/AEA1wAAgkD0AIO8/AEB/QAAAgMAA4EC/ACAUQACgFr8AwFM/AEDbPwCACEAAoLFAAID7PwCgCz8AQBhAAAA5QACAkMAA4HDAAAAoPwAgk0AAAE+/AADYvQCg5T8AALY/AIB/PwCAUsAAwGDAACBfwADArb4A4Pe/AOAvwABAYcAAYHpAAAAJwADA1b8AgEa+AID6PwBALL8AwCrAAMBGvgAAN0AAALC/AMCKvQDgtD4AQIw/AODnQADAQMAAQDC/AEAWwABgTb4AQMc/AOAdvwCgGMAAoF0/AGDYvwAgWMAAwJw+AIDfwACAEL4AYCRAAMCQPgDAi8AAAJk/AAArwADAQsAAQN0/AEAOPgDAv78AAB6/AMDevwCAJsAA4Ks/AKAmQAAAcT8AADRAAMAzwAAgPMAAoOm+AIDePwCgDD8AIDXAAKBFPwDgm78A4AHAACCoPwCArkAA4NxAAIAwvwAgi74AQAhAAOAfwADA0D8AgFA/AGBUPwCAgMAAAIpAAMBZQAAAekAAIE7AAAABQAAgBEAA4NK/AAA4vwDAEsAAYKxAAGASvwAgBr4AIBpAAODMvwAABUAAYB/AAGDcwACAiEAAYIBAAIDtPgDggj4AoEQ/AOBDwACgsT8AQP0+AIAkPgDAyj8AINA+AGDYQADgXkAAgB9AAOA2vwCgDj8AgPA/ACBVPwCAwr8AAHLAAEAIvwDAtsA=\n"

emb4 = "AOCXvwAgNz8AoFDAACAuvwBgQj8AAIzAAICIvgBAcsAAIBjAAGACQAAAyr8AoDE/AICYQACg778AoO8/AIBFwADA874A4ARAACCLQADAzT8AwNI+AGA+vgDAiD4AoNS/AMDtPwCgt78AoDHAAECxvgCgIT8AYI7AAEDiPwAAcb0AQLs+AAARwADA+74AAPe+AGCqvwAg8r0AYClAAMAIQACguj4AwPy+AOA8vwDAjUAAAJFAAOBEPwBgmL4AAMy9ACCzPwBgDD8AoMQ/AEAzPwBgIz8A4Mi/ACAnQAAAXL8A4JI/AMDzPwAAOsAAgLI9ACA3wABAr74AQA+/AGAgPwCgYsAAwMk/AICYPwDgC78AQJS+AOB2PwAAhkAAwB3AAGCqPgCALr8AYLE/AMAUPwCAV0AA4ExAAIDkwAAAD78AQFTAAMDCvwAgwz8AoKG/AAC4vgBAgL8AgALAAGDVPgCgA70AgCg/AICcvwDAYD8AwOk/AOCZPwDgl8AA4K8+AEAfQAAAMMAAQOo9AGBdQABAUkAAoCBAAMC1vgDAwT8AgOI/AECUvgBggMAAIFLAAIDVPwDALUAAgMS/AAAvOwBgLkAAoDtAAIBBvwBgz78AQG7AAKB1PwCAJb4AgLe/ACDuvwBATMAAAP4/AIC4vwCgajwAoEG/AICYPQDADr8AoAa+AMBCvgBAm0AAwLW/AMAnvwDgnL8AAOi9AACYQACAccAA4M6/AEDsvgDgvz8A4HRAAOCTvwBgLMAAgJ8/AGBOwAAArz8AQLY/AEC7wACAjD4AYJm/AGB/vwAgBsAAYCxAAKCGvwCA0r8AgOo+AIBhPwBgZj8AgD+/AMD9PQDgBsAAoFo/AAAOQAAA074AAGhAAEBmwABgXsAAwBDAAMAYQABgnL8AICrAAGCjPwDgtz8AoAM/AIB2PwAgPkAAwPtAAEAZwAAAOMAAgKQ/AEB4wABAT0AAACNAACCMPwBg4r8AgAJAAKAbPwCAxz8AYNq/AOAUvgAgWb8AoFBAAAAIwACAN78A4I1AAGD1PQCgGj8AoAZAAGAePwDgNEAAQC3AAIBswABAmkAAgLQ/AKBCQABAK8AAICXAAEBVwABgCEAA4IE/AEAHPwCgS0AAwDK/AOCvPwDA4T8AQAFAAACCwACgwT4AQIM/AKBHQACAs0AAAPk/AMCUPwAAwcA=\n"


def cosine_similarity(emb1, emb2):
    return (1 - np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))) / 2


array = np.frombuffer(base64.binascii.a2b_base64(emb1.encode("ascii")))
# array = array.reshape(
#     224,
# )
array2 = np.frombuffer(base64.binascii.a2b_base64(emb4.encode("ascii")))
# array2 = array2.reshape(
#     224,
# )
print(array)
print(array2)
print(str(cosine_similarity(array, array2)))
