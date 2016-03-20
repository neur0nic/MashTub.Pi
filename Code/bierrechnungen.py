# -*- coding: utf-8 -*-


def spindel(plato, theta):
    # geeichz auf 20°C
    pass


def mischungskreuz(vol_ist, stammw_ist, stammw_soll):
    vol_soll = (vol_ist * stammw_ist) / stammw_soll
    vol_soll = round(vol_soll, 1)
    return vol_soll


def sudhausausbeute(vol_ist, extrakt, schuettung):
    #gilt für 20°C
    ausbeute = (vol_ist * extrakt) / schuettung
    ausbeute = round(ausbeute, 1)
    return ausbeute


def alkoholgehalt(extrakt, restextrakt):
    alkohol = ((0.81 * (extrakt - restextrakt)) / 2.0665) / 0.789
    alkohol = round(alkohol, 1)
    return alkohol


def zucker(co2menge):
    pass


def ibu(hopfenmenge, alphasaeure, kochdauer, ausschlagwuerze, vol):
    kochzeiten = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120]
    platos = [
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
        ]
    ausnutzungsgrad = [
        [5.4, 9.9, 13.5, 16.5, 20.9, 23.8, 25.8, 27.2, 28.1, 28.7, 29.3, 29.6],
        [5.2, 9.5, 13.0, 15.9, 20.1, 23.0, 24.9, 26.2, 27.0, 27.6, 28.3, 28.6],
        [5.0, 9.1, 12.5, 15.3, 19.4, 22.1, 24.0, 25.2, 26.1, 26.6, 27.2, 27.5],
        [4.8, 8.8, 12.1, 14.7, 18.7, 21.3, 23.1, 24.3, 25.1, 25.6, 26.2, 26.5],
        [4.7, 8.5, 11.6, 14.2, 18.0, 20.5, 22.3, 23.4, 24.2, 24.7, 25.3, 25.5],
        [4.5, 8.2, 11.2, 13.7, 17.3, 19.8, 21.4, 22.5, 23.3, 23.8, 24.3, 24.6],
        [4.3, 7.9, 10.8, 13.1, 16.7, 19.0, 20.6, 21.7, 22.4, 22.9, 23.4, 23.7],
        [4.2, 7.6, 10.4, 12.6, 16.0, 18.3, 19.9, 20.9, 21.6, 22.0, 22.5, 22.8],
        [4.0, 7.3, 10.0, 12.2, 15.4, 17.6, 19.1, 20.1, 20.7, 21.2, 21.7, 21.9],
        [3.9, 7.0, 9.6, 11.7, 14.8, 17.0, 18.4, 19.3, 20.0, 20.4, 20.9, 21.1],
        [3.7, 6.7, 9.2, 11.2, 14.3, 16.3, 17.7, 18.6, 19.2, 19.6, 20.1, 20.3],
        [3.6, 6.5, 8.9, 10.8, 13.7, 15.7, 17.0, 17.9, 18.4, 18.8, 19.3, 19.5],
        [3.4, 6.2, 8.5, 10.4, 13.2, 15.1, 16.3, 17.2, 17.7, 18.1, 18.5, 18.7],
        [3.3, 6.0, 8.2, 10.0, 12.7, 14.5, 15.7, 16.5, 17.0, 17.4, 17.8, 18.0],
        [3.2, 5.7, 7.9, 9.6, 12.2, 13.9, 15.1, 15.8, 16.4, 16.7, 17.1, 17.3],
        [3.0, 5.5, 7.5, 9.2, 11.7, 13.3, 14.5, 15.2, 15.7, 16.0, 16.4, 16.6],
        [2.9, 5.3, 7.2, 8.8, 11.2, 12.8, 13.9, 14.6, 15.1, 15.4, 15.8, 15.9],
        [2.8, 5.1, 6.9, 8.5, 10.8, 12.3, 13.3, 14.0, 14.5, 14.8, 15.1, 15.3]
        ]
    i = 0
    while kochdauer > kochzeiten[i]:
        i += 1
    kochdauer = kochzeiten[i]
    #print(kochdauer)
    j = 0
    while ausschlagwuerze > platos[j]:
        j += 1
    ausschlagwuerze = platos[j]
    #print(ausschlagwuerze)
    ausnutzung = ausnutzungsgrad[j][i]
    be = (hopfenmenge * alphasaeure * ausnutzung) / (10 * vol)
    be = round(be, 1)
    return be

w = 'Volumen der Anstellwürze: ' + str(mischungskreuz(9, 11, 10)) + ' l\n'
x = 'Sudhausausbeute: ' + str(sudhausausbeute(11, 9, 1.55)) + ' %\n'
y = 'Alkoholgehalt: ' + str(alkoholgehalt(13, 3)) + ' %Vol\n'
z = 'Bitter: ' + str(ibu(20, 7.1, 51, 9.5, 10)) + ' IBU'

print('---\n', w, x, y, z)