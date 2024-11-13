---
title: Composable Energy Based Models Study Notes
description: how well can EBMs learn representations?
date: 2024-11-12
scheduled: 2024-11-12
tags: Coming Soon
layout: layouts/post.njk
image: /blog/img/remote/water-splash.jpg
---

## Key Concepts
- Energy Functions
- Partition Functions
- Gradient Descent and Optimization
- Markov Chain Monte Carlo

| Concept | Description |
|---------|-------------|
| Energy Function | A scalar function that assigns low values to likely configurations and high values to unlikely ones |
| Partition Function | Normalizing constant Z that ensures probability distribution sums/integrates to 1 |
| Gradient Descent | Optimization method used to find local minima of energy function during inference |
| MCMC | Sampling method used to approximate expectations and generate samples from model |


## Overview
Instead of regressing input x to output y, <mark>energy based models</mark> predict whether a certain pair or configuration of variables fit together. Energy functions assign low energy to likely configurations and high energy to unlikely ones.

## Definitions
$\mathcal{F}: \mathcal{X} \times \mathcal{Y} \rightarrow \mathbb{R}$
- $\mathcal{F}(x,y)$: describes the level of dependency between x and y

Inference:
- $\check{y} = \arg\min_y \mathcal{F}(x,y)$

Energy function (used in inference not training):
- It needs to be smooth and differentiable to perform gradient-based method for inference

SIDE NOTE: Graphical models' energy function decomposes as _a sum of energy terms_, each of which accounts a subset of variables.

EBM with latent variables

y depends on x as well as an extra variable z (the latent variable).
These latent variables can provide auxiliary information.

### Inference
Minimize the energy function simulataneously over y and z:
- $\check{y}, \check{z} = \arg\min_{y,z} E(x,y,z)$

which is equivalent to:

$\Rightarrow F_{\infty}(x,y) = \arg\min_z E(x,y,z)$

$\Rightarrow F_{\beta}(x,y) = -\frac{1}{\beta} \log \int_z \exp(-\beta E(x,y,z))$

when $\ \beta \rightarrow \infty$, $\ \check{y}= \arg\min_y F(x,y)$

Another advantage:
- By varying the latent variable over a set, we can make the prediction output $y$ vary over the manifold of possible predictions as well: $F(x,y) = \arg\min_zE(x,y,z)$


### Training
Constraints:
1. $P(x) \geq 0 \ $ is non-negative

2. $\sum_x P(x) = 1 \ $ OR $\ \int_x P(x) dx = 1 \ $ if continuous is normalized

## Applications
1. Video prediction


## Energy-Based Models (EBMs)
Energy-Based Models (EBMs) are a class of machine learning models that learn an energy function E(x) to assign low energy to inputs from the data distribution and high energy to others. Key features include:

- **_Implicit Generation_**: Samples are generated implicitly through MCMC sampling from the energy function, rather than explicitly by a generator network
- **_Compositionality_**: EBMs can combine multiple energy functions to satisfy multiple constraints or goals
- **_Flexibility_**: EBMs can represent a wide range of probability distributions and can be applied to various types of data

## Composable Energy Landscapes
Composable Energy Landscapes provide a framework for constructing models that generalize by composing multiple energy landscapes. This approach allows for:

- **Zero-Shot Generalization**: The ability to generalize to new distributions by composing learned energy landscapes without additional training
- **Energy Function E_θ(x, y)**: Assigns low energy to accurate predictions, enabling prediction as a search process on the energy landscape

## Mathematical Foundations

### Energy Function and Boltzmann Distribution
The energy function is central to EBMs, with prediction formulated as finding the label y that minimizes the energy:

y = argmin_y E_θ(x,y)

The Boltzmann distribution is used for sampling predictions:

y ~ p(x,y) ∝ e^(-E_θ(x,y))

### Training Objectives
The primary training objective for EBMs is the Negative Log-Likelihood (NLL):

L_NLL(D) = E_z~D[E_θ(z)] + log∫e^(-E_θ(z))dz

The gradient of the NLL is given by:

∇_θL_NLL(D) = E_z~D[∇_θE_θ(z)] - E_z~p_θ(z)[∇_θE_θ(z)]

## Training and Sampling Techniques

### Maximum Likelihood Estimation (MLE)
MLE is used to minimize the negative log-likelihood:

L_NLL(D) = E_z~D[E_θ(z)] - E_z~p_θ(z)[E_θ(z)]

### Langevin Dynamics
Langevin dynamics is a gradient-based MCMC method used for sampling:

z_t = z_(t-1) - λ∇_zE_θ(z_(t-1)) + √(2λ)ξ, ξ ~ N(0,1)

### Replay Buffer
A replay buffer is used to maintain past samples, improving mixing and sample diversity.

## Compositional Modeling

### Logical and Probability Composition
EBMs allow for logical composition of energy landscapes to model complex distributions. Probability distributions can be combined through products, mixtures, and inverses.

### Graphical and Hierarchical Models
EBMs can implement undirected and directed graphical models compositionally. They also enable hierarchical composition, combining language, video, and action models for complex planning tasks.

## Applications
EBMs and composable energy landscapes have diverse applications:

- **Vision**: Scene understanding, image generation and editing, domain adaptation
- **Robotics**: Planning and constraint satisfaction problems
- **Foundation Models**: Vision-question answering and hierarchical planning

## Observations and Experiment Results

- **Generalization**: Compositional models show strong generalization to unseen data distributions
- **Efficiency**: These models often require fewer parameters and less data
- **Flexibility**: They allow for the incorporation of new constraints at prediction time

## Tutorials and Practical Tips

- Apply regularization to ensure energy landscapes are not too sharp
- Learn sequences of energy landscapes for high-dimensional inputs (annealed energy landscapes)

## Future Directions

- **Inverse Design**: Apply composable energy landscapes to inverse material design and protein synthesis
- **Broader Applications**: Explore applications in sciences and engineering
- **Scalability**: Develop techniques to scale energy landscape learning to more complex and high-dimensional data
