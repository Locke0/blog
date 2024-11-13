---
title: Composable Energy Based Models Study Notes
description: how well can EBMs learn representations?
date: 2024-11-13
scheduled: 2024-12-13
tags: Coming Soon
layout: layouts/post.njk
image: /blog/img/remote/water-splash.jpg
---
Reading notes for [Surprise Minimization in Reinforcement Learning](https://arxiv.org/abs/1912.05510)


### 1 SMiRL Objectives
- Estimate entropy over visited states
- Expensive to estimate this entrpoy
- Keep a running estimate of the visited states $\theta_t$
- Update the estimate after each new state


$$\theta_t \leftarrow \argmax_\theta \sum^t_{t^{\prime}=0} \log p_\theta(s_{t^{\prime}})$$

- $\theta_t$ is a sufficient statistics of the state history
- Condition the policy on $\theta_t$
$$\pi_\phi(a_t|s_t, \theta_t)$$
- Produces a stationary MDP with reward $r_t \leftarrow \log p_{\theta(t-1)}(s_t)$


