import numpy as np
import base64

emb1 = "AMAhwACAw70A4AvAAMCjvwDA9D8AgJO/AADevwDAW8AAwK4+AGCfPwBgyLwAICdAAKDLPwCAkcAAwAtAAMA+wACAbz4AAAdAAMDJPwBgPUAAgFpAAKCMvgAAaDoA4Im/AKDyPgCgyz8A4J/AAKBxPwDAD0AAgF6/ACDevQDgMcAAoFhAAAAXvwBg0z8AYBG/AECKvwDALMAA4LE/AEBAPgDgC0AAYPS/AACBPwDgrLwAgKZAAOAXwADgvj8AwMk/AOAOQABAjD4AoGQ/AODXPwAgkz4AQFvAAEA6QACgTsAAIGs/AEAHvwCAUr4AoIo+AEBSwABgBsAAQNS/AADXPwAgl78A4Ms/AMDCPwBgxj8AwHC/ACArwADgE0AAoLK/AGDCPgDAgz8AIChAAMB1PgCA4T8AwCu/AKAZwADgwj4AAMu/AADAvgBgK0AAIAtAACDOPwCA6z8AwGA/AICQPwBgAEAAgOu/ACC6vwCA5b4AAF1AAOB1PgBgoMAA4Og/AABlPwDAwj8AwJg8AKBVQABAj0AAAJZAAMD1vwBAHkAAoI8+AKB+PgAgocAAwEbAAABivwAgjz4AYIa+AKCKQAAgLUAAQM8/AKDGvgCgWMAAgCTAAAC3vwCgo78AYKy/AAD7vwCgyL0AoChAAOD4vwCA0b8AAAJAAMB+QADgsr8AINw+AODUvwCgL0AAwK8+AKCbvwCAzb8A4FE/AECKQAAAhMAAILy/AMCCvgBAjr8AwA1AACB+PwCACr8AAJ6/AAA8wABAib8A4KO/AACRwACAoDwAQLO/ACBWPwDAkMAAAHo/AGClvwBAjb8AAOU9AEDlPwCANz0AoAHAAKCtPwCgx78AIDc+AKArPwBAkz8AgP8/AKCAwADggcAA4DM/AKCEQABAjT8AoH/AACCovwAAxD8AIDo/AKAqwAAA6j8AwLNAAMBxvwCAvL8AoBtAAOCYwADgtj8AwKW9AAAjQACgdb8AwKC/AKD2PwBgHEAAIPq9AABEQAAAor8AIKA/AEADwADA5L8AIHlAAOAovwBgiz8AYP8/AOCYPgDAJUAA4APAAMCpvwCgxUAAYHA/AACQQABA678A4D0/AMBmvwCgT0AAwI8+AKD7PwBA7T8AwDC+ACBzQADgmD8AoOY/AKAUwAAARMAAIEY/ACALQABgwz8AoKo+AGBRQACgnMA=\n"

