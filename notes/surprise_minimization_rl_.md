---
title: Surprise Minimizing Reinforcement Learning Study Notes
description: are surprise and curiosity all we need?
date: 2024-11-13
scheduled: 2024-12-13
tags: notes
layout: layouts/post.njk
image: /blog/img/remote/water-splash.jpg
---
Reading notes for [SMiRL: Surprise Minimizing Reinforcement Learning in Unstable Environments](https://arxiv.org/abs/1912.05510)


### 1 SMiRL Objectives
- Estimate entropy over visited states
- Expensive to estimate this entrpoy
- Keep a running estimate of the visited states $\theta_t$
- Update the estimate after each new state


$$\theta_t \leftarrow \argmax_\theta \sum^t_{t^{\prime}=0} \log p_\theta(s_{t^{\prime}})$$

- $\theta_t$ is a sufficient statistics of the state history
- Condition the policy on $\theta_t$
$$\pi_\phi(a_t|s_t, \theta_t)$$
- Produces a stationary MDP with reward
$$r_t \leftarrow \log p_{\theta_{t-1}}(s_t)$$

 - [ ] Is it possible to model surprise as a energy landscape? So it would be composable and extendable to add new objectives like curiosity?

Use representation learning to model surprise like VAE encoder to model latent state distribution. And SMiRL can minimize the entropy of the latent state distribution.


- SMiRL is not the opposite of curiosity.
- Curiosity can help SMiRL to find better surprise minimizing policies.



