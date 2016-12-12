(function() {

	/**
	 * Lets you add words to a dictionary and then retrieve words
	 * based on a set of letters that you'd like to include.
	 *
	 * So you can be like, "Hey, I only know the letters E, T and A, what
	 * words can I spell?"
	 *
	 * The dict structure is a graph sorted on character frequency
	 * because OMG graphs. <3
	 */

	var freq = "ETAINOSHRDLUCMFWYGPBVKQJXZ";

	var dict = {};

	function count(data) {
		var acc = 0;
		for (let n in data) {
			if (data[n].length) acc += data[n].length;
			else acc += count(data[n]);
		}
		return acc;
	}

	function getPath(word) {
		word = word.toUpperCase();
		var p = "";
		for (let c of freq) if (word.includes(c)) p += c;
		return p;
	}

	function getWordsInPath(p) {
		if (!p.shift) p = p.split("");
		var words = [];
		var node = dict;
		for (let c of p) {
			if (!node[c]) continue;
			if (node[c].words) words = words.concat(node[c].words);
			node = node[c];
		}
		return words;
	}

	function getWords(letters, data) {
		words = [];
		for (let k in data) {
			if (k == 'words') {
				words = words.concat(data[k]);
			} else if (letters.includes(k)) {
				words = words.concat(getWords(letters, data[k]));
			}
		}
		return words;
	}

	var api = {
		addWord: function (word) {
			var p = getPath(word);
			var node = dict;
			for (let c of p) {
				node[c] = node[c] || {};
				node = node[c];
			}
			node.words = node.words || [];
			node.words.push(word);
			return dict;
		},
		getWords: function(letters) {
			var start = new Date().getTime();
			return getWords(letters, dict);
		},
		count: function() {
			return count(dict);
		}
	};

	// Ogden's Basic
    var words = `able abled abler ablers abling about abouts
above account accountable accounted accounting accounts acid acidly across act
acted acting actor actors acts add added adder adders adding addition additions
adjust adjusted adjuster adjusters adjusting adjustment adjustments adjusts
advertise advertised advertisement advertisements advertiser advertisers
advertising Afghanistan Afrikaans Afrikaner after aftering afters afterthought
afterthoughts again against agreement agreements air aired airing airings
airmail airman airmen airplane airplanes airs Alabama Albania alcohol alcohols
algebra algebras Algeria all alls almost aluminum aluminums am America American
ammonia ammonias among amongst amount amounted amounting amounts amused
amusement amusements amuser amusers amuses amusing amusingly an and Andorra ands
anger angered angering angers angle angled angler anglers angles angling
anglings Angola angrily angry animal animals ankle ankled ankles another answer
answered answerer answerer answerers answering ant Antigua ants any anybodies
anybody anyhow anyone anyones anything anythings anyway anyways anywhere
anywheres Anzac Apache apparatus appartuses apple apples approval approvals
approve approved approver approvers approving approvingly April Aprils Arab
Aramaic arch arched archer archers arches arching are Argentina argument
arguments arithmetic Arizona arm armed armer armies arming armor armored
armoring armors arms army art arts as asbestos at attack attacked attacker
attackers attacking attacks attempt attempted attempter attempters attempting
attempts attention attentions attracted attraction attractions attractor
attractors August Augusts Aurora Australia Austria authorities authority
authorized authorizer authorizers authorizing autobus autobuses automated
automatic automatically automatics automating automobile automobiles awake
awaked awaken awakener awakening awakenings awaker awakes awaking awoke babied
babies baby babying back backbone backboned backbones backed backer backers
backing backs backwood backwooding backwoods bad badder badly bads bag bagged
bagger baggers bagging bags balance balancer balances balancing ball balled
baller ballet ballets balls band banded banding bands bang banged banger banging
bangs bank banked banker bankers banking bankings banks bar barrer barring bars
base based basely bases basic basically basics basin basing basins bath bathe
bathed bather bathers bathing bathings bathroom bathrooms baths be beauties
beautifier beautiful beautifully beauty because become becoming becomings bed
bedded bedder bedding bedroom bedrooms beds bee beef beefs beeing beeline been
beer beers bees beeswax beeswaxes before beggar beggarly beggars begged begging
behave behaved behaving behavior behaviors being belched belching belief beliefs
bell belling bells bent berries berry berrying between betweens biology bird
birder birders birding birth birthday birthdays birthed birthing birthmark
birthmark birthrate birthrates birthright birthrights births bit bite biter
biters biting bits bitten bitter bitters black blackberries blackberry
blackberrying blackbird blackbirds blackboard blackboards blade bled blood
blooded blooding bloods bloodvessel bloodvessels blow blower blowers blowing
blown blows blue bluebell bluebells board boarded boarder boarders boarding
boards boat boated boater boaters boating boats bodied bodily bodkins body boil
boiled boiler boilers boiling boilings boils bone boned boner boners bones bony
book booked booker booking bookkeeper bookkeepers bookkeeping books bookworm
boot boots bottle bottled bottleneck bottler bottlers bottles bottling bought
box boxed boxer boxers boxes boxing boy boycott boycotts boys brain brained
brainer brainers brainier braining brains brainy brake braked brakeman brakemen
braker brakers brakes braking branch branched branches branching branchings
brass brasses brassily brassy bravo bravos bread breaded breading breads breath
breathe breathed breather breathers breathes breathily breathing breathings
brethren brick bricked bricking bricks bridge bridged bridger bridgers bridges
bridging bright brighten brightener brighteners brightening brighter brightest
brightly broke broken brother brothered brothering brotherly brothers brown
browned browner browns brush brushed brusher brushes brushing brushings
brushwood bruswoods bucket bucketed bucketing buckets builder builders building
buildings built bulb bulbs burn burned burner burners burning burns burnt burst
bursting bursts bus bused buses business businesses businessman businessmen
busing but buts butter buttercup buttercups buttered buttering butters button
buttoned buttoner buttoners buttonhole buttoning buttons buzz buzzer buzzers
buzzes by bys café cafes cake caked cakes caking calendar calendars calorie
calories came camera cameras canvas canvased canvases canvasing card cardboard
cardboards carding cards care cared carefree cares caretaker caretakers caring
carriage carriaged carriages carriaging cart carted carter carters carting carts
cat catarrh cats catting cause caused causes causing cent centigrade centigram
centigrams centiliter centiliters centimeter centimeters cents cents certain
certainly chain chained chainer chaining chains chalk chalked chalking chalks
champagne champagnes chance chanced chancer chances chancing change changed
changer changes changing chargers chauffeur chauffeured chauffeuring chauffeurs
cheap cheapen cheapening cheaper cheapest cheaply check checked checker checking
checks cheese cheesed cheeses cheesily cheesing chemical chemically chemicals
chemist chemistry chemists chest chested chests chief chiefed chiefly chiefs
chin chin chinned chinning chins chocolate chocolates chorus choruses church
churched churches churching churchly cigarette cigarettes circle circled circler
circles circling circus circuses citron clean cleaned cleaner cleaners cleanest
cleaning cleanly cleans clear cleared clearer clearest clearing clearly clears
clock clocked clocker clockers clocking clocks clockwork clockworks cloth clothe
clothed clothes clothier clothiers clothing clothings cloud clouded clouding
clouds club clubbed clubbing clubs coal coaled coaler coalers coaling coalings
coals coat coated coater coaters coating coatings coats cocktail cocktailing
cocktails coffee coffees cognac cognacs cold colder coldest coldly colds collar
collared collaring collars college college colleges colonies colony color
colored coloreds colorer colorers coloring colorings colors comb combed comber
combers combing combings combs come comer comers comes comfort comforted
comforter comforters comforting comforts coming committee committees common
commoner commoners commonly commons commonsense companied companies company
compared comparison comparisons competed competition competitions competitor
competitors complete completed completely completer completers completes
completing complex complexed complexer complexes complexing computed computer
computers computing condition conditioned conditioner conditioners conditioning
conditioning conditions connected connecter connecting connection connections
connector connectors connectors conscious consciouses consciously control
controlled controller controllers controlling controls cook cooked cooker
cookers cooking cookings cooks copied copier copiers copies copper coppered
coppering coppers copy copying copyright copyrighted copyrighter copyrighting
copyrights cord corded cording cords cork corked corker corkers corking corks
cotton cottoned cottoning cottons cough coughed coughed cougher coughers
coughing coughs countried countries country cover covered coverer covering
coverings covers cow cows crack cracked cracker crackers cracking cracks credit
credited crediting creditor creditors credits cried crier criers cries crime
crimed crimes cruel cruelly crush crushed crusher crushers crushes crushing
crushingly cry crying cup cupboard cupboards cupped cupping cups current
currently currents curtain curtained curtaining curtains curve curved curves
curving cushion cushioned cushioning cushions cut cuts cutter cutters cutting
cuttingly cycle cycles cycling dailies daily damage damaged damager damagers
damages damaging damagingly dance danced dancer dancers dances dancing dancingly
dancings danger dangered dangering dangers dark darken darkened darkener
darkeners darker darkest darkly darks daughter daughterly daughters day daylight
daylights days dead deaden deadener deadening deadens deader deadly dear dearer
dearest dearly dears death deathly deaths debt debtor debts December December
Decembers decimal decimally decimals decision decisioned decisioning decisions
deep deepen deeper deeply deeps degree degreed degrees delicate delicately
dependent dependently dependents design designed designer designers designing
designs desire desired desirer desirers desires desiring destruction
destructions detail detailed detailedly detailer detailers detailing details
developed developer developers developing development developments did
differenced differences differencing different differently digested digester
digesters digesting digestion digestions directed direction directions directly
director dirtied dirtier dirties dirtily dirty dirtying discovered discoverer
discoverers discoveries discovering discovery discussed discusser discussers
discussing discussion discussions disease diseased diseases disguestedly
disguestingly disgust disgusted disgusting disgusts distance distanced distances
distancing distantly distributed distributes distributing distribution
distributor division divisions do doer doers does dog dogged doggedly dogging
dogs doing doing doings dollar dollars dominion dominions done door doored
dooring doors doubt doubted doubter doubters doubting doubtingly doubts down
downed downer downers downfall downing downs drain drained drainer drainers
draining drainings drains drank drawer drawered drawers dress dressed dresser
dressers dresses dressing dried drier dries dries driest drink drinker drinkers
drinking drinks driven driver drivers drives driving drop dropped dropper
droppers dropping droppings drops drove drunk drunken dry dryer dryers drying
dryly drys dust dusted duster dusters dusting dustings dynamite dynamited
dynamiter dynamiters dynamites dynamiting ear eared earlier earlies early
earring earrings ears earth earths earthwork earthworking earthworks east easts
edge edged edger edgers edges edging edgings educated educating education
educations educator effect effected effecting effects egg egged egging eggs
eight eights elastic elastically elastics electric electrically eleven elevens
email emailed emailer emailers emailing emailings embassies embassy empire
empires encyclopedia encyclopedias end endangered endeared ended ender enders
ending ends engine engined engineer engineered engineering engineerings
engineers engines engining enough enoughs equal equaled equaling equally equals
error errored errors estranged euro euros even evened evener eveners evening
evenly evens event events ever evergreen evergreens every everybody everyday
everyone everything everywhere example exampled examples exampling exchange
exchanged exchanger exchangers exchanges exchanging existed existence existences
exister existers existing expanded expansion expansions experience experienced
experiences experiencing expert experted experting expertly experts eye eyeball
eyeballed eyeballing eyeballs eyed eyeing eyes face faced facer faces facing
fact factor factored factoring factorings factors facts fall fallen faller
fallers falling falls false falsely falsest families family far farer farm
farmed farmer farmers farming farmings farms fat father fathered fathering
fatherland fatherlands fathers fatly fats fats fatted fatted fatten fattened
fattener fatteners fattening fattens fatter fatter fattest fatting fear feared
fearer fearing fears feather feathered featherer featherers feathering feathers
Februaries February feeble feebled feebler feebly feeler feelers feeling
feelingly feelings feels feet feet felt female females fertile fertilely
fertilized fertilizer fertilizers fertilizing fiction fictions field fielded
fielder fielders fielding fields fifteen fifteens fifth fifthly fifths fifties
fifty fight fighter fighters fighting fightings fights finger fingered fingerer
fingering fingerings fingerprint fingerprinted fingerprinting fingerprints
fingers fire firearm firearms fired fire-engine fireflies firefly fireman
firemen fireplace fireplaces firer fires firework fireworks firing first firstly
first-rate first-rated firsts fish fished fisher fishers fishes fishing fishings
five fiver fives fixed fixedly fixer fixers fixes fixing fixings flag flagged
flagging flaggingly flags flame flamed flamer flames flaming flamingly flat
flats flatten flatter flatterer flatterers flatting flew flier flier fliers
fliers flies flight flighting flights floor floored floorer flooring floorings
floors flower flowered flowering flowers fly flying flys fold folded folder
folders folding foldings folds food foods fooled fooling foolish foolisher
foolishly foot football footballed footballer footballers footballing footed
footer footers footing footings footlight footlighted footlighting footlights
footman footmen footnote footnotes footprint footprints for force forced forcer
forces forcing fork forked forker forking forks form formed former formerly
formers forming forms forties forty forward forwarded forwarding forwards fought
four fours fourteen fourteens fourth fourths fowl fowled fowler fowlers fowling
fowls frame framer framers frames framing framings free freed freeing freely
freer frees freest frequent frequented frequenter frequenters frequenting
frequently frequents Friday Fridays friend friendlier friendlies friendly
friends from front fronted fronting fronts fruit fruited fruiter fruiting fruits
full fuller fullest fulls fully future futures garden gardened gardener
gardeners gardening gardens gas gases gassed gassing gasworks gave general
generaled generally generals geographer geographers geographies Geography
geologies Geology geometer geometries Geometry get gets getter gettters girl
girls give given givens giver givers gives giving givingly glass glassed glasses
glassing glove gloved glover glovers gloves gloving glycerin glycerins go goat
goats goer goers goes going goings goings gold golder goldest goldfish golding
gone goner goners good goodlooking goodly good-morning goodnight goods got
gotten governed governing government governments governor governors grain
grained grainer grainers graining grains gram gram grams grass grassed grasses
grassing gray grayed grayer grayest graying grayly grays great greater greatest
greatly greats green greened greener greenest greening greenly greens grip
gripped gripper grippers gripping grippingly grips group grouped grouping
groupings groups grow grower growers growing growingly grown grows growth guide
guided guider guiders guides guiding gun gunboat gunboats gun-carriage gunmetal
gunned gunner gunners gunning gunpowder gunpowders guns had hair haired hairs
half halves halving hammer hammered hammerer hammering hammers hand handbook
handbooks handed hander handing hands handwriting handwritings handwritten hang
hanged hanger hangers hanging hangings happier happily happy harbor harbored
harboring harbors hard harden hardening harder hardest hardly hards harmonies
harmony hat hate hated hater haters hates hating hats hatted hatter hatters
hatting have haver havers haves having he head headdress headdresses headed
header headers headers heading headings headland headlands heads headstone
headstones headway headways healthier healthily healths healthy heard hearer
hearers hearing hearing heart hearted heartedly hearts heat heated heatedly
heater heaters heating heatings heats help helped helper helpers helping
helpings helps here hereafter heres herewith high higher highest highland
highlander highlanders highlands highly highs highway highwayman highwaymen
highways him hims himself his hiss hissed hissing histories history hole holed
holes holing hollow hollowed hollower hollowing hollowly hollows hook hooked
hooker hookers hooking hooks hope hoped hopes hoping horn horned horner horning
horns horse horsed horseplay horseplaying horsepower horsepowered horsepowering
horsepowers horses horsing hospital hospitaled hospitaling hospitals hotel
hoteled hotels hour hourglass hourglasses hourly hours house houseboat
houseboats housed housekeeper housekeepers houser houses housing how however
hows humor humored humorer humoring humors hundred hundredsbv hung hyena hyenas
hygiene hysteria hysterias I ice iced ices icily icing idea ideas if ifs ill
ills imperial imperially imperials important importantly improbable impulse
impulsed impulses impulsing in inasmuch inceasings inch inched inches inching
income incomes incoming incomings increase increased increaser increases
increasing increasingly indebted indoor indoors industries industry inferno
infernos influenza influenzas ink inked inker inkers inking inkings inks inland
inlander inlanders inlands inlet inlets input inputer inputers inputted
inputting ins insect insects inside insider insiders insides instate instep
insteps instrument instrumented instrumenting instruments insurance insured
insurer insurers insuring interest interested interestedly interesting
interestingly interests international internationally internationals into
invented inventing invention inventions inventor inventors iron ironed ironer
ironers ironing ironings irons is island islanded islander islanders islanding
islands it its itself January Januarys jazz jazzed jazzes jazzing jellied
jellies jelling jelly jewel jeweled jeweler jewelers jeweling jewels journey
journeyed journeyer journeyers journeying journeyings journeys judge judged
judges judging July Julys jump jumped jumper jumpers jumping jumps June Junes
keep keeper keepers keeping keepings keeps kept kettle kettles key keyed keying
keys kick kicked kicker kickers kicking kicks kilo kilo- kilocalorie kilocycle
kilogram kilohertz kiloliter kiloliters kilometer kiloton kilowatt kilowatt-hour
kind kinder kindly kinds king kinged kingly kings kiss kissed kisser kissers
kisses kissing kissings knee kneed kneeing knees knife knifed knifing knives
knot knots knotted knotting knowledge knowledges land landed lander landers
landing landings landmark landmarked landmarking landmarkings landmarks lands
landslip landslips language languages last lasted laster lasting lastingly
lastings lastly lasts late lately later laters lates latest latitude laugh
laughed laughers laughing laughingly laughs laughter lava law lawed lawing laws
lead leaded leading leaf leafed leafing leafing learned learnedly learner
learners learning learning leather leathered leathering leathers leaves left
leftest lefts leg legged legging leggings legs let lets letter lettered letterer
letterers lettering letters letting letting lettings level leveled leveling
levelly levels libraries library lift lifted lifter lifters lifting lifts light
lighted lighter lighters lightest lighthouse lighthouses lighting lightly lights
like liked likelier likely liker likers liking limit limited limitedly limiter
limiters limiting limits line lined linen linens liner liners lines lining lip
lipped lipper lipping lips liqueur liqueurs liquid liquidly liquids list listed
lister listing lists liter liters little littler littles lively living livingly
livings lock locked locker lockers locking locks long longer longing longingly
longings longitude longitudes longs look looked looker lookers looking looking-
glass looks loose loosely loosen loosened looser loosing losing loss losses lost
loud louder loudest loudly love loved lovelier lovelies lovely lover lovers
loves loving lovingly low lower lowered lowering lowers lowest lowly lows
macaroni macaronis machine machined machines machining madam madams made
magnetic magnetics make maker makers makes making malaria male males man manage
managed manager managers managing manhole manholes mania manias manlier manly
manly manned manning map mapped mapper mappers mapping maps March Marches mark
marked markedly marker markers market marketed marketer marketers marketing
marketing marketings markets marking marks married marrieds marries marry
marrying mass massed masses massing match matched matcher matches matching
material materially materials mathematically mathematics may May Mays me meal
meals mealy measure measured measurer measurers measures measuring meat meats
medical medically meet meeter meeting meetings meets memories memory men meow
meowed meower meowers meowing meows metal metaled metaling metals meter meters
microscope microscopes middle middler middles middling middlingly middlings
militaries militarily military milk milked milker milkers milking milks
milligram milliliter milliliters millimeter millimeters million millions mind
minded minder minders minding minds mine mined miner miners mines mining minute
minuted minutes minuting mist misted misting mists mixed mixed mixer mixers
mixing Monday Mondays money moneyed\ monier monies monkey monkeyed monkeying
monkeys month monthlies monthly months moon mooned mooning moons morning mother
mothered motherer motherers mothering motherly mothers motion motioned motioner
motioners motioning motions mountain mountained mountains Mountjoy mouth mouthed
mouther mouthing mouths move moved mover movers moves moving much muscle muscled
muscles muscling museum museums music musicly musics my myself nail nailed
nailer nailers nailing nails name named namely namer names naming narrow
narrowed narrower narrowing narrowly narrows nation nations natural naturally
naturals near neared nearer nearest nearing nearly nears necessarily necessary
necessities neck necked necker necking neckings necks need needed needer needier
needing needle needled needles needling needs nerve nerved nerves net nets
netted netting netting network networked networking networks new newer newest
newly news newspaper newspapered newspapers nickel nickeled nickeling nickels
nicotine nicotines night nightly nights no nobodies nobody noise noised noises
noisily normal normalled normalling normally normals north norther northerly
nose nosed noses nosing not note noted notedly notes nothing nothings noting
November Novembers now nowhere number numbered numberer numbering numbers nut
nuts nutted nutting observation observations observe observed observer observers
observers observing October Octobers of off offer offered offerer offerers
offering offerings offers office officed officer officers offices offs offspring
oil oiled oiler oilers oiling oiling oils old older oldest olds olive olives
omelet omelets on once oncoming one ones oneself onlooker onlookers only onto
open opened opener openers opening openings opens opera operas operated
operating operation operations operator operators opinion opinioned opinions
opium opposite opposites or orange oranges orchestra orchestras order ordered
ordering orderings orderlies orderly orders organism organisms organization
organizationally organizations ornament ornamented ornamenting ornaments other
others our ours out outburst outburstings outbursts outcome outcomes outcried
outcries outcry outdoor outdoors outed outer outers outgoing outgoingly
outgoings outhouse outhouses outing outings outlaw outlawed outlawing outlaws
outlet outlets outline outlined outliner outliners outlines outlining outlook
outlooks output outputs outputted outputting outputting outs outside outsider
outsiders outskirts outstretch outstretched outstretches oven ovened ovens over
overact overacted overacting overacts overall overbalanced overbalances
overbalancing overbearing overbearingly overcame overcame overcoat overcoated
overcoating overcoats overcome overcomes overcoming overdo overdoing overdone
overdressed overdresses overdressing overfill overfilled overfilling overfills
overfull overhang overhanging overhangs overhead overheads overhung overland
overleaf overleaves overloud overloudly overly overs overseas overseer overseers
overshoe overshoed overshoes overstatement overstatements overtake overtakes
overtax overtaxed overtaxing overtime overtimed overtimes overtook overturn
overturned overturning overturns overuse overused overuses overusing overvalue
overvalued overvalues overvaluing overweight overweighted overweighting
overweights overwork overworked overworking overworks owner owners page paged
pager pagers pages paging pain pained paining pains paint painted painter
painters painting paintings paints pajamaed pajamas paper papered paperer
paperers papering papers paradise paradises paraffin paraffined paraffins
parafinning parallel paralleled paralleling parallels parcel parceled parceling
parcels park parked parker parkers parking parkings parks part parted parting
partly parts passport passported passports past paste pasted pastes pasting
pasting pasts patent patented patenter patenters patenting patently patents
payment payments peace peaces pencil penciled penciling pencilings pencils
penguin penguins person personally persons phonograph phonographs physical
physically physicals physics physiology piano pianos picture pictured pictures
picturing pig pigged pigging pigs pin pincushion pincushions pinned pinning
pinnings pins pipe piped piper pipes piping place placed placer placers places
placing plane planed planes planing plant planted planter planters planting
plantings plants plate plated plates plating platinum platinums platter platters
play played player players playing plays plaything playthings please pleased
pleaser pleases pleasing pleasingly pleasings pleasure pleasured pleasurers
pleasures pleasuring plow plowed plower plowers plowing plowings plows pocket
pocketed pocketer pocketing pockets point pointed pointedly pointer pointers
pointing points poison poisoned poisoner poisoners poisoning poisonings poisons
police policed policeman policemen policing polish polished polisher polishers
polishes polishing polishings political politically politicals poor poorer
poorest poorly porter portering porters position positioned positioner
positioners positioning positionings positions possible possibles possibly post
posted poster posters posting postings postman postmark postmarked postmarking
postmarks postmen postoffice postoffices posts pot potash potashes potato
potatoes pots potted potter pottered pottering potters potting powder powdered
powderer powdering powders power powered powering powers present presented
presenter presenters presenting presently presents President Presidents price
priced prices pricing Prince Princes Princess Princesses print printed printer
printers printing prints prison prisoned prisoner prisoners prisoners prisoning
prisonings prisons private privately privater privates probable probables
probably process processed processes processing processor processors produce
produced producer producers produces producing profit profited profiter
profiters profiting profits program programmed programmer programmers
programming programmings programs propaganda propagandas propertied properties
property prose protest protested protester protesters protesting protestingly
protestings protests psychologies psychology public publicly publics pull pulled
puller pullers pulling pullings pulls punish punished punisher punishers
punishes punishing punishment punishments purpose purposed purposely purposes
purposing purr purred purring purringly purrs push pushed pusher pushers pushes
pushing put puts putted putter putting pyramid pyramids quack quacked quacking
quacks qualities quality quart quarter quartered quartered quartering quarterly
quarters queen queened queening queenly queens question questioned questioner
questioners questioning questioningly questions quick quicken quickening quicker
quickest quickly quiet quieted quieter quieting quietly quinine quinines quite
radio radioed radioing radios radium rail railed railer railing rails rain
rained raining rains ran range ranged ranger rangers ranges ranging rat rate
rated rater raters rates rating ratings rats ratter ray rayed raying rays react
reacted reacting reacting reaction reactions reactor reactors reacts read reader
readers readied readier readies readily reading readings reads ready readying
reason reasoned reasoner reasoners reasoning reasonings reasons receipt
receipted receipting receipts record recorded recorder recorders recording
recordings records red redder reddest redly reds referendum referendums regret
regrets regretted regretting regular regularly regulars relation relations
religion religions representative representatively representatives represented
representing request requested requester requesters requesting requests respect
respected respecter respecters respecting respects responses responsible
responsibly rest restaurant restauranter restaurants rested rester resters
resting rests reward rewarded rewarder rewarders rewarding rewardingly rewards
rheumatism rhythm rhythms rice riced ricer ricers rices ricing right righted
righter rightest righting rightly rights ring ringed ringer ringers ringing
ringingly ringings rings river rivers road roads rod rodded rodder rodding rods
roll rolled roller rollers rolling rollings rolls roof roofed roofer roofers
roofing roofs room roomed roomer roomers rooming rooms root rooted rooter
rooters rooting roots rough roughed rougher roughest roughly roughs round
rounded rounder rounders rounding roundly rounds royal royally royals rub rubbed
rubber rubbered rubbering rubbers rubs ruled ruler rulers rules rules ruling
rulings rum rums run runaway runaways runner runners running runnings runs sad
sadden sadder saddest sadly safe safely safer safes said sail sailed sailer
sailing sailings sailor sailors sails salad salads salt salted salter salting
salts salvers same sames sand sanded sander sanders sanding sands sardine
sardined sardining sardines Saturday Saturdays saw say sayer saying sayings says
scale scaled scales scaling school schooled schooler schoolers schooling
schoolings schools science sciences scissored scissoring scissors screw screwed
screwing screws sea seaman seamen seas seat seated seater seaters seating seats
second seconded secondhand seconding secondly seconds secret secretaries
secretary secreted secreter secreting secretly secrets see seed seeded seeder
seeders seeding seedings seeds seeing seem seemed seeming seemings seemingly
seemly seems seen sees select selected selected selecting selecting selection
selections selector selectors selects self selves send sender senders sending
sends sense sensed senses sensing sensor sensors sent separate separated
separates separating separatings separately separator separators September
Septembers serious seriously servant servanted servanting servantly servants
seven sevens sex sex sexed sexes sexing shade shared shader shades shading shake
shaken shaker shakers shakes shaking shame shamed shamer shames shaming sharp
sharpen sharpener sharpeners sharpens sharper sharpest sharply sharps sheep
shelf shelved shelver shelvers shelves shelving ship shipped shipper shippers
shipping shippings ships shirt shirted shirting shirtings shirts shock shocked
shocker shockers shocking shockingly shocks shod shoe shoeing shoes shook short
shorted shorten shortens shortened shorter shortest shorthand shorthanded
shorthands shorting shortly shorts shut shuts shutter shuttered shuttering
shutters shutting side sideboard sideboards sided sider sides sidewalk sidewalks
siding sign signed signer signers signing signs silk silked silking silks silver
silvered silverer silvering silverly silvers simple simpler simples simplest
simipling simply sir sirred sirring sirs sister sistered sistering sisterly
sisters six sixes sixteen sixteens size sized sizer sizes sizing sizings skin
skinned skinner skinners skinning skinnings skins skirt skirted skirter skirting
skirtings skirts sky skyed skys sleep sleeper sleepers sleeping sleeps slept
slip slipped slipper slippers slipping slips slope sloped slopes sloping slow
slowed slower slowing slowly small smaller smalls smash smashed smasher smashers
smashes smashing smell smelled smeller smelling smells smile smiled smiles
smiling smoke smoked smoker smokers smokes smoking smooth smoothed smoother
smoothing smoothly smooths snake snaked snakes snaking sneeze sneezed sneezer
sneezers sneezes sneezing snow snowed snowing snows so soap soaped soaping soaps
societies society sock socked socking socks soft soften softener softeners
softening softenings softer softly solid solider solidly solids some somebodies
somebody someday someday somehow someone something somethings sometime sometimes
somewhat somewhere son song songed songs sons sort sorted sorter sorters sorting
sorts sound sounded sounder sounding sounds soup soups south space spaced spacer
spacers spaces spacing spade spaded spades spading special specially specials
sponge sponged sponger spongers sponges sponging spoon spooned spooning spoons
sport sported sporting sports spring springer springing springs sprung square
squared squarely squarer squares squaring stage staged stager stagers stages
staging stamp stamped stamper stampers stamping stamps star starred starring
stars start started starter starters starting starts stated statement statements
stating station stationed stationer stationers stationing stations steam steamed
steamer steamers steaming steams steel steeled steeler steelers steeling steels
stem stemmed stemming stems step stepped stepper steppers stepping steps stick
sticker stickier stickily sticking sticks sticky stiff stiffed stiffen stiffened
stiffener stiffeners stiffening stiffenings stiffens stiffer stiffest stiffing
stiffly stiffs still stilled stiller stillest stilling stills stitch stitched
stitcher stitches stitching stocking stockinged stockings stomach stomached
stomacher stomachers stomaching stomachs stone stoned stoner stoners stones
stoning stop stopped stopper stoppered stoppering stoppers stopping stops stored
storer stores storied stories storing story storied stories straight straighten
straightener straighteners straightening straighter straightest straightly
straights strange strangely stranger strangers strangest street streets stretch
stretched stretcher stretchers stretches stretching strong stronger strongly
structure structured structurer structures structuring stuck substance
substances such suchlike sudden suddenly sugar sugared sugaring sugarings sugars
suggest suggested suggester suggesters suggesting suggestion suggestions summer
summered summering summers sunburn sunburned sunburning sunburns Sunday Sundays
sunlight sunlighting sunlights sunned sunning sunshade sunshaded sunshades
support supported supporter supporters supporting supportingly supports surprise
surprised surpriser surprisers surprises surprising surprisingly surprisings
swam sweet sweeten sweetened sweetener sweeteners sweetening sweetenings
sweetens sweeter sweetest sweetheart sweethearts sweeting sweetly sweets swim
swimmer swimmers swimming swimmingly swimmings swims system systems systems
table tabled tables tabling tail tailed tailer tailing tails take taken taker
takes taking talk talked talker talkers talking talks tall taller tallest
tapioca tapiocas taste tasted taster tasters tastes tasting taught tax taxed
taxer taxers taxes taxing taxi taxing taxis tea teach teacher teachers teaching
teaed teaing teas teeth teethed teething telegram telegrammed telegramming
telegrams telephone telephoned telephoner telephoners telephoning telephones
tended tendencies tendency tending terrace terraced terracing terraces test
tested tester testers testing tests than that the theater theaters theatre
theatres their them then theories theory there these thermometer thermometers
they thick thicken thickened thickener thickeners thickening thickenings thicker
thickest thickly thicks thin thing things thinly thinned thinner thinning thins
third thirded thirdly thirds thirteen thirties thirty this tho those though
thought thoughts thousand thousands thread threaded threader threaders threading
threads three throat throating throated throats through thru thumb thumbed
thumbing thumbs thunder thunderer thundered thundering thunderingly thunders
Thursday Thursdays ticket ticketed ticketing tickets tight tighten tightened
tightener tighteners tightening tighter tightest tightly tights till tilled
tiller tilling tills time timed timer timers times timing timings timeliest
timely tin tinned tinning tins tire tired tireder tiredly tiring tiring to toast
toasted toaster toasters toasting toasts tobacco tobaccos today Todd toe toed
toeing toes together tomorrow tomorrows tongue tongued tongues tonguing tonight
tonights tooth toothed top topped topper toppers topping tops torpedo torpedoed
torpedoes torpedoing touch touched toucher touches touching touchingly touchings
town towner towns trade traded trader traders trades tradesman tradesmen trading
train trained trainer trainers training trains transport transported transporter
transporters transporting transports tray trayed traying trays tree treed
treeing trees trick tricked tricker tricking tricks trouble troubled troubler
troubles troubling trousered trousering trousers true trued truer trues truest
truing truly Tuesday Tuesdays turn turned turner turners turning turnings turns
twelve twenties twenty twenty-one twice twist twisted twister twisters twisting
twists two twos umbrella umbrellaed umbrellas unaccountable unaccounted
unadjusted unadvertised unanswered unapproved unarmed unawakened unbacked unbar
unbarred unbarring unbelief unblocked unbranched unburned unbuttered unbutton
unbuttoned unbuttoning uncared uncaring uncaused uncertain uncertainly unchained
unchanged unchanging unchecked unchemicalled unclean unclear unclothe unclothed
uncoated uncolored uncombed uncomforted uncommon uncompleted uncomplexed
uncomplexing uncomplexly unconditioned unconnect unconnected unconscious
unconsciously uncontrolled uncooked uncork uncorked uncorking uncover uncover
uncovered uncovered uncovering uncredited uncut undamaged under underclothes
underclothing undercooked undergo undergoes undergoing undergone undergrowth
undergrowths undermined undersigned undersized undersizing understated
understatement understatements understating undertake undertaken undertaker
undertakers undertaking undervalue undervalued undervalues undervaluing
undesigning undesired undeveloped undid undiscovered undiscussed undistributed
undo undoes undoing undone undoubted undoubtedly undoubting undoubtingly
undrained undress undressed undresses undried unearth unearthed unearthing
unearths unelastic uneven uneventful unexampled unexperienced unexpertly
unfeathered unfeeling unfertilized unfired unfix unfixed unflaggingly unfolded
unfolding unfolds unformed unframed unfrequented unfriendly ungotten ungoverned
unguided unhand unhappily unhardened unhealthily unhealthy unheated unhook
unhooked unhooking unhooks unhoped unhumored uninterested uninteresting
uninvented unit united uniter uniters uniting units universities university
unkind unkindly unleaded unlearn unlearned unlettered unlevel unleveled
unleveling unlighted unlike unlikely unlimited unlined unlisted unlock unlocked
unlocking unloose unloosed unlooses unloosing unmade unmake unman unmanaged
unmanly unmanned unmapped unmarked unmarried unmixed unmoved unnamed unnatural
unnecessarily unnecessary unneeded unnerve unnerving unnumbered unobserved
unopened unordered unpaged unpainted unparalled unparceled unpasted unpersons
unphysical unpin unpinned unpinning unplaced unpleased unplowed unpolished
unpolitical unpriced unprinted unprobable unprocessed unpropertied unpublished
unpunished unquestioned unquestioningly unrated unreacted unread unready
unreasonable unreasonably unreason unreasoned unreasoning unrequested unrested
unresting unroll unrolled unrolling unrolls unruled unruly unsafe unsaid
unsalted unscaled unschooled unscrew unscrewd unsccrewing unseat unseated
unseeded unseeing unseeingly unseemly unseemingly unseen unselected unsent
unshaded unshaken unshakable unshakably unsharpened unshod unsigned unsized
unsmoothed unsmoothing unsolid unsorted unsound unsounded unsounder unsoundly
unsportsmanlike unstamped unstated unstemmed unstopable unstopped unstopping
unsurprised unsurprising unsurprisingly unstuck unstructured unstopped
unstraight unstrighten unstrightened unsupported unsupporting unsurprised
unsurprising unsweet unsweetened untaxed untasted untaught untested untimely
untiring untouched untrubled unturned untwist untwisted untwisting untwists
unvalued unwashed unwatched unwavering unwaveringly unweighted unwilled
unwilling unwillingly unwire unwired unwiring unworked unwounded unwritten up
upkeep upkeeping uplift uplifted uplifting uplifts upon upped upper upping
upright uprighted uprighting uprights uptake uptaken uptakes us use used user
users uses using value valued valuer values valuing vanilla vanillas verily
verse versed verser verses very vessel vessels view viewed viewer viewers
viewing viewpoint viewpoints views violent violently violin violins visa visas
vitamin vitamins vodka vodkas voice voiced voicer voices voicing volt volts
waited waiter waitered waitering waiters waiting waitings waits walk walked
walker walkers walking walkings walks wall walled waller walling walls war warm
warmed warmer warmers warming warmly warred warring warring wars was wash washed
washer washers washes washing waste wasted waster wasters wastes wasting
wastingly watch watched watcher watchers watches watching water watered waterer
waterers waterfall waterfalls watering waterings waters wave waved waver wavers
waves waving wax waxed waxer waxers waxes waxing way ways we weather weathered
weatherer weathering weatherings weatherly weathers Wednesday Wednesdays week
weekend weekends weekly weeks weight weighted weighting weights well well-being
welled welling well-off wells were west westerlies westerly wet wetly wets
wetted wetter wetting whatever wheel wheeled wheeler wheelers wheeling wheels
when whenever where whereas whereby wheres wherever whichever while whiled
whiles whiling whip whipped whipper whippers whipping whippings whips whiskey
whiskeys whiskies whisky whistle whistled whistler whistlers whistles whistling
white whitely whiter whites whitest whitewash whitewashed whitewasher
whitewashes whitewashing whiting who whoever why whys wide widely widen widened
widener widens wider will willed willer willing wills wind winded window
windowed windows windpipe winds wine wined wines wing winged winger winging
wings winter wintering winters wire wired wirer wirers wires wiring wise wised
wisely wiser wisest with within without woman womaned womaning womanly women
wood wooded woods woodwork woodworker woodworkers woodworking wool wooled woolen
woolly wools word worded worder wordily wording words work worked worker
workhouse workhouses working works worm wormed wormer wormers worming worms
wound wounded wounder wounding wounds writer writing writings written wrong
wronged wronger wronging wrongly wrongs x-ray x-rayed x-raying x-rays yard yards
year yearbook yearbooks yearly years yell yeller yellers yelling yellow yellowed
yellowing yellows yells yes yeses yessed yessing yesterday yesterdays you young
younger youngest your yours yourself yourselves zebra zebras zero zeroed zeroing
zeros zinc zoo zookeeper zookeepers zoology zoos`;

	words.split(/\s+/).map(api.addWord);

	window.dictionary = api;

}());