emb2 = "AMDdvQDgVL8AAGnAAMCGPwCAEj8AAGbAAEDVvgBgoT4AAO47AMBTQAAAdb8AILJAAGCsPwDAIsAAIBJAAKApwAAAwz4AwJc/AIBGPwCAWEAAAGBAACCMvwAAnTsAIIHAAEBMvwDgoj4AoNHAAKCNvwDAsUAA4E/AAMCiPwAAmT8AgGdAAEASwACgEL8AABNAAAD2vgBAzr4AAPk+ACC7PwDgdD8AgO6/AICpvwDAGT8A4HpAAACEvwDAMr4AAIk+AGB7QADAO0AAAM0/AAAWQABgQL8AoIvAAIAHQAAgtL8AYL8+ACAPvgDAgr8AoChAAKATwABgJkAAQLY/AKACQACAqb4AYIs/AKCKvwAA/D8AgAjAAKAEvgCA4D8AgEo9AMD3vwAg+j0AYAzAAMCKvwDgnj4AwCA/ACDHvwAAED8AABE/ACDWvwCgTkAAoKw+AACOvgCgh0AAoHy/AICIPwCAJr8AgIE/AIAewADgEMAAgKw/AODrPwDAtsAAgKs/AKA5QADAiz0AgERAACBaQADg+j8AAGk+AOApvwCgT0AA4Es/AEBFPwDAiMAAYB3AACD3PgDAsz8AYIi+AIAOvwAgY0AAwKM/AECcPwCgl74AoI3AAMAVwACAFz4AABm+AOAJwADgqr8AoDxAAAABwABAQMAAoD6/AKDvPgBAt78AgCy/AEAMPwDABUAAAJw/AADYvwBAn78AwNW/ACCfQAAAk8AAgBQ/AMCnPwBgkz4AwLS+AKCQPwBAqD4AAATAAIAbvwCgCMAAYDe/ACDAwAAAOUAAIAlAAGBAPgCAhsAAAJo/AMD8vwCAAMAAgAs/AAAZvQBgxD8AIJy/AMApvwAgZ8AAwOi9AMDIPwDg+z8AYE5AAKCOwABg674AoCA/ACBRPwCAg70AYIvAACA9PgDgHr8AoJO/AEDHvwAAmEAAAKFAAOCJPQCgBz4AIJE+AKAwwABAGUAAABdAAKCdPwAAo78AwDg/AKDrPwCASUAAAMk+AMAtQABAlT0A4Cs9AOCevwBgn78AAMNAACBUPwAANEAA4FFAAACnvwDAxz8AAFm/AOBZwADgZ0AA4EY/ACCqPwBAcT8AAMQ+AEACwABAYD8AwA7AAOCjQADgJkAAwEs/AMCMQAAgSkAAIIC/AOA7wADAOEAAYMM/AMAOQAAgkr8AgAU/AEAzvwDgScA=\n"

emb3 = "MKcuQQERXcEWJhbAJ9oBwczDYMCZUZtAkueJwNpi6UC2uYJAhQ9vPnyaXEDuDI1A0ooyQVLPGsF1ZdZAtcWWwPC/AkCCNh1Aof4YQSz0YUFXQbK/PZ4eQdVjokCbtYrBf/cNweqiPkCVy5JARm8LP/b/XkEXgrbBXvxrwXtoJUEYNZfB+p+mP6hg+r4pnCBAkPJXvx/VaMEuffBA3unPwKaaJUBSMibBHVwWQdT4UsBJIxlBGi1oQZAHoUByCT3BNftSQe765z4GFAo+UE4zwc53vsDf+gJBdPiLP35XC0GHR9xA+3PNwCakDcEAVQPB746HwVLMk8HqLlBAi9AbQZa5LUC9oaPAybsbQA88CMDRPY5AAf2uQIr7CUHWZKJAb3JdwSBtxr9Z6rvBbGW3wCcn7UAKNtzBH5+dwMmK20C7q7hB9SxVwJz6n7+ov5k/PapGQOyV4j+b8//AfKrjwHQcir1gRQ3CAGsXwVhqcUBdVh/A4R0NwWiV0MCymrq/HOOtwLFyDEHiPYVBNqRfvlOBjsCac95Aiglzwdxq28D8zbq/YreMP4LgFUHSLkO+WcPSPgZhDUDNeYzBpTFKwSGSPsB/oxZBPP5/wS4ZEEHSefLAtSxyP523JsFEN57ADgAuQbPTGkBYdBFAN8wywEx4Rz8QBkFB8n7jv8bpD0B/3GRA5JO7wfbdXsFarjtBIzAMQb1P40AjZ88/xAR/PUgoBz6Ecqc/wE0AwU4lzT/XpAPBXDv2QLR78z+Cs7G+brE7P5tP7b/r7g5BA68mQfdzY0FXFqnBgI6Bwf9V3sBBOBPBoWsLwAqZs8Ap4TFBQ02LQIp84cDIQOQ+KiePwB6e5j+AbNjAwCCSQWk7G0HnR+lAPh0Zv41Ii0GqwoZAoeqlwDPVGUG2PPY/4vwqv8FKD8HG4pfBvCiMQfFBrkD9Vr0/am7EQAH1MsDjp6zAxp4RvwcdsEET+5e/pQKFwaqyl8B11Y6+uHI5P2K4kkBr1PHA+/IZwTNeCkHmlvC/5ADnvyDRikH3AVlBIPI7wbw8iUFJzyhBWTZ4wXBAk0CR/I4/whZVQL6dWkFrLvc/Gzr6P7MgVsAGiC5Bz6H6QG2BakCFxdZAEW1NQNKzYUCP2LbA9bkBPm+RJ8HhFzrB5IHXwPv3YkC4q5/BTKMeQYuNV8FoFKVB6ST7PzjlSEE=\n"

