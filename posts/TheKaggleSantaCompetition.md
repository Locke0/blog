---
title: Solve the Kaggle Santa Puzzle
description: as a beginner...🤔
date: 2024-01-20
scheduled: 2024-01-20
tags: PROJECT
layout: layouts/post.njk
---

Ok! Let’s try to solve the $25000 Kaggle Competition: Santa 2023 — The Polytope Permutation Puzzle today.

A little context, I have little experience with Kaggle competitions. In fact, this will be the 2nd Kaggle competition I’m participating with the first one being the infamous Titan Challenge. So I’m literally a noob 🤷 (Sorry about the click bait. Oh well, I didn’t win). However, I have been really wanting to get into Kaggle more and get better at deep learning. This is why I’m writing this blog with the intention of showing how I approached a problem in a new or unfamiliar knowledge domain in term of navigating, researching, learning and problem solving. 

Alright, let’s dive in 😤!

## 1 Research

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

Ok. Let’s digest all that info and redefine our problem/objective:

$$
\textrm{Minimize the number of transitions taken to get from state A to state B}
$$

When the problem is presented this way, we can start breaking down the problem into smaller components and steps

**First**, we should probably find the proper data structures to store *states* and *transitions* since the given array or string forms might *not* be the most convenient for modeling the $state \rightarrow transition \rightarrow state$ process/relation. From what I remember from my experience in robotics, maybe states can be represented as matrices instead of the given array form.

**However**, I am still not sure about how to implement the specifics. I think I need more context and research. So, let’s see what discussions and solutions others have shared online. I started looking at the Discussion page for the competition, YouTube, and Google. 

### 1.4 “Literature Review”

**1.4.1 A Tutorial Notebook on The Discussion Page — [Getting Started with Santa 2023](https://www.kaggle.com/code/ryanholbrook/getting-started-with-santa-2023).**

This tutorial gives the code for the basic setup, I’m glad I took a look at the Discussion and this would save me some time. Specifically, it shows:

- How to *import* and *parse* the `puzzle_info` and `puzzles` into proper formats from corresponding files using pandas.
- How to *represent* the puzzle states with `numpy.array`
- How to *represent* the moves with `Permutation` from the `sympy.combinatorics` — I had never used it before, here is its [documentation page](https://docs.sympy.org/latest/modules/combinatorics/permutations.html)
- 

## 2 Problem Breakdown

1. 