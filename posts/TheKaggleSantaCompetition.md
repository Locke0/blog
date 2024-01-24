---
title: Solve the Kaggle Santa Puzzle
description: as a beginner...🤔
date: 2024-01-20
scheduled: 2024-01-20
tags: PROJECT | In progress
layout: layouts/post.njk
---

Ok! Let’s try to solve the $25,000 Kaggle Competition: Santa 2023 — The Polytope Permutation Puzzle today…as a beginner.

Some context, I have little experience with Kaggle competitions. In fact, this will be the 2nd Kaggle competition I’m participating with the first one being the infamous Titan Challenge. So I’m literally a noob 🤷 (Sorry about the click bait. Oh well, I didn’t win). However, I have been really wanting to get into Kaggle more and get better at deep learning. This is why I’m writing this blog with the intention of showing how I approached a problem in a new or unfamiliar knowledge domain in term of navigating, researching, learning and problem solving. 

Alright, let’s dive in 😤!

## 1 Overview

### 1.1 Problem

First, you have to do some research and understand the problem. Starting with the Overview page, here is what I gathered:

- **The Problem**: solve **cube-like** puzzles in the ************fewest************ moves
    - Permutation puzzle: comprises
        - solution state
        - initial state
        - colors whose arrangements make up states
        - a set of allowed moves
        - The resulting state may differ up to the puzzle’s `num_wildcards`
        - The **************************overall score************************** is the total number of moves in all of its puzzle solutions (fewest moves)
- **Submission file format:**
    - $\textrm{For each id, the moves} \in \textrm{allowed moves}$
    
    ```python
    id,moves
    0,r1.-f1
    1,f1.d0.-r0.-f1.-d0.-f1.d0.-r0.f0
    2,f1.d0.-d1.r0.-d1.-f0.f1.-r0.-f0
    ```
    

So basically, you have to figure out the transitions between 2 states and each state is a matrix of numbers. Ok, let’s briefly take a look at the dataset.

### 1.2 Dataset

First, I looked at the 

- **puzzle_info.csv:**
    - `puzzle_type`
    - `allowed_move` - Each move represents a permutation given in array form
    
    Basically, this file stores what moves are allowed for each puzzle type.
    
- ****************puzzle.csv****************
    - `id`
    - `puzzle_type`
    - `solution_state` - “colors” separated by `;` (e.g. a 2 by 2 by 2 cube would have  $4*6 = 24$ elements)
    - `initial_state` - an arrangement of colors describing the initial statecd cd
    - `num_wildcards` - so, nums of difference allowed in the final state (it doesn’t have to be exactly the required final state)
- **sample_submission.csv**
    - `id`
    - `moves`
    
    This just shows the moves from allowed_moves associated with each puzzle type
    

### 1.3 First Impression Insights

Ok! Now let’s digest all that info and redefine our problem/objective to:

> *Minimize the number of transitions taken to get from state A to state B*.
> 

When the problem is presented this way, we can start breaking down the problem into smaller components and steps

**First**, we should probably find the proper data structures to store *states* and *transitions* since the given array or string forms might *not* be the most convenient for modeling the $state \rightarrow transition \rightarrow state$ process/relation. From what I remember from my experience in robotics, maybe states can be represented as matrices instead of the given array form.

**However**, I am still not sure about how to implement the specifics. So, let’s do more research and see what discussions and solutions others have shared online. I started looking at the Code, Discussion page of the competition, YouTube, and Google. 

## 2 “Literature Review”

### **2.1 A Basic Tutorial  — [Getting Started with Santa 2023](https://www.kaggle.com/code/ryanholbrook/getting-started-with-santa-2023).**

This tutorial covers the basics. I’m glad I took a look at the Code page and this would save me some time. Specifically, it shows:

