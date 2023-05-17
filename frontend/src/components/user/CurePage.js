import React from "react";

const CurePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://cdn.kibrispdr.org/data/12/background-plang-14.jpg")',
      }}
    >
      <div className="container">
        <div className="card">
          <div className="card-body">
          <img
            className=""
            style={{ display: "block", margin: "auto" }}
            src="/peach-leaf.jpg"
            alt=""
          />
          <h1 className="mb-4 text-success text-center fw-bold">
            Management of bacterial Spot on Peach Plant
          </h1>
          <div className="row">
            <div className=""></div>
            <div className="col-md-12">
              <p className="h4">
                Bacterial spot is an important disease of peaches, nectarines,
                apricots, and plums caused by Xanthomonas campestris pv. pruni.
                Symptoms of this disease include fruit spots, leaf spots, and
                twig cankers. Fruit symptoms include pitting, cracking, gumming,
                and watersoaked tissue, which can make the fruit more
                susceptible to brown rot, rhizopus, and other fungal infections.
                Severe leaf spot infections can cause early defoliation. Severe
                defoliation can result in reduced fruit size, and sunburn and
                cracking of fruit. Early defoliated trees are reduced in vigor
                and winter hardiness. Fruit symptoms of bacterial spot may be
                confused with peach scab, caused by the fungus Cladosporium
                carpophyllium, however scab spots are more circular, have a dark
                brown/greenish, fuzzy appearance, and do not pit the fruit
                surface, although skin cracking can occur. Scab does not cause
                leaf symptoms but can cause spots on twigs. Initial fruit spots
                of bacterial spot may be superficial but develop into craters.
                Leaf symptoms of bacterial spot on peaches and nectarines are
                generally dark, small lesions, often clustered at the leaf tip
                where water collects during dews and rain. Leaf tissue around
                lesions can turn yellow. The pathogen overwinters in dark, gummy
                branch tips, and diseased twigs. Removal of gummy tissue during
                spring pruning may help to reduce inoculum levels. Bacterial
                spot symptoms on leaves generally are not seen until after bloom
                but onset can occur earlier if conditions are highly favorable.
                Fruit are very susceptible when exposed after shuck split and
                the susceptibility goes down after pit hardening in mid- to late
                June. However, a high amount of leaf infection and warm wet
                conditions can cause the continuation of fruit infections after
                pit hardening. A few weeks before harvest, fruit become more
                susceptible to bacterial spot infection, however, symptoms are
                more superficial.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurePage;
