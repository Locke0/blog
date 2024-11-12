---
title: Energy Based Models Study Notes
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

## Overview
Instead of regressing input x to output y, energy based models predict whether a certain pair of  fit together.

## Definition
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