const maps = [
    {
        id: 1,
        name: 'Rosewater Park',
        area: 'Silent Hill — Lakeshore',
        order_num: 1,
        description: 'The first zone James enters after parking at the Toluca Lake rest stop. A foggy lakeside park where Angela is first encountered and Maria emerges from the mist. Pyramid Head appears here in a brief, terrifying glimpse through an iron grate gate before vanishing.',
        // SH2RE Steam Gallery screenshot – foggy exterior shot
        image_url: 'https://static.wikia.nocookie.net/silent/images/1/1e/SH2RE_SteamGallery_1.jpg/revision/latest?cb=20240531000125',
    },
    {
        id: 2,
        name: 'Woodside Apartments',
        area: 'Silent Hill — Residential',
        order_num: 2,
        description: 'A crumbling residential complex where James begins his search in earnest. Mannequins and Lying Figures stalk its dark hallways. Pyramid Head makes his full debut in a nightmarish locked room — beyond a grate, he brutalizes two Mannequins in a scene designed to provoke revulsion, not just fear.',
        image_url: 'https://static.wikia.nocookie.net/silent/images/0/09/SH2RE_SteamGallery_2.jpg/revision/latest?cb=20240531000129',
    },
    {
        id: 3,
        name: 'Blue Creek Apartments',
        area: 'Silent Hill — Residential',
        order_num: 3,
        description: 'Connected to Woodside via a subterranean laundry passage. Darker, more labyrinthine, and home to increasingly hostile creatures. A second encounter with Eddie takes place here, and the path descends further into the apartment district.',
        image_url: 'https://static.wikia.nocookie.net/silent/images/9/9c/SH2RE_SteamGallery_3.jpg/revision/latest?cb=20240531000127',
    },
    {
        id: 4,
        name: 'Brookhaven Hospital',
        area: 'Silent Hill — Medical District',
        order_num: 4,
        description: 'An abandoned hospital overrun by grotesque, sensuous nurses and larger monstrosities. The setting of Mary\'s long illness. Angela\'s confrontation with her trauma — and her monster, Abstract Daddy — occurs in the Otherworld beneath the hospital. The second Pyramid Head battle takes place in the flooded basement.',
        image_url: 'https://static.wikia.nocookie.net/silent/images/2/28/SH2RE_SteamGallery_4.jpg/revision/latest?cb=20240531000137',
    },
    {
        id: 5,
        name: 'Silent Hill Historical Society',
        area: 'Silent Hill — Town Center',
        order_num: 5,
        description: 'A seemingly ordinary building that conceals a vertical shaft descending deep underground. The transition point into the Labyrinth. The Historical Society\'s innocuous exterior is the last normal thing James will see for a long time.',
        image_url: 'https://static.wikia.nocookie.net/silent/images/4/4c/SH2RHistoricalSociety.jpeg/revision/latest?cb=20240918155814',
    },
    {
        id: 6,
        name: 'The Labyrinth',
        area: 'Underground',
        order_num: 6,
        description: 'A disorienting underground prison of narrow corridors, cage cells, and flooded passages. Pyramid Head\'s domain. James encounters Eddie here for the last time, and confronts the truth about what happened in the prison at its heart. The Labyrinth feels inescapable by design.',
        image_url: 'https://static.wikia.nocookie.net/silent/images/3/37/SH2R_-_A_hole_in_the_prison.jpg/revision/latest?cb=20241014003735',
    },
    {
        id: 7,
        name: 'Toluca Lake',
        area: 'Silent Hill — The Lake',
        order_num: 7,
        description: 'The dark water at the heart of everything. James crosses it alone by motorboat, guided only by a tattered map. The lake\'s surface is impossibly still. No light reflects on it. On the far shore, through the fog, the silhouette of the Lakeview Hotel waits.',
        image_url: 'https://static.wikia.nocookie.net/silent/images/1/10/SH2R_-_Boat_on_Toluca_Lake.png/revision/latest?cb=20241117090158',
    },
    {
        id: 8,
        name: 'Lakeview Hotel',
        area: 'Silent Hill — Lakeside',
        order_num: 8,
        description: 'A once-luxurious hotel now decayed and warped by time. James and Mary\'s "special place." The final act of the game unfolds across its beautiful decay — a video tape in Room 312 contains the truth James has spent the entire game avoiding. The hotel shifts into the Otherworld for the final encounters.',
        image_url: 'https://static.wikia.nocookie.net/silent/images/d/d5/SH2RE_SteamGallery_5.jpg/revision/latest?cb=20240531000130',
    },
];

module.exports = maps;
