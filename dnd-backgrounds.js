// ============================================================
//  D&D 5e BACKGROUND DATA — 10 MOST COMMON BACKGROUNDS
// ============================================================

const DND_BACKGROUND_DATA = {};

// Structure per background:
// { name, desc, skillProficiencies[], toolProficiencies[],
//   languages: number (how many extra languages),
//   equipment[], feature: { name, desc },
//   suggestedCharacteristics: { personalityTraits[], ideals[], bonds[], flaws[] } }

DND_BACKGROUND_DATA.acolyte = {
  name: 'Acolyte',
  desc: 'You have spent your life in service to a temple, learning sacred rites and providing sacrifices to the god or gods you serve.',
  skillProficiencies: ['Insight', 'Religion'],
  toolProficiencies: [],
  languages: 2,
  equipment: ['Holy symbol', 'Prayer book or prayer wheel', 'x5 sticks of incense', 'Vestments', 'Common clothes', '15 gp'],
  feature: {
    name: 'Shelter of the Faithful',
    desc: 'You and your companions can receive free healing and care at temples, shrines, and other establishments of your faith. You have ties to a specific temple and the priests there will support you (though not risk their lives for you).',
  },
  suggestedCharacteristics: {
    personalityTraits: [
      'I idolize a particular hero of my faith and constantly refer to that person\'s deeds.',
      'I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.',
      'I see omens in every event and action. The gods try to speak to us; we just need to listen.',
      'Nothing can shake my optimistic attitude.',
    ],
    ideals: [
      'Tradition — The ancient traditions must be preserved.',
      'Charity — I always try to help those in need.',
      'Change — We must help bring about the changes the gods are working in the world.',
      'Power — I hope to one day rise to the top of my faith\'s religious hierarchy.',
    ],
    bonds: [
      'I would die to recover an ancient relic of my faith.',
      'I will someday get revenge on the corrupt temple hierarchy.',
      'Everything I do is for the common people.',
    ],
    flaws: [
      'I judge others harshly, and myself even more severely.',
      'I put too much trust in those who wield power within my temple.',
      'My piety sometimes leads me to blindly trust those that profess faith in my god.',
    ],
  },
};

DND_BACKGROUND_DATA.criminal = {
  name: 'Criminal',
  desc: 'You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld.',
  skillProficiencies: ['Deception', 'Stealth'],
  toolProficiencies: ['One type of gaming set', 'Thieves\' tools'],
  languages: 0,
  equipment: ['Crowbar', 'Dark common clothes with hood', '15 gp'],
  feature: {
    name: 'Criminal Contact',
    desc: 'You have a reliable and trustworthy contact who acts as your liaison to a network of criminals. You know how to get messages to and from your contact, and you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages.',
  },
  variants: ['Spy — you worked as an intelligence agent, spy, or saboteur'],
  suggestedCharacteristics: {
    personalityTraits: [
      'I always have a plan for what to do when things go wrong.',
      'I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.',
      'The first thing I do in a new place is note the locations of everything valuable.',
      'I would rather make a new friend than a new enemy.',
    ],
    ideals: [
      'Honor — I don\'t steal from others in the trade.',
      'Freedom — Chains are meant to be broken, as are those who would forge them.',
      'Charity — I steal from the wealthy so that I can help people in need.',
      'Greed — I will do whatever it takes to become wealthy.',
    ],
    bonds: [
      'I\'m trying to pay off an old debt I owe to a generous benefactor.',
      'My ill-gotten gains go to support my family.',
      'I will become the greatest thief that ever lived.',
    ],
    flaws: [
      'When I see something valuable, I can\'t think about anything but how to steal it.',
      'When faced with a choice between money and my friends, I usually choose the money.',
      'If there\'s a plan, I\'ll forget it. If I don\'t forget it, I\'ll ignore it.',
    ],
  },
};

