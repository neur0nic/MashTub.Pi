# -*- coding: utf-8 -*-


def spindel(plato, theta):
    """
    Correction of the hydrometer calibrated to 20°C to the temperature during measurement.

    :param plato:   measured density of wort in °P; float
    :param theta:   measured temperature of wort in °C; int
    :return:        calculated 'real' value for the density of the wort in °P; float
    """
    theta = int(theta)
    temperaturen = list(range(5, 100, 5))
    stammw = list(range(0, 30))
    table = [
        [-0.48, -0.38, -0.23, 0, 0.29, 0.66, 1.09, 1.56, 2.09, 2.67, 3.29,
        3.94, 4.63, 5.36, 6.12, 6.91, 7.74, 8.59, 9.46],
        [0.51, 0.6, 0.77, 1, 1.3, 1.67, 2.09, 2.56, 3.09, 3.68, 4.29, 4.94,
        5.63, 6.35, 7.11, 7.89, 8.72, 9.56, 10.43],
        [1.49, 1.59, 1.76, 2, 2.3, 2.67, 3.09, 3.56, 4.1, 4.68, 5.29, 5.94,
        6.62, 7.34, 8.1, 8.88, 9.7, 10.54, 11.41],
        [2.48, 2.58, 2.76, 3, 3.31, 3.68, 4.09, 4.56, 5.1, 5.68, 6.29, 6.93,
        7.62, 8.34, 9.09, 9.87, 10.68, 11.52, 12.38],
        [3.46, 3.57, 3.75, 4, 4.31, 4.68, 5.09, 5.56, 6.1, 6.69, 7.29, 7.93,
        8.61, 9.33, 10.08, 10.86, 11.67, 12.5, 13.36],
        [4.43, 4.56, 4.75, 5, 5.31, 5.68, 6.09, 6.57, 7.1, 7.69, 8.29, 8.93,
        9.61, 10.33, 11.07, 11.85, 12.66, 13.48, 14.34],
        [5.41, 5.54, 5.74, 6, 6.31, 6.68, 7.1, 7.57, 8.11, 8.69, 9.29, 9.93,
        10.61, 11.32, 12.07, 12.85, 13.64, 14.46, 15.31],
        [6.38, 6.53, 6.74, 7, 7.31, 7.68, 8.1, 8.57, 9.11, 9.69, 10.29, 10.93,
        11.61, 12.32, 13.06, 13.84, 14.63, 15.45, 16.29],
        [7.35, 7.52, 7.73, 8, 8.31, 8.68, 9.1, 9.58, 10.11, 10.69, 11.29,
        11.94, 12.62, 13.32, 14.06, 14.83, 15.61, 16.42, 17.26],
        [8.33, 8.51, 8.73, 9, 9.31, 9.68, 10.11, 10.59, 11.12, 11.69, 12.3,
        12.95, 13.62, 14.32, 15.05, 15.82, 16.6, 17.4, 18.23],
        [9.3, 9.5, 9.73, 10, 10.32, 10.68, 11.11, 11.6, 12.12, 12.69, 13.3,
        13.96, 14.62, 15.31, 16.04, 16.8, 17.58, 18.38, 19.21],
        [10.28, 10.49, 10.73, 11, 11.32, 11.69, 12.12, 12.6, 13.13, 13.69,
        14.31, 14.96, 15.62, 16.31, 17.03, 17.78, 18.55, 19.35, 20.17],
        [11.27, 11.48, 11.72, 12, 12.32, 12.69, 13.13, 13.61, 14.13, 14.69,
        15.31, 15.96, 16.62, 17.3, 18.02, 18.76, 19.53, 20.33, 21.14],
        [12.26, 12.48, 12.72, 13, 13.32, 13.7, 14.13, 14.62, 15.13, 15.69,
        16.31, 16.96, 17.61, 18.29, 19.01, 19.74, 20.51, 21.3, 22.1],
        [13.25, 13.47, 13.72, 14, 14.33, 14.7, 15.14, 15.62, 16.14, 16.69,
        17.31, 17.96, 18.61, 19.29, 19.99, 20.73, 21.49, 22.27, 23.06],
        [14.25, 14.47, 14.72, 15, 15.33, 15.71, 16.14, 16.62, 17.14, 17.7,
        18.31, 18.96, 19.61, 20.28, 20.99, 21.72, 22.47, 23.24, 24.02],
        [15.25, 15.46, 15.71, 16, 16.33, 16.71, 17.15, 17.63, 18.15, 18.71,
        19.32, 19.96, 20.61, 21.28, 21.98, 22.71, 23.46, 24.22, 24.99],
        [16.25, 16.46, 16.71, 17, 17.34, 17.72, 18.16, 18.64, 19.15, 19.72,
        20.33, 20.96, 21.61, 22.28, 22.98, 23.7, 24.44, 25.19, 25.96],
        [17.25, 17.46, 17.71, 18, 18.34, 18.73, 19.17, 19.65, 20.16, 20.73,
        21.33, 21.97, 22.61, 23.28, 23.97, 24.7, 25.43, 26.17, 26.94],
        [18.24, 18.45, 18.7, 19, 19.35, 19.74, 20.18, 20.66, 21.18, 21.74,
        22.34, 22.97, 23.61, 24.27, 24.97, 25.68, 26.41, 27.15, 27.91],
        [19.24, 19.44, 19.7, 20, 20.35, 20.75, 21.19, 21.67, 22.19, 22.75,
        23.35, 23.97, 24.61, 25.27, 25.96, 26.67, 27.39, 28.13, 28.89],
        [20.22, 20.43, 20.69, 21, 21.36, 21.76, 22.2, 22.68, 23.2, 23.75,
        24.35, 24.96, 25.6, 26.25, 26.94, 27.64, 28.36, 29.1, 29.86],
        [21.2, 21.42, 21.68, 22, 22.36, 22.76, 23.2, 23.68, 24.2, 24.76,
        25.34, 25.95, 26.58, 27.24, 27.92, 28.62, 29.33, 30.07, 30.83],
        [22.17, 22.4, 22.68, 23, 23.36, 23.76, 24.21, 24.69, 25.21, 25.75,
        26.33, 26.94, 27.57, 28.22, 28.9, 29.59, 30.3, 31.04, 31.8],
        [23.14, 23.39, 23.67, 24, 24.36, 24.76, 25.21, 25.69, 26.2, 26.75,
        27.33, 27.93, 28.56, 29.21, 29.88, 30.57, 31.28, 32.02, 32.77],
        [24.12, 24.38, 24.67, 25, 25.36, 25.77, 26.21, 26.69, 27.2, 27.74,
        28.32, 28.92, 29.55, 30.19, 30.86, 31.55, 32.26, 32.99, 33.74],
        [25.1, 25.37, 25.67, 26, 26.37, 26.77, 27.22, 27.69, 28.2, 28.74,
        29.32, 29.92, 30.54, 31.19, 31.85, 32.54, 33.25, 33.97, 34.72],
        [26.1, 26.37, 26.67, 27, 27.37, 27.78, 28.22, 28.7, 29.2, 29.74,
        30.32, 30.92, 31.54, 32.18, 32.84, 33.53, 34.23, 34.96, 35.7],
        [27.1, 27.36, 27.66, 28, 28.38, 28.79, 29.23, 29.7, 30.21, 30.75,
        31.32, 31.93, 32.54, 33.18, 33.84, 34.52, 35.22, 35.94, 36.68],
        [28.1, 28.36, 28.66, 29, 29.38, 29.79, 30.24, 30.71, 31.21, 31.76,
        32.33, 32.93, 33.54, 34.17, 34.83, 35.51, 36.2, 36.92, 37.65]
        ]
    i, j = 0, 0
    while theta > temperaturen[i]: i += 1
    while plato > stammw[j]: j += 1
    plato_echt = table[j][i]
    plato_echt = round(plato_echt, 1)
    return plato_echt


