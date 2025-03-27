# 📚 susgruppen.de – Grouping Students by Preferences and Performance Levels

**susgruppen.de** is a web-based tool that enables users to assign a given number of students into a specified number of groups based on defined criteria.

## 🎯 Grouping Criteria

The grouping is performed based on:

- **Individual preferences**: which classmates students would like to work with
- **Performance levels**: ranging from level 1 to 3

### Preference-Based Grouping

When grouping based on preferences, the algorithm tries to fulfill them in an optimal way (or inversely, depending on settings). A preference is fulfilled when a student is grouped with someone on their preference list. This is referred to as a **match**.

### Performance-Based Grouping

Based on the performance level (1–3), students are grouped either:

- **Heterogeneously**: mixing performance levels
- **Homogeneously**: grouping students with similar levels

---

## 🧠 The Stable Group Problem and the Greedy Algorithm

This section provides theoretical background on optimal grouping according to preferences.

### The Stable Group Problem as a Variation of the Stable Roommates Problem

The **Stable Roommates Problem** is a classic matching theory problem, aiming to find stable pairings among an even number of participants. Each participant ranks all others. A matching is considered stable if no pair would prefer to be with each other over their assigned match.

The **Irving Algorithm** solves this problem in two phases:

1. **Phase 1**: Students "propose" to their favorite partners; less-preferred options are successively removed from their preference lists.
2. **Phase 2**: So-called rotations (cycles of mutual preferences) are eliminated to resolve instabilities.

This approach works well for 2-person pairings but reaches its limits when, for example, a teacher wants to assign 25 students into groups of 4—2-person matchings are insufficient here.

---

## ⚙️ A Greedy Algorithm for the Stable Group Problem

A **greedy algorithm** offers a practical alternative. In each step, it makes a locally optimal decision without evaluating all possible combinations globally.

### Process Summary

- **Step-by-step assignment**: Empty groups are initialized. For each student, the best-fitting group is determined—usually the one where the most preferred peers are already present.
- **Local optimization**: Each decision is based solely on the current state of group composition. Though not always globally optimal, this often leads to fast and effective results.

---

## 🖥️ How the Greedy Algorithm Processes Data

### 1. Random Shuffle

The student list is randomly shuffled to avoid order bias, since the greedy algorithm is sensitive to input order.

### 2. Create Empty Groups

A specified number of empty groups is initialized as sublists inside a parent list.

### 3. Dynamic Group Size Management

Groups should be as evenly sized as possible. If, for example, 10 students are divided into 3 groups, the ideal distribution would be two groups with 3 students and one group with 4 students.

```
maxGroupSize = { maxSize: 4, count: 1 }
```

Using static group sizes could lead to suboptimal assignments—e.g., the last student might not get the most compatible group due to fixed limits. A dynamic object adapts maximum sizes during assignment to avoid such restrictions.

### 4. Assigning First Group Members

Each group receives one initial member. These students are selected in such a way that they do not match with one another, preventing early waste of potential matches.

### 5. Assign Remaining Students

Remaining students are assigned one by one. For each, the number of potential matches in each group is calculated. The student is placed into the group with the highest match count.

### 6. Store Result

After all students have been assigned, the total number of matches is counted and stored.

### 7. Repeat and Select Optimal Grouping

The greedy algorithm (steps 1–6) is repeated 1000 times. The grouping with the highest total number of matches is returned as the optimal configuration.

## 🎯 Optimization Goal

A match occurs when a student is grouped with someone listed in their preference list. The algorithm aims to find a group distribution in which no reassignment would increase the number of matches.

---

## 📈 Performance

- Each iteration: `O(n × g × p)`  
  (n = students, g = groups, p = avg. prefs)
- Total cost: `O(1000 × n × g × p)`
- Works well for many students

---

## 🚀 Future Improvements

The current greedy algorithm with 1000 iterations has consistently produced optimal groupings in all practical and test cases. Still, no greedy algorithm is perfect.

### Possible Enhancements

- Reduce the probability that certain combinations of preferences prevent the algorithm from finding the optimal grouping even after 1000 iterations.  
- Reduce the number of iterations required to reliably reach the optimal configuration.

A promising idea is to adjust how remaining students are assigned. If a group becomes temporarily larger, it becomes more likely that the next student will be placed there due to more match opportunities—this reinforces imbalance.

Normalizing match scores by group size can mitigate this effect:

- Group A: 4 students → 3 matches  
- Group B: 2 students → 2 matches  
→ Normalized: 3/4 < 2/2 → Group B is preferred

This helps balance group sizes and improve match quality overall.

---

## 📋 Input Format

Student data must be entered in table format. Each preference should be listed in its own column:

| Name     | Preference 1 | Preference 2 | Preference 3 | Level |
|----------|--------------|--------------|--------------|-------|
| Alice    | Bob          | Charlie      |              | 2     |
| Bob      | Alice        |              |              | 1     |
| Charlie  | Alice        | Dana         |              | 3     |

- **Name**: required  
- **Preference 1–3**: optional preferences, each in a separate column  
- **Level**: optional, values from 1 to 3

---

## 📁 File Structure

```
index.html           → User interface  
style.css            → Styling  
app.js               → core logic
praef.js             → functions of the greedy algorithm to group according to the preferences
dia.js               → functions of the greedy algorithm to group against the preferences
random.js            → functions to group randomly
homo.js              → functions to group homogeneously
hetero.js            → functions to group heterogeneously                  
tableExample.png     → Example table image  
README.md            → Project documentation
```

---

## 📄 License

MIT License – Free to use for educational and non-commercial purposes.

---

## 👨‍🏫 Author

Developed by SeppiBrocki, inspired by real-world needs in education for fair and preference-aware student group formation.
