import beers
# import pylatex
from os import getcwd, system, chdir, remove, listdir
from stephans_lib import add_to_log
from calculations import *

b = beers.Beers()


class Sudprotokoll:
    def __init__(self):
        self.wdir = getcwd() + "/TeX/"

    def preambel(self):
        file = self.wdir + 'preamble.tex'
        with open(file, 'r') as fr:
            text = fr.readlines()

        text[22] = 'pdftitle={Sudprotokoll: %s/%s},' % (b.name, b.style)
        self._add_paragraph(text)

    def header(self):
        file = self.wdir + 'header.tex'
        with open(file, 'r') as fr:
            text = fr.readlines()

        text[2] =" 		\section*{\hspace{-.4cm}Sudprotokoll: %s / %s}" % (b.style, b.name)
        self._add_paragraph(text)

    def malts(self):
        b.recipe()
        file = self.wdir + 'ingredients.tex'
        with open(file, 'r') as fr:
            text = fr.readlines()

        if len(b.schuettung) == 1:
            table = " "
            weightsum = 0
            for i in b.schuettung:
                for malt in i:
                    line = "%s & \\num{%s} & \si{\kilogram}\\bigstrut\\ \n" % (malt[0], malt[1])
                    weightsum += malt[1]
                    table += line
                table += "\hline\hline Gesamtschüttung & \\num{%s} & \si{\kilogram}\\bigstrut\\\\ \n " \
                         "&&\\\\ \n" % round(weightsum, 1)
        elif len(b.schuettung) == 2:
            table = " "
            weightsum = [0, 0]
            cnt = 0
            for i in b.schuettung:
                for malt in i:
                    line = "%s & \\num{%s} & \si{\kilogram}\\bigstrut\\\\ \n" % (malt[0], malt[1])
                    weightsum[cnt] += malt[1]
                    table += line
                if cnt == 0:
                    table += "\hline Hauptschüttung & \\num{%s} & \si{\kilogram}\\bigstrut\\\\ \n " \
                             "&&\\\\ \n" % weightsum[cnt]
                elif cnt == 1:
                    table += "\hline Zweitschüttung & \\num{%s} & \si{\kilogram}\\bigstrut\\\\ \n " \
                             "\hline\hline Gesamtschüttung & \\num{%s} & \si{\kilogram}\\bigstrut \n" % (weightsum[cnt], (weightsum[cnt] + weightsum[cnt-1]))
                cnt += 1
        text += table
        text += "\n \end{tabular}\\\\ \n"

        text += "\n \\vspace{.25cm} \n " \
                "\hspace{1cm}Angestrebte Stammwürze: \SI{%s}{\plato} \n" \
                "%%\n" % b.wanted_density
        self._add_paragraph(text)

    def hops(self):
        text = "%%Hopfung \n " \
               "\paragraph{Hopfung:}\n " \
               "\\begin{tabular}[t]{m{2.5cm} m{5cm} m{0.8cm} m{1cm} m{0.8cm} m{1cm}}\n"
        line = ""
        cnt = 0
        if len(b.hops) == 2:
            for addition in b.hops:
                if cnt == 0:
                    line += "Bitterhopfen: "
                elif cnt == 1:
                    line += "Aromahopfen: "
                for hops in addition:
                    line += "& %s & \\num{%s} & \si{\gram} & \\num{%s} & \si{\\alfa} \\\\ \n" % (hops[0], hops[1], hops[2])
                cnt += 1
            text += line
        else:
            for addition in b.hops:
                line += "%s. Hopfung" % (cnt+1)
                for hops in addition:
                    line += "& %s & \\num{%s} & \si{\gram} & \\num{%s} & \si{\\alfa} \\\\ \n" % (hops[0], hops[1], hops[2])
                cnt += 1
            text += line

        text += "\n \end{tabular}\\\\ \n\n"
        text += "\n \\vspace{.25cm} \n " \
                "\hspace{1cm}Errechnete Bittere: \SI{%s}{\IBU}\n " \
                "%%\n" % b.calc_IBU
        self._add_paragraph(text)

    def yeast(self):
        text = "\n%%Hefe \n " \
               "\paragraph{Hefe:}\n	" \
               "%s \n" % b.yeast
        self._add_paragraph(text)

    def infusion(self):
        file = self.wdir + 'infusion.tex'
        with open(file, 'r') as fr:
            text = fr.readlines()

        restnames = {35: "Gummi/Glucanaserast", 44: "Ferulasäurerast", 52: "Eiweisrast", 64:  "Maltose-/$\\beta$-Amylaserast", 72: "Verzuckerungs-/$\\alpha$-Amylaserast", 78: "Inaktivierungsrast"}
        cnt, breaker = 1, 0
        for rest in b.rests:
            if rest[1] == 0 and len(text) < 10:
                text += "\n \>\SI{%s}{\litre} vorlegen bei \SI{%s}{\celsius}.\\\\ \n" % (b.start_vol, rest[0])
                continue

            if rest[0] in restnames:
                restname = restnames[rest[0]]
            else:
                restname = "%s. Rast" % cnt
            text += "\> \>Aufheizen auf \SI{%s}{\celsius}.\\\\ \n " \
                    "\>\\textit{%s} für \SI{%s}{\Min} von %s - %s Uhr.\\\\ \n" % (rest[0], restname, rest[1], rest[2], rest[3])
            if rest[0] >= 65 and breaker != 1:
                text += "\> \> \>Jodprobe: \> \> \Square\,positiv \> \> \CheckedBox\,negativ\\\\ \n"
                breaker = 1

        text += "\end{tabbing} \n"
        text += self._add_comentary("Kommentar zum Maischen")
        file = self.wdir + 'infusion_graph.tex'
        with open(file, 'r') as fr:
            text += fr.readlines()

        self._add_paragraph(text)

    def lautering(self):
        file = self.wdir + 'lautering.tex'
        with open(file, 'r') as fr:
            text = fr.readlines()
        text[6] = "\> \SI{%s}{\litre} Wasser vorlegen.\\\\" % b.latering_start_vol
        text[7] = "\> \>1. Nachguss \> \> \SI{%s}{\litre}\\\\" % b.sparging[0]
        text[8] = "\> \>2. Nachguss \> \> \SI{%s}{\litre}\\\\" % b.sparging[1]
        text[10] = "\> \>3. Nachguss \> \> \SI{%s}{\litre}\\\\" % b.sparging[2]
        text[11] = "\>Würze: \> \> \> %s \\\\" % self._add_density()
        text[12] = "\>Glattwasser: \> \> \> %s" % self._add_density()

        text += self._add_comentary("Kommentar zum Läutern")

        self._add_paragraph(text)

    def boiling(self):
        text = "\n\pagebreak[3]\n" \
               "%%Würzekochung \n" \
               "\paragraph{Würzekochung:} für \SI{%s}{\Min} von 666 - 666 Uhr.\n" % b.wort_boiling_time
        text += self._add_comentary("Kommentar zum Würzekochen")
        self._add_paragraph(text)

    def whirlpool(self):
        file = self.wdir + 'whirlpool.tex'
        with open(file, 'r') as fr:
            text = fr.readlines()
        text += "\>Ausschlagwürze: \> \> \> \> \>  %s\\\\ \n" % self._add_density()
        text += "\>Verdünnung: \> \> \> \> \> %s\\\\ \n" % self._add_thinning()
        text += "\>Sudhausausbeute: \> \> \> \> \> \SI{%s}{\percent}\\\\ \n" % sudhausausbeute(10, 13, 2.5) ##
        text += "\>Geschätzter Alkoholgehalt: \> \> \> \> \> \SI{%s}{\percent}\,Vol.\n" % alkoholgehalt(13, 3) ##S
        text += "\end{tabbing}\n"
        text += self._add_comentary("Kommentar zum Whirlpool")
        self._add_paragraph(text)

    def start_fermentation(self):
        text = "\n\pagebreak[1]\n" \
               "%%Hefegabe\n" \
               "\paragraph{Hefegabe} und $O_2$-Gabe um 666 Uhr.\n"
        self._add_paragraph(text)

    def full_tex(self):
        self.preambel()
        self.header()
        self.malts()
        self.hops()
        self.yeast()
        self.infusion()
        self.lautering()
        self.boiling()
        self.whirlpool()
        self.start_fermentation()
        self._create_pdf()

    def _add_comentary(self, comentary = ""):
        text = "\\begin{adjustwidth}{2cm}{0cm} \n " \
               "\hspace{-1cm}Kommentar: %s \n" \
               "\end{adjustwidth}" % comentary
        return text

    def _add_density(self):
        ## Die Eingabe muss durch den Automaten ersetzt werden
        try:
            temp = 60  # input("Temperatur: ")
            dens = 15  # input("Stammwürze: ")
            real = spindel(dens, temp)
            text = "\SI{%s}{\plato} bei \SI{%s}{\celsius} $\Rightarrow$ \SI{%s}{\plato}" % (dens, temp, real)
        except:
            text = "\SI{666}{\plato} bei \SI{666}{\celsius} $\Rightarrow$ \SI{666}{\plato}"
        return text

    def _add_thinning(self):
        ## Eingaben durch automaten ersetzen
        vol = 8
        cur_dens = 15
        dens = 13
        fin_vol = round(mischungskreuz(vol, cur_dens, dens),1)
        text = "$(\SI{%s}{\litre} \cdot \SI{%s}{\plato}) / \SI{%s}{\plato} = \SI{%s}{\litre}$" % (vol, cur_dens, dens, fin_vol)
        return text

    def _add_paragraph(self, paragraph, beer_ID = b.beer_ID):
        self.filename = "%sSudprotokoll_%s.tex" % (self.wdir, beer_ID)
        with open(self.filename, "a") as fa:
            for i in paragraph:
                fa.write(i)

    def _create_pdf(self):
        self._add_paragraph("\end{document}")
        if self.filename:
            chdir(self.wdir)
            system("pdflatex -synctex=1 -interaction=nonstopmode " + self.filename)
            files = listdir(self.wdir)
            for i in files:
                if (".aux" in i) or (".log" in i) or (".synctex.gz" in i):
                    remove(i)

                    # pylatex.Document.generate_pdf(self.filename)
        else:
            raise ValueError
            add_to_log("TeX-file does not exist")


def main():
    b.name = "Testbier"
    b.style = "Stout"
    b.beer_ID = b._create_ID()
    Sud = Sudprotokoll()
    Sud.full_tex()

if __name__ == '__main__':
    main()