- How to *import* and *parse* the `puzzle_info` and `puzzles` into proper formats from corresponding files using pandas.
- How to *represent* the puzzle states with `numpy.array`
- How to *represent* the moves with `Permutation` from the `sympy.combinatorics` — I had never used it before. If you want to learn more, here is its [documentation page](https://docs.sympy.org/latest/modules/combinatorics/permutations.html)
- 💡 **Key Takeaways**
    
    > 1. Data Structure — `Permutation`
    > 
    > - [DEFINITION] — The sympy permutation uses the **indices** of the elements in the original ordering of the elements in the array instead of the elements themselves.
    > - [COMPOSITION] — Permutation takes a 2-line form: `[0 1 2 ... n-1] [p(0) p(1) p(2) ... p(n-1)]`, where `p(i) = i^p`. The composite of 2 permutations `p*q` is the same as `i^(p*q) = i^p^q` (with Python’s precedence rule)
    > - [DISJOINT CYCLE NOTATION] **—** [1, 3, 2, 0] represented as (0, 1, 3)(2) meaning 0 → 1 → 3 and 2 stays where it is.
    > 
    > Examples of how permutation can be used in our case:
    > 
    > ```python
    > solution_state = ['R', 'G', 'B']
    > initial_state = ['B', 'G', 'R']
    > moves = {
    >     'r': [1, 2, 0],
    >     's': [1, 0, 2],
    > }
    > move_r = moves['r'] # 0->1, 1->2, 2->0
    > move_rp = Permutation(move_r)
    > initial_state_np = np.asarray(initial_state)
    > 
    > # after move_r
    > resulting_state = move_rp(initial_state_np)
    > 
    > # ways to inverse moves
    > # array form, because the elements in r is target location
    > # the orignal locations of the state are labeled as
    > # 0, 1, 2, ... by default
    > move_r_inv = np.argsort(move_r).tolist()
    > # Permutation form, more clear to me personally
    > move_rp_inv = move_rp ** -1
    > ```
    > 
    
    > 2. Array vs Permutation — The permutation approach is NOT ONLY cleaner and more intuitive for representing the transitions and states, it also seems to be twice faster according to my profiling:
    > 
    > 
    > ```python
    > def array_func(initial_state, moves):
    >   count = 0
    >   r = moves['r']
    >   s = moves['s']
    >   r_inv = np.argsort(r).tolist()
    > 
    >   while count < 100000:
    >     state = np.asarray(initial_state)
    >     state = state[s]
    >     state = state[r_inv]
    >     state = state.tolist()
    >     count += 1
    > 
    > def per_func(initial_state, moves):
    >   count = 0
    >   r = moves['r']
    >   s = moves['s']
    >   rp = Permutation(r)
    >   sp = Permutation(s)
    >   rp_inv = rp ** -1
    > 
    >   while count < 100000:
    >     state = sp(initial_state)
    >     state = rp_inv(state)
    >     count += 1
    > ```
    > 
    > - Outputs:
    > 
    > ```python
    > %timeit array_func(initial_state, moves)
    > # OUTPUT: 595 ms ± 99.1 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
    > 
    > %timeit per_func(initial_state, moves)
    > # OUTPUT: 306 ms ± 4.5 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
    > ```
    > 
    
    > 3. The 3 Puzzle Types — Cube, Wreath, and Globe
    > 
    > - Cube n/n/n: A cube with n layers along each of the 3 face axes (`d0, d1` (up and down), `f0, f1` (front and back), `r0, r1` (right and left)
    > - Wreath x/y: 2 rings with x points in left and y in right
    > - Globe m/n: a sphere with `m` lateral cuts (latitude) and `n` radial cuts (longitude). This gives $(m+1)\times(2n)$ positions on a grid:
    >     - `m` lateral cuts → `m+1` chunks
    >     - `n` radial cuts → `2n` when unfolding 2 sides of the sphere — think a world map
    >     
    

### 2.2 Others’ Approaches

**2.2.1 [All You Need is DISTANCE](https://www.kaggle.com/competitions/santa-2023/discussion/466399#2605760) — An ML idea by Alexander Chervov**

He basically says that we can train a model to predict the distance from any state to the solution state, then choose moves that decreases the distance. Distance function can be defined as the minimal number of moves to connect the two states.

To predict the distance, he proposes that we use ML. First, we can create a training set of states and distances. Then, we can train a ML model to predict the distance and infer on any state.

The training stage seems to be the biggest challenge of this approach — from using random walk sampling to representing the states in an efficient way (😱The number of states in [5x5x5 cube similar to number of atoms in the universe](https://www.therubikzone.com/number-of-combinations/))

Steps of his approach:

1. apply all moves to it get new states
2. apply all moves to the states obtained on the previous step,
3. SELECT only those states which were not found before (i.e. do not go back).
    
    ```python
    # get unique elements of the newly obtained states (their hashes)
    IX_unique = np.unique(np.concatenate([vec_hash, vec_hash_new ]), return_index=True)[1]
    IX_unique = IX_unique[IX_unique >= len(vec_hash)] - len(vec_hash)
    ```
    
4. Hash those states with simple hash — just matrix multiply by random int64 vector. (side note: float64 caused error with numpy in his experiment)
5. States converted from string lists `['A','B'…]` to `numpy int8` vectors. All the states stored on one matrix (`array: np.int8`), with shape: state-length x number of states.

Here are a few *more* specific approaches I scraped from the comments of the same discussion:

- [NN heuristic guiding A* search algorithm](https://www.kaggle.com/competitions/santa-2023/discussion/466399#2605019) by Vincent B. — Doesn’t work well with larger puzzles
- 

Here is the [discussion page](https://www.kaggle.com/competitions/santa-2023/discussion/466399#2605760) if you are interested in more details on the pain points.

**2.2.2 [Matrix Reformation](https://www.kaggle.com/competitions/santa-2023/discussion/464415) — Alexander Chervov**

Alexander proposed another way of representations in addition to the Permutation way given by the organizer.

The problem can be translated into:

> Find the shortest sequence of matrix multiplication
> 
- [ ]  [Permutation Matrix](https://en.wikipedia.org/wiki/Permutation_matrix)

## 3 Solution Formation

1. Permutation Group Theory — algebraic structures formed by permutations
2. Cost Function — that quantifies the "distance" or dissimilarity between two permutations
3. Search Algorithms — BFS, DFS, A* to explore the action space
4. Heuristics — for guiding searching and pruning branches
5. Optimization Techniques — parallelization, distributed computing, hardware acceleration

Experimental

1. Reinforcement learning with simulated annealing
2. 

## Resources

- [great visualization here](https://www.kaggle.com/code/bprinz/visualizing-all-unique-solution-states)
- [(A+B) + C ≠ A + (B+C) in numpy discussion](https://www.kaggle.com/competitions/santa-2023/discussion/468370) + state with NN discussion : Don’t use float64
- [alex algo](https://www.kaggle.com/competitions/santa-2023/discussion/468621)
- [alex notebook solution](https://www.kaggle.com/code/alexandervc/santa23-cube222-locate-initial-states?scriptVersionId=159376616&cellId=28)
- [matrix reformation](https://www.kaggle.com/competitions/santa-2023/discussion/464415)
- [getting started](https://www.kaggle.com/code/ryanholbrook/getting-started-with-santa-2023)
- [state distance generation](https://www.kaggle.com/code/alexandervc/santa23-states-distance-generate-save#Moves-%3EPermutation-matrices)
-