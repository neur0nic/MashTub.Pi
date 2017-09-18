class Beers:
    """

    """
    def __init__(self):
        """
        These parameters are just used to identify the beer/recipe. Leaving the default values will not
        interfere with the brewing process, but with storing the recipe for future use.

        name:               a name for the beer; str
        style:              the style of the beer; str
        date_of_creation:   the date the recipe was created; str
        used_last:          the date the recipe was last accessed; str
        beer_ID:            a unique identifier for the recipe generated from name and date_of_creation; str
        """
        self.name = "Beer Name"
        self.style = "Beer Style"
        self.date_of_creation = "01.01.1990"
        self.used_last = "01.01.1990"
        self.beer_ID = self._create_ID()

    def recipe(self):
        """
        These parameters define the recipe.

        schuettung: a list of one list per schuettung,
                        the inner list contains tuples with the name of the malt, weight in kg;
                        list of lists of tuples; str:float
        wanted_density: wanted density in °P; str
        method:     infusion and decoction method are available; str
        start_vol:  initial volume of water in liter, float
        rests:      a list of tuples with temperature, duration, start and stop time; list of tuples; int, int, float, float
        lautering_start_vol: volule in lautering tun before lautering; float
        spaging:    amount of water in liter added during lautering; list of float/int
        wort_boiling_time:  duration of boiling; int
        hops:       a list of one list per addition of hops, similar to schuettung;
                        the inner list contains tuples with the name of the hops, weight in g, alpha-acid in %;
                        list of lists of tuples; str:float
        calc_IBU:   the calculated bitterness in IBU; int
        yeast:      name of the yeast; str
        """
        self.schuettung = [[("Malt1", 10), ("Malt2", 5), ("Malt3", 0.2), ("Malt4", 0.15)], [("Malt5", 0.05), ("Malt6", 0.05)]]
        self.wanted_density = 13
        self.method = "infusion"
        self.start_vol = 8
        self.rests = [(25, 0 , 0, 0), (35, 15, 0, 0), (44, 15, 0, 0), (52, 30, 0, 0), (64, 60, 0, 0), (72, 30, 0, 0), (78, 5, 0, 0)]
        self.latering_start_vol = 1.5
        self.sparging = [5, 2, 2]
        self.wort_boiling_time = 60
        self.hops = [[("Hops1", 8, 12), ("Hops2", 12, 3.8)], [("Hops3", 15, 8)]]
        self.calc_IBU = 30
        self.yeast = "standart ale yeast"

    def mashing(self):
        if self.method == "infusion": self.infusion()
        if self.method == "decoction": self.decoction()

    def infusion(self):
        pass

    def decoction(self):
        pass

    def _create_ID(self):
        beer_ID = self.name.lower().replace(" ", "_") + str(self.date_of_creation).replace(".", "")
        return beer_ID