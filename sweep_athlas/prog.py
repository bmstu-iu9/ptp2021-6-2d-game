from PIL import Image

def deploy(athlas, config):
    mas = []
    with open(config, "r") as f:
        for line in f:
            l = line[line.find('=', 0, len(line))+2:]
            t = ''
            for i in l:
                #print(l)
                if i == ' ':
                    mas.append(int(t))
                    t = ''
                else:
                    t = t + i
            mas.append((int(t)))
            t = ''
    size1 = mas[0]
    size2 = mas[1]
    frames = mas[2]
    i = 3
    img = Image.open(athlas)
    while i < len(mas):
        crop_img = img.crop((mas[i], mas[i+1], mas[i]+size1 , mas[i+1]+size2))
        i = i + 2
    return athlas + config