DND_BACKGROUND_DATA.folk_hero = {
  name: 'Folk Hero',
  desc: 'You come from a humble social rank, but you are destined for so much more. People of your home village regard you as their champion, and your destiny calls you to stand against the tyrants and monsters that threaten the common folk everywhere.',
  skillProficiencies: ['Animal Handling', 'Survival'],
  toolProficiencies: ['One type of artisan\'s tools', 'Vehicles (land)'],
  languages: 0,
  equipment: ['Set of artisan\'s tools', 'Shovel', 'Iron pot', 'Common clothes', '10 gp'],
  feature: {
    name: 'Rustic Hospitality',
    desc: 'Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.',
  },
  suggestedCharacteristics: {
    personalityTraits: [
      'I judge people by their actions, not their words.',
      'If someone is in trouble, I\'m always ready to lend help.',
      'When I set my mind to something, I follow through no matter what.',
      'I have a strong sense of fair play and always try to find the most equitable solution.',
    ],
    ideals: [
      'Respect — People deserve to be treated with dignity.',
      'Fairness — No one should get preferential treatment.',
      'Freedom — Tyrants must not be allowed to oppress the people.',
      'Sincerity — There\'s no good pretending to be something I\'m not.',
    ],
    bonds: [
      'I have a family, but I have no idea where they are.',
      'I worked the land, I love the land, and I will protect the land.',
      'A proud noble once mistreated me. I will have my revenge.',
    ],
    flaws: [
      'The tyrant who rules my land will stop at nothing to see me killed.',
      'I\'m convinced of the significance of my destiny, and blind to my shortcomings.',
      'I have trouble trusting in my allies.',
    ],
  },
};

DND_BACKGROUND_DATA.noble = {
  name: 'Noble',
  desc: 'You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence.',
  skillProficiencies: ['History', 'Persuasion'],
  toolProficiencies: ['One type of gaming set'],
  languages: 1,
  equipment: ['Fine clothes', 'Signet ring', 'Scroll of pedigree', '25 gp'],
  feature: {
    name: 'Position of Privilege',
    desc: 'Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you and avoid your displeasure, and other people of high birth treat you as a member of the same social sphere.',
  },
  variants: ['Knight — a minor title with a retainer (squire) who accompanies you'],
  suggestedCharacteristics: {
    personalityTraits: [
      'My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.',
      'The common folk love me for my kindness and generosity.',
      'No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.',
      'I take great pains to always look my best and follow the latest fashions.',
    ],
    ideals: [
      'Respect — Respect is due to me because of my position.',
      'Responsibility — It is my duty to respect the authority of those above me.',
      'Independence — I must prove that I can handle myself.',
      'Power — If I can attain more power, no one will tell me what to do.',
    ],
    bonds: [
      'I will face any challenge to win the approval of my family.',
      'My house\'s alliance with another noble family must be sustained at all costs.',
      'My loyalty to my sovereign is unwavering.',
    ],
    flaws: [
      'I secretly believe that everyone is beneath me.',
      'I hide a truly scandalous secret that could ruin my family forever.',
      'I too often hear veiled insults and threats in every word addressed to me.',
    ],
  },
};

DND_BACKGROUND_DATA.outlander = {
  name: 'Outlander',
  desc: 'You grew up in the wilds, far from civilization and the comforts of town and technology. You\'ve witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction.',
  skillProficiencies: ['Athletics', 'Survival'],
  toolProficiencies: ['One type of musical instrument'],
  languages: 1,
  equipment: ['Staff', 'Hunting trap', 'Trophy from animal you killed', 'Traveler\'s clothes', '10 gp'],
  feature: {
    name: 'Wanderer',
    desc: 'You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.',
  },
  suggestedCharacteristics: {
    personalityTraits: [
      'I\'m driven by a wanderlust that led me away from home.',
      'I watch over my friends as if they were a litter of newborn pups.',
      'I once ran twenty-five miles without stopping. I\'m in pain the whole time but I never show it.',
      'I have a lesson for every situation, drawn from observing nature.',
    ],
    ideals: [
      'Change — Life is like the seasons; in constant change.',
      'Greater Good — It is each person\'s responsibility to make the most happiness for the whole tribe.',
      'Honor — If I dishonor myself, I dishonor my whole clan.',
      'Might — The strongest are meant to rule.',
    ],
    bonds: [
      'My family, clan, or tribe is the most important thing in my life.',
      'An injury to the unspoiled wilderness of my home is an injury to me.',
      'I will bring terrible wrath down on the evildoers who destroyed my homeland.',
    ],
    flaws: [
      'I am too enamored of ale, wine, and other intoxicants.',
      'There\'s no room for caution in a life lived to the fullest.',
      'I remember every insult I\'ve received and nurse a silent resentment toward anyone who\'s ever wronged me.',
    ],
  },
};

