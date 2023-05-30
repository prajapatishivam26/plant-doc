const app_config = {
    apiUrl: 'http://localhost:5000',
    modelPath: '/AImodels',
    cureData: [
        {
            diseaseName: 'peach bacterial spot',
            cure: {
                image : 'https://www.growingproduce.com/wp-content/uploads/2015/05/bacterial-spot-on-peach-leaf.jpg',
                heading: 'Peach Bacterial Spot',
                summary: 'Bacterial spot is an important disease of peaches, nectarines, apricots, and plums caused by Xanthomonas campestris pv. pruni. Symptoms of this disease include fruit spots, leaf spots, and twig cankers. Fruit symptoms include pitting, cracking, gumming, and watersoaked tissue, which can make the fruit more susceptible to brown rot, rhizopus, and other fungal infections. Severe leaf spot infections can cause early defoliation. Severe defoliation can result in reduced fruit size, and sunburn and cracking of fruit. Early defoliated trees are reduced in vigor and winter hardiness. Fruit symptoms of bacterial spot may be confused with peach scab, caused by the fungus Cladosporium carpophyllium, however scab spots are more circular, have a dark brown/greenish, fuzzy appearance, and do not pit the fruit surface, although skin cracking can occur. Scab does not cause leaf symptoms but can cause spots on twigs. Initial fruit spots of bacterial spot may be superficial but develop into craters.',
            },
            itemId: '6476076e2032483d324773e6'
        }
    ]
};

export default app_config;