emb4 = "LmkWQWPqg0HAvCVBWr6VwfrArEFUosLA24u7QLRqNT5zppbBSPgwwDMrf8GZJR1AOUTSwBEi2cB3RA5BuZ1lwEpcUsDLoZXApUQLwJBARz4o6wlB8/JRvxd/bkFobivBI53NP/mmjUEK5v7A4DTVvQr4wMBGrvTBZNRLwUW/TkCs3bc/QTghwTKKDEF09qY/VYgSQfImpr/ndmnB08UzwAzWaEGArmvBFtqwwFT5WMC1kCZBVnFFQTjte0HBkRvBhGJ9QSBror42hfZAR+KHweKfxECbDH7AiKn6v48WIUHFXM6/lQ+KwcCok8EXETDBVoXgwQPlNMG5wwzBwRYvQQZX1j9RgibBK3WXwBArkj8AUMbA2o4nQUzqdkGPfKNBvQWzwYUqtsBJMJTBnI20wLVSJUHLFfHAz5mDwQFNtUCuZHdBu/b4wVbG8j/+bQ3BivmFQagKy8C1tmnBYFQsPfRQUkDQjnXBTuhmv4zcj0AzxkBAskLqQHhizj2UMnZAwe4qP8Q3xcBHVg3AhKkIQeer/0BBXh/BJcYvQRi/oEBS+RdA9KiDQfCFs8BgmixA3Z9CQYxMHUG8Bw/B1oxUwGfxbcEnQK1ASiejP+5UeUEZ+Q7BHWlSP6qk38DO7aXAzoMFQWoYEz80O7FBpEiVQRWDRUDrEaJAzGuBQBFE0cD7YbxA5tkqwgFe/MAMiWI/k7BPQPBng0HTAL/AAGHhvmPlq0BGbGI/M2AdwVx9rsBJZdXAIvpKQPq+hL1uMVrAimRYwdGjlr5PoMhA8XbMQO/FJ0EP69rBj1d1wQRkyMB2aIvBmGMrQbqsr0D75qpBz15CP/iNC8DwoSLAfPnEwNtvi0B/gJVBGgRpQbwNlr/GHaPAYo4MQZ7o1EBCJjbBPOEpQKzagsCyJVlByESKv2UXvsBaaTpAPQ9nwLkjC0FVMevA0A4zQc4YO8EsVBLA+mSowGSfnEET+fvAReOJwREbOEHcjPTAcBGPQHjZREA9SoDBlOc5P6npbEEs8WNBZOcywYMSP0G7jwlBbhoiwd928L8+bYPA/FTkviLG9UB2XtQ/ty5OwfkThkHkZxrBPr9uQToITsERxqtBZy25Pyc+TcCT4A/B3G/MwIMa2sDi2ZrA2luNwYKppT9AZyXBRFTIwJpW+T8PXzLAWGg/QFAHcUA8Fp5AXNecQUsNFUE=\n"


def cosine_similarity(emb1, emb2):
    return (1 - np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))) / 2


array = np.frombuffer(base64.binascii.a2b_base64(emb3.encode("ascii")))
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
