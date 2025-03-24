# 📚 susgruppen.de – Grouping Students by Preferences and Levels

**susgruppen.de** is a browser-based tool that allows teachers to quickly assign students into groups based on individual collaboration preferences and/or performance levels.

## 💡 Problem Overview

The website susgruppen.de allows users to assign a number of students into a specified number of groups based on specific criteria:

- **Collaboration Preferences**: who each student would like to work with (optional, partial, unranked)
- **Performance Levels**: e.g. from 1 to 3 (optional)

Depending on the selected criterion, the grouping can:

- **Respect collaboration preferences** as optimally as possible
- **Enforce performance balancing** (heterogeneous or homogeneous)

## 🎯 Grouping by Preferences

In preference-based grouping, the goal is to maximize fulfilled preferences. A preference is considered **fulfilled** if a student ends up in a group with someone from their preference list. This is called a **match**.

An optimal grouping is defined as one where **no other configuration would result in more matches**.

## 🧠 Background: Stable Roommates vs. Greedy Approach

### The Stable Group Problem

This is a theoretical variant of the classical **Stable Roommates Problem**, which attempts to find a stable pairing of participants based on mutual preference rankings.

The **Irving Algorithm** solves this problem in two phases:

1. **Proposal Phase** – participants propose to preferred partners, and preference lists are trimmed
2. **Rotation Elimination** – mutual cycles (rotations) are removed to achieve stability

This approach works for **2-person pairings**, but breaks down when forming groups of 3+ students. For example:

- 25 students into 4-person groups
- No natural way to define stability across sets
- No guarantees of balanced group sizes
- No requirement for full or ranked preference lists

## ⚙️ Greedy Algorithm for Grouping

A **greedy algorithm** is used to find a practical and fast solution.

This approach makes **locally optimal decisions** at each step, without evaluating all possible global groupings. It does not guarantee a perfect solution, but produces good results efficiently.

### Process Overview

1. **Random Shuffle**: the student list is shuffled to prevent order bias
2. **Create Empty Groups**: based on the selected number
3. **Dynamic Group Size Management**: ensures groups are approximately equal (e.g. 10 students in 3 groups → [4, 3, 3])
4. **Assign First Group Members**: each group receives one student, chosen to minimize preference overlap (avoids wasting matches)
5. **Assign Remaining Students**: each student is placed into the group where they create the most matches
6. **Record Result**: total number of matches is stored
7. **Repeat**: steps 1–6 are executed 1000 times, the best grouping (most matches) is returned

## 📐 Match Calculation

A **match** is:

> A student being grouped with someone from their preference list.

### Group Scoring

```js
score = number of students in group that are in student's preference list
