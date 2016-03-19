# -*- coding: utf-8 -*-


def spindel(t, theta):
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
    kochzeiten = (5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 120)
    platos = (8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25)
    ausnutzungsgrad = (
        (5.4, 9.9, 13.5, 16.5, 20.9, 23.8, 25.8, 27.2, 28.1, 28.7, 29.3, 29.6)
        (5.2, 9.5, 13.0, 15.9, 20.1, 23.0, 24.9, 26.2, 27.0, 27.6, 28.3, 28.6)
        (5.0, 9.1, 12.5, 15.3, 19.4, 22.1, 24.0, 25.2, 26.1, 26.6, 27.2, 27.5)
        (4.8, 8.8, 12.1, 14.7, 18.7, 21.3, 23.1, 24.3, 25.1, 25.6, 26.2, 26.5)
        (4.7, 8.5, 11.6, 14.2, 18.0, 20.5, 22.3, 23.4, 24.2, 24.7, 25.3, 25.5)
        (4.5, 8.2, 11.2, 13.7, 17.3, 19.8, 21.4, 22.5, 23.3, 23.8, 24.3, 24.6)
        (4.3, 7.9, 10.8, 13.1, 16.7, 19.0, 20.6, 21.7, 22.4, 22.9, 23.4, 23.7)
        #nicht fertig, weiter machen bei 15°P
        )
    i = 0
    while kochdauer < kochzeiten[i]:
        i += 1
    kochdauer = kochzeiten[i]
    j = 0
    while ausschlagwuerze < platos[j]:
        j += 1
    ausschlagwuerze = platos[j]
    for x in ausnutzungsgrad:
        for y in ausnutzungsgrad:
            ausnutzung = y
    be = (hopfenmenge * alphasaeure * ausnutzung) / (10 * vol)
    be = round(be, 1)
    return be

w = mischungskreuz(9, 11, 10)
x = sudhausausbeute(11, 9, 1.55)
y = alkoholgehalt(13, 3)
z = ibu(10, 7.1, 60, 10, 10)

print(w, x, y)