DND_BACKGROUND_DATA.sage = {
  name: 'Sage',
  desc: 'You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interest you.',
  skillProficiencies: ['Arcana', 'History'],
  toolProficiencies: [],
  languages: 2,
  equipment: ['Bottle of black ink', 'Quill', 'Small knife', 'Letter from a dead colleague posing a question you haven\'t yet been able to answer', 'Common clothes', '10 gp'],
  feature: {
    name: 'Researcher',
    desc: 'When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually this information comes from a library, scriptorium, university, or a sage or other learned person or creature. You might need to do research and pay fees, but you can always find the information.',
  },
  suggestedCharacteristics: {
    personalityTraits: [
      'I use polysyllabic words that convey the impression of great erudition.',
      'I\'ve read every book in the world\'s greatest libraries—or I like to boast that I have.',
      'I\'m used to helping out those who aren\'t as smart as I am.',
      'There\'s nothing I like more than a good mystery.',
    ],
    ideals: [
      'Knowledge — The path to power and self-improvement is through knowledge.',
      'Beauty — What is beautiful points us beyond itself toward what is true.',
      'Logic — Emotions must not cloud our logical thinking.',
      'No Limits — Nothing should fetter the infinite possibility inherent in all existence.',
    ],
    bonds: [
      'It is my duty to protect my students.',
      'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.',
      'I work to preserve a library, university, scriptorium, or monastery.',
    ],
    flaws: [
      'I am easily distracted by the promise of information.',
      'Most people scream and run when they see a demon. I stop and take notes on its anatomy.',
      'Unlocking an ancient mystery is worth the price of a civilization.',
    ],
  },
};

DND_BACKGROUND_DATA.soldier = {
  name: 'Soldier',
  desc: 'War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, learned basic survival techniques, including how to stay alive on the battlefield.',
  skillProficiencies: ['Athletics', 'Intimidation'],
  toolProficiencies: ['One type of gaming set', 'Vehicles (land)'],
  languages: 0,
  equipment: ['Insignia of rank', 'Trophy taken from fallen enemy', 'Set of bone dice or deck of cards', 'Common clothes', '10 gp'],
  feature: {
    name: 'Military Rank',
    desc: 'You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use.',
  },
  suggestedCharacteristics: {
    personalityTraits: [
      'I\'m always polite and respectful.',
      'I\'m haunted by memories of war. I dream of the fallen.',
      'I\'ve lost too many friends, and I\'m slow to make new ones.',
      'I\'m full of inspiring and cautionary tales from my military experience.',
    ],
    ideals: [
      'Greater Good — Our lot is to lay down our lives in defense of others.',
      'Responsibility — I do what I must and obey just authority.',
      'Independence — When people follow orders blindly, they embrace a kind of tyranny.',
      'Might — In life as in war, the stronger force wins.',
    ],
    bonds: [
      'I would still lay down my life for the people I served with.',
      'Someone saved my life on the battlefield. To this day, I will never leave a friend behind.',
      'My honor is my life.',
    ],
    flaws: [
      'The monstrous enemy we faced in battle still leaves me quivering with fear.',
      'I have little respect for anyone who is not a proven warrior.',
      'I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.',
    ],
  },
};

DND_BACKGROUND_DATA.urchin = {
  name: 'Urchin',
  desc: 'You grew up on the streets alone, orphaned, and poor. You had no one to watch over you or to provide for you, so you learned to provide for yourself. You fought fiercely over food and kept a constant watch out for other desperate souls who might steal from you.',
  skillProficiencies: ['Sleight of Hand', 'Stealth'],
  toolProficiencies: ['Disguise kit', 'Thieves\' tools'],
  languages: 0,
  equipment: ['Small knife', 'Map of the city you grew up in', 'Pet mouse', 'Token to remember your parents by', 'Common clothes', '10 gp'],
  feature: {
    name: 'City Secrets',
    desc: 'You know the secret patterns and flows to cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.',
  },
  suggestedCharacteristics: {
    personalityTraits: [
      'I hide scraps of food and trinkets away in my pockets.',
      'I ask a lot of questions.',
      'I like to squeeze into small places where no one else can get to me.',
      'I sleep with my back to a wall or tree, with everything I own wrapped in a bundle in my arms.',
    ],
    ideals: [
      'Respect — All people, rich or poor, deserve respect.',
      'Community — We have to take care of each other.',
      'Change — The low are lifted up, and the high and mighty are brought down.',
      'Retribution — The rich need to be shown what life and death are like in the gutters.',
    ],
    bonds: [
      'My town or city is my home, and I\'ll fight to defend it.',
      'I sponsor an orphanage to keep others from enduring what I was forced to endure.',
      'I owe my survival to another urchin who taught me to live on the streets.',
    ],
    flaws: [
      'If I\'m outnumbered, I will run away from a fight.',
      'Gold seems like a lot of money to me, and I\'ll do just about anything for more of it.',
      'I will never fully trust anyone other than myself.',
    ],
  },
};

