from PIL import Image
import os
import sys

def deploy(athlas, config, path):
    mas = []
    l1 = []
    l2 = []
    
    with open(config, "r") as f:
        for line in f:
            if line.find("anim", 0, len(line)) > -1:
                l = line[line.find(' ', 0, len(line))+1:]
                l1.append(l[:l.find('_', 0, len(l))])
                l2.append(l[l.find('_', 0, len(l))+1: l.find(' ', 0, len(l))])
            l = line[line.find('=', 0, len(line))+2:]
            t = ''
            for i in l:
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
    crop_img = []
    j = 0
    str2 = '.png'
    maindir = os.getcwd()
    
    S = "\\"
    p = 0
    if not os.path.isdir(path):
        os.mkdir(path)
    os.chdir(path)
    while i < len(mas):
        k = 0
        while k < frames:
            crop_img.append(img.crop((mas[i]+k*size1, mas[i+1], mas[i]+size1*(k+1) , mas[i+1]+size2)))
            k = k + 1
            crop_img[j].save(l1[p] + '_' + l2[p] +(str(j)) + str2)
            j = j+1
        p = p+1
        j = 0
        i = i + 2
    i = 0
    k = 0
    return athlas + config

if len(sys.argv) < 3:
    deploy('athlas.png', 'config.txt', os.getcwd())
else:
    deploy(sys.argv[1], sys.argv[2], sys.argv[3])
