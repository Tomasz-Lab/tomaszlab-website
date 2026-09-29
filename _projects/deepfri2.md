---
layout: project
title: "deepFRI2"
description: "Sequence and structure-based protein function prediction method."
tech_stack:
  [
    "function prediction",
    "GO",
    "sequence",
    "structure",
    "deep learning"
  ]
github_url: "https://github.com/TomaszLab/deepFRI2"
stack: Function prediction methods
image: "/assets/images/projects/fryingpan2.png"
sequence: 1
gadget_no: 17
---

deepFRI2 is an upgraded version of the well-established [deepFRI](https://www.nature.com/articles/s41467-021-23303-9) (*Deep Functional Residue Identification*) framework for predicting protein function using [Gene Ontology](https://geneontology.org/) (GO) terms and [Enzyme Commission](https://enzyme.expasy.org/) (EC) numbers.

Like its predecessor, deepFRI2 operates in two complementary modes: sequence-based and sequence–structure-based. This dual approach enables robust functional inference in metagenomic settings — where protein structures are often unavailable — as well as structure-informed functional annotation when structural information is available.

For training, deepFRI2 leverages [FRIData](https://github.com/Tomasz-Lab/FRIdata), a scalable and efficient library for generating large, non-redundant protein datasets.

While maintaining similar input and output formats, the model architecture has been completely redesigned to incorporate recent advances in the field, particularly the use of protein language models as powerful representations of protein sequences. It consists of two submodules: sequence analyzer (utilizing ESM embeddings and lightweight attention pooling) and structural prober (processing distograms with shallow convolutional network). Signals from both models are merged using an ESM-conditioned gating mechanism. deepFRI2 outputs sequence-, structure-, and fusion-based predictions for each ontology (MF, CC, BP). The architecture is intentionally simple yet robust, enabling accurate functional annotation while maintaining high scalability and interpretability.