DND_BACKGROUND_DATA.hermit = {
  name: 'Hermit',
  desc: 'You lived in seclusion—either in a sheltered community such as a monastery, or entirely alone—for a formative part of your life. In your time apart from the clamor of society, you found quiet, solitude, and perhaps some of the answers you were looking for.',
  skillProficiencies: ['Medicine', 'Religion'],
  toolProficiencies: ['Herbalism kit'],
  languages: 1,
  equipment: ['Scroll case stuffed full of notes from studies/prayers', 'Winter blanket', 'Common clothes', 'Herbalism kit', '5 gp'],
  feature: {
    name: 'Discovery',
    desc: 'The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature. Work with your DM to determine the details of your discovery.',
  },
  suggestedCharacteristics: {
    personalityTraits: [
      'I\'ve been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.',
      'I am utterly serene, even in the face of disaster.',
      'The leader of my community had something to teach me, and I revere that person\'s memory.',
      'I connect everything that happens to me to a grand, cosmic plan.',
    ],
    ideals: [
      'Greater Good — My gifts are meant to be shared with all.',
      'Logic — Emotions must not cloud our sense of what is right and true.',
      'Free Thinking — Inquiry and curiosity are the pillars of progress.',
      'Self-Knowledge — If you know yourself, there\'s nothing left to know.',
    ],
    bonds: [
      'Nothing is more important than the other members of my hermitage, order, or association.',
      'I entered seclusion because I loved someone I could not have.',
      'My isolation gave me great insight into a great evil that only I can destroy.',
    ],
    flaws: [
      'Now that I\'ve returned to the world, I enjoy its delights a little too much.',
      'I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.',
      'I am dogmatic in my thoughts and philosophy.',
    ],
  },
};

DND_BACKGROUND_DATA.entertainer = {
  name: 'Entertainer',
  desc: 'You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetic lyrics, dances, sleight of hand, musical ability, or physical feats have brought you adulation and perhaps fortune.',
  skillProficiencies: ['Acrobatics', 'Performance'],
  toolProficiencies: ['Disguise kit', 'One type of musical instrument'],
  languages: 0,
  equipment: ['Musical instrument (one of your choice)', 'The favor of an admirer (love letter, lock of hair, trinket)', 'Costume', '15 gp'],
  feature: {
    name: 'By Popular Demand',
    desc: 'You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble\'s court. You receive free lodging and food of a modest or comfortable standard (depending on quality of establishment) as long as you perform each night. Your performance makes you something of a local figure.',
  },
  variants: ['Gladiator — you performed in arenas; your weapon is your musical instrument'],
  suggestedCharacteristics: {
    personalityTraits: [
      'I know a story relevant to almost every situation.',
      'Whenever I come to a new place, I collect local rumors and spread gossip.',
      'I\'m a hopeless romantic, always searching for that special someone.',
      'Nobody stays angry at me or around me for long.',
    ],
    ideals: [
      'Beauty — When I perform, I make the world better than it was.',
      'Tradition — The stories, legends, and songs of the past must never be forgotten.',
      'Creativity — The world is in need of new ideas and bold action.',
      'Greed — I\'m only in it for the money and fame.',
    ],
    bonds: [
      'My instrument is my most treasured possession, and it reminds me of someone I love.',
      'Someone stole my precious instrument, and someday I\'ll get it back.',
      'I want to be famous, whatever it takes.',
    ],
    flaws: [
      'I\'ll do anything to win fame and renown.',
      'I\'m a sucker for a pretty face.',
      'A scandal prevents me from ever going home again.',
    ],
  },
};
