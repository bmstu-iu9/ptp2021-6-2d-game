from PIL import Image
import os

def deploy(athlas, config):
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
    str1 = 'aaa'
    str2 = '.png'
    maindir = os.getcwd()
    S = "\\"
    while i < len(mas):
        k = 0
        while k < frames:
            crop_img.append(img.crop((mas[i]+k*size1, mas[i+1], mas[i]+size1*(k+1) , mas[i+1]+size2)))
            k = k + 1
            crop_img[j].save(str1 + (str(j)) + str2)
            j = j+1
        i = i + 2
    i = 0
    print(l1)
    print(l2)
    k = 0
    while i < len(l1):
        if not os.path.isdir(l1[i]):
            os.mkdir(l1[i])
            os.chdir(l1[i])
            os.mkdir(l2[i])
            os.chdir("..")
        else:
            os.chdir(l1[i])
            os.mkdir(l2[i])
            os.chdir("..")
        j = 0
        while j < frames:
            os.replace(str1 + (str(k)) + str2, l1[i] + S + l2[i] + S + str1 + (str(k)) + str2)
            j = j + 1
            k = k + 1
        i = i+1
    print(maindir + '/' + l1[0] + '/' + l2[0])
    return athlas + config