def mischungskreuz(vol_ist, stammw_ist, stammw_soll):
    """
    Calculates the amount of water that needs to be added if the density of the wort is too
    high to get gt the wanted density.

    :param vol_ist:     current volume of the wort in liter; float
    :param stammw_ist:  current density of the wort in °P; float
    :param stammw_soll: wanted density of the wirt in °P; float
    :return:            the volume after thining down the wort with water; float
    """
    vol_soll = (vol_ist * stammw_ist) / stammw_soll
    vol_soll = round(vol_soll, 1)
    return vol_soll


def sudhausausbeute(vol_ist, extrakt, schuettung):
    """
    The sudhausausbeute is a value of efficiency to show how much starch of the malt was
    converted to dissolvable sugar in the wort.

    :param vol_ist:     final volume of the wort in liter at 20°C; float
    :param extrakt:     final density of the wort in °P at 20°C; float
    :param schuettung:  amount of malt used in kg; float
    :return:            the efficiency of the brewing process in %; float
    """
    ausbeute = (vol_ist * extrakt) / schuettung
    ausbeute = round(ausbeute, 1)
    return ausbeute


def stammw(schuettung, vol, gesch_sudhausausbeute = 60):
    """
    Estimates the density of the wort, to help writing the recipe.

    :param schuettung:              amount of malt in kg; float
    :param vol:                     wanted amount of wort in liter; float
    :param gesch_sudhausausbeute:   estimated efficiency of the brewing process in %; float
    :return:                        density of the wort in °P; float
    """
    extrakt = (gesch_sudhausausbeute * schuettung) / vol
    return extrakt


