---
title: SpikeGPT Study Notes
description: Bio-inspired SNN + Transformer?
date: 2024-11-13
scheduled: 2024-12-13
tags: Coming Soon
layout: layouts/post.njk
image: /blog/img/remote/water-splash.jpg
---

- [ ] Compatibility between RWKV and LNNs? STDP and LNNs, SMiRL with LNNs?

RWKV Unit with MatMul-free Language Model.

RWKV unit can serve as an intermediate representation between contextual embedding model and the routine tracking layer?

RWKV for Long-Range Routine Modeling and Context Integration

  - Routine Recognition: Use RWKV to balance long-range dependencies in work sessions, capturing both immediate and past information for stable routine reinforcement?
  - Surprise-Driven Memory Reset: In cases of significant deviation (high surprise), RWKV’s receptance mechanism can reset memory, allowing the system to learn new routines and detect emerging patterns?

<!-- !Research STDP and double check this -->

STDP adjusts weights based on the timing difference between pre-synaptic and post-synaptic spikes. To model this with LNNs, we can define a state-based palsticity rule that relies on time-based state adjustments rather than explicit weight updates.

1. Time-Based State Plasticity:
   - Define a time-based state $\Delta h_t$ that responds to surprise, adjusting the state based on routine deviation.
   - We can mimic the STDP process by making $\Delta h_t$ a function of the surprise level $S$:

      $$\Delta h_t = f(S) \cdot (x_t - h_t)$$

2. Adaptive Routine Learning with Surprise Detection

- When $S$ is low $\rightarrow$ $h_t$ remains close to $x_t$, stabilizing the routine response


Lessons for Spiking Neural Networks:
1. Treating SNNs as state-space models: linear recurrence is critical
2. Forget gates are essential for handling memory-limited state variables


Lessons for Linear RNNs
1. Static sparsity seems easier to deal with than dynamic sparsity
2. Forget gates are eseential for handling memory-limited state variables



LFMs
- Liquid Time-Constant Units
- Deep Signal Processing Layers - performs operations akin to Fourier Transforms and wavelet transforms, enabling hte model to capture frequency information effectively
$$[
y = F^{-1}(F(x) \odot W)
]$$


where ( F ) represents the Fourier transform, ( \odot ) denotes element-wise multiplication, and ( W ) is a learnable weight matrix.

State-Space Models
- State Transition Equations
$$[
s_t = f(s_{t-1}, x_t)
]$$

Here, ( s_t ) is the state at time t, ( f ) is a function that updates the state given the previous state and current input, and ( x_t ) is the input at time t.

- Observation Equations
$$
    [
    y_t = g(s_t)
    ]
$$
Here, ( y_t ) is the observation at time t, and ( g ) is a function that maps the state to the output.


