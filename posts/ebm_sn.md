---
title: Composable Energy Based Models Study Notes
description: how well can EBMs learn representations?
date: 2024-11-12
scheduled: 2024-11-12
tags: Coming Soon
layout: layouts/post.njk
image: /blog/img/remote/water-splash.jpg
---

### Key Concepts
| Concept | Description |
|---------|-------------|
| Energy Function | A scalar function that assigns low values to likely configurations and high values to unlikely ones |
| Partition Function | Normalizing constant Z that ensures probability distribution sums/integrates to 1 |
| Gradient Descent | Optimization method used to find local minima of energy function during inference |
| MCMC | Sampling method used to approximate expectations and generate samples from model |

### EBM Overview
<mark>Energy based models</mark> predict compatibility between variable configurations rather than direct input-output mappings. The core idea is that energy functions assign low energy to likely configurations and high energy to unlikely ones.

Key features:

- **_Implicit Generation_**: Sample generation via MCMC from energy function
- **_Compositionality_**: Multiple energy functions can be combined
- **_Flexibility_**: Can model diverse probability distributions and data types

### Math Foundations

#### Energy Functions and Probability

1. Energy Function Mapping:
   - Domain: Configurations in $\mathcal{X} \times \mathcal{Y}$
   - Range: Real numbers $\mathbb{R}$
   - Formal notation: $\mathcal{F}: \mathcal{X} \times \mathcal{Y} \rightarrow \mathbb{R}$

2. Prediction Process:
   - Goal: Find minimum energy configurations
   - Formula: $\check{y} = \arg\min_y \mathcal{F}(x,y)$

3. Probability Connection:
   - Via Boltzmann distribution
   - Formula: $y \sim p(x,y) \propto e^{-E_{\theta}(x,y)}$

### Training Objectives

| Component | Formula |
|-----------|---------|
| NLL Loss | $L_NLL(D) = E_z~D[E_{\theta}(z)] + \log \int e^{-E_{\theta}(z)} dz$ |
| Gradient | $\nabla_{\theta} L_NLL(D) = E_z~D[\nabla_{\theta} E_{\theta}(z)] - E_z~p_{\theta}(z)[\nabla_{\theta} E_{\theta}(z)]$ |

### Latent Variable Models

Step 1: Joint Optimization
- Variables: z (latent), x (input), y (output)
- Formula: $\check{y}, \check{z} = \arg\min_{y,z} E(x,y,z)$

Step 2: Free Energy Formulation
- Definition: $F_{\beta}(x,y) = -\frac{1}{\beta} \log \int_z \exp(-\beta E(x,y,z))$

Step 3: Limiting Behavior ($\beta \rightarrow \infty$)
- Energy: $F_{\infty}(x,y) = \arg\min_z E(x,y,z)$
- Prediction: $\check{y} = \arg\min_y F(x,y)$

### Training and Sampling

#### Maximum Likelihood Training
MLE objective:

- $L_NLL(D) = E_z~D[E_{\theta}(z)] - E_z~p_{\theta}(z)[E_{\theta}(z)]$

#### Langevin Dynamics Sampling
Update rule:

- $z_t = z_{t-1} - λ \nabla_z E_{\theta}(z_{t-1}) + \sqrt{2λ} \xi, \xi \sim N(0,1)$

#### Practical Considerations
- Use replay buffers to improve sample diversity
- Apply regularization to smooth energy landscapes
- Consider annealed landscapes for high-dimensional problems

### Compositional Modeling

#### Model Composition
- Logical composition of energy landscapes
- Probability combinations via products and mixtures
- Hierarchical composition for complex tasks

### Applications
- Computer Vision: Scene understanding, image generation
- Robotics: Planning, constraint satisfaction
- Foundation Models: Vision-language tasks, hierarchical planning
- Scientific Applications: Inverse design, protein synthesis

### Future Directions
- Scale to more complex data distributions
- Develop improved sampling techniques
- Expand applications in sciences and engineering
- Enhance zero-shot generalization capabilities