def alkoholgehalt(extrakt, restextrakt):
    """
    Estimates the amount of alcohol in the finished beer.

    :param extrakt:         density of word before fermentation in °P; float
    :param restextrakt:     density of the finished beer in °P; float
                                (normally in description of the yeast)
    :return:                amount of alcohol in %Vol; float
    """
    alkohol = ((0.81 * (extrakt - restextrakt)) / 2.0665) / 0.789
    alkohol = round(alkohol, 1)
    return alkohol


def zucker(co2menge = 5):
    """
    Estimates the needed amount of sugar to add for a specific amount of CO2.
    Assumption: already 2g of CO2 solved in 20°C beer

    :param co2menge:    amount of CO2 wanted in the finished beer in g/l; float
    :return:            maount of sugar to add in g/l; float
    """
    zuckergabe = (co2menge - 2) / 0.46285991
    zuckergabe = round(zuckergabe, 1)
    return zuckergabe


def ibu(hopfenmenge, alphasaeure, kochdauer, ausschlagwuerze, vol):
    """
    Calculates the amount of alpha-acids/IBUs added to the beer for every hop separately.

    :param hopfenmenge:     amount of hops in g; float
    :param alphasaeure:     concentration of alpha-acids in the hops in %; float
    :param kochdauer:       duration the hops is boiled in minutes; int
    :param ausschlagwuerze: final density of the wort in °P; float
    :param vol:             final volume of the wort in liter; float
    :return:                the IBUs; float
    """
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
    i, j = 0, 0
    while kochdauer > kochzeiten[i]: i += 1
    while ausschlagwuerze > platos[j]: j += 1
    ausnutzung = ausnutzungsgrad[j][i]
    be = (hopfenmenge * alphasaeure * ausnutzung) / (10 * vol)
    be = round(be, 1)
    return be


if __name__ == '__main__':
    u = 'Stammwürze: %s °P\n' % spindel(10, 80)
    w = 'Volumen der Anstellwürze: %s l\n' % mischungskreuz(9, 11, 10)
    x = 'Sudhausausbeute: %s %%\n' % sudhausausbeute(11, 9, 1.55)
    x2 = 'Erwartete Stammwürze: %s °P\n' % stammw(2.4, 10, 60)
    y = 'Alkoholgehalt: %s %%Vol\n' % alkoholgehalt(13, 3)
    v = 'Zuckergabe zum Jungbier: %s g/l\n' % zucker(5.5)
    z = 'Bitter: %s IBU' % ibu(20, 7.1, 51, 9.5, 10)

    print('---\n', u, v, w, x, x2, y, z)