import { Icons } from "../../Utils/Dynamic/RankIcons";

export const ranksData = [
    {
        nr: 1,
        name: "Obywatel",
        xp: "0 Reputacji",
        icon: Icons.rank1,
        color: "bg-slate-500",
    },
    {
        nr: 2,
        name: "Działacz Lokalny",
        xp: "500 Reputacji",
        icon: Icons.rank2,
        color: "bg-green-500",
    },
    {
        nr: 3,
        name: "Radny Społeczny",
        xp: "1 500 Reputacji",
        icon: Icons.rank3,
        color: "bg-teal-500",
    },
    {
        nr: 4,
        name: "Analityk Sejmowy",
        xp: "3 000 Reputacji",
        icon: Icons.rank4,
        color: "bg-blue-500",
    },
    {
        nr: 5,
        name: "Komisarz Obywatelski",
        xp: "6 000 Reputacji",
        icon: Icons.rank5,
        color: "bg-indigo-500",
    },
    {
        nr: 6,
        name: "Strażnik Demokracji",
        xp: "10 000 Reputacji",
        icon: Icons.rank6,
        color: "bg-purple-500",
    },
    {
        nr: 7,
        name: "Ekspert Legislacyjny",
        xp: "16 000 Reputacji",
        icon: Icons.rank7,
        color: "bg-fuchsia-500",
    },
    {
        nr: 8,
        name: "Obserwator Państwowy",
        xp: "25 000 Reputacji",
        icon: Icons.rank8,
        color: "bg-pink-500",
    },
    {
        nr: 9,
        name: "Marszałek Debaty",
        xp: "40 000 Reputacji",
        icon: Icons.rank9,
        color: "bg-amber-500",
    },
    {
        nr: 10,
        name: "Architekt Demokracji",
        xp: "65 000 Reputacji",
        icon: Icons.rank10,
        color: "bg-red-500",
    },
];
export const reputationSources = [
    {
        title: "Wypełnianie Ankiet",
        desc: "Zdobywaj reputację za aktywność obywatelską i udział w ankietach.",
        val: "+50 Reputacji",
    },

    {
        title: "Serie Logowań",
        desc: "Codzienna aktywność zwiększa Twoją reputację.",
        val: "+10 / +25 Reputacji",
    },

    {
        title: "Odblokowywanie Osiągnięć",
        desc: "Zdobywaj specjalne osiągniecia.",
        val: "+25-500 Reputacji",
    },
];

export const RARITIES = [
    { slug: "all", name: "Wszystkie", color: "text-slate-500" },
    { slug: "common", name: "Zwykłe", color: "text-slate-500" },
    { slug: "rare", name: "Rzadkie", color: "text-blue-500" },
    { slug: "epic", name: "Epickie", color: "text-purple-500" },
    { slug: "legendary", name: "Legendarne", color: "text-yellow-500" }
];