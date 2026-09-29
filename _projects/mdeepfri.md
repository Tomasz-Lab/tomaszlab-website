---
layout: project
title: "mDeepFRI"
description: "Metagenomic-DeepFRI is a high-performance pipeline for annotating protein sequences with Gene Ontology (GO) terms using DeepFRI."
tech_stack:
  [
    "metagenomics",
    "function prediction",
    "GO",
    "sequence",
    "structure"
  ]
github_url: "https://github.com/TomaszLab/Metagenomic-DeepFRI"
image: "/assets/images/projects/fryingpan.png"
sequence: 1
gadget_no: 17
---

*A pipeline for annotation of genes with [DeepFRI](https://github.com/flatironinstitute/DeepFRI),
a deep learning model for functional protein annotation with
[Gene Ontology (GO) terms](https://geneontology.org/docs/go-annotations/) and
mapping to [Cluster of Orthologous Groups (COG)](https://www.ncbi.nlm.nih.gov/research/cog) categories.
It incorporates [FoldComp](https://github.com/steineggerlab/foldcomp)
databases of predicted protein structures for fast annotation of
metagenomic gene catalogues.*

## 🔍 Overview

Metagenomic-DeepFRI is a high-performance pipeline for
annotating protein sequences with Gene Ontology (GO) terms using
[DeepFRI](https://github.com/flatironinstitute/DeepFRI),
a deep learning model for functional protein annotation.

Protein function prediction is increasingly important
as sequencing technologies generate vast numbers of novel sequences.
Metagenomic-DeepFRI combines:

- **Structure information** from FoldComp databases (AlphaFold, ESMFold, PDB, etc.)
- **Sequence-based predictions** using DeepFRI's neural networks
- **Fast searches** with MMseqs2 for database alignment
- **Significant speedup** of
[2-12×](https://github.com/Tomasz-Lab/Metagenomic-DeepFRI/blob/main/weight_convert/onnx_vs_tf2.png)
compared to standard DeepFRI implementation.

### 📋 Pipeline stages

1. Search proteins similar to query in PDB and supply `FoldComp` databases
with `MMseqs2`.
2. Find the best alignment among `MMseqs2` hits using `PyOpal`.
3. Align target protein contact map to query protein with unknown structure.
4. Run `DeepFRI` with the structure if found in the database, otherwise run
`DeepFRI` with sequence only.
