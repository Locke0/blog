---
title: Energy Based Models Study Notes
description: Energy Based Model Study Notes
date: 2024-11-12
scheduled: 2024-11-12
tags: Coming Soon
layout: layouts/post.njk
image: /blog/img/remote/water-splash.jpg
---

## Overview
Instead of regressing input x to output y, energy based models predict whether a certain pair of $(x,y)$ fit together.



Constraints:
1. $P(x) \geq 0 \ $ is non-negative

2. $\sum_x P(x) = 1 \ $ OR $\ \int_x P(x) dx = 1 \ $ if continuous is normalized