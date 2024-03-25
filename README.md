# Who wants to be a millionaire?
![Who wants to be a millionaire?](https://i.ibb.co/zNhnPCs/Group-265-1.png)


#### Demo task (by Volodymyr Pastukh)

---

### Getting Started

First, install all packages
```bash
npm i
```

Second, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### Modify game questions

Json file with questions and settings you can find here:
```bash
/src/redux/slices/quizConfig.json
```
Here can be max 12 questions (Underlimited questions will be trimmed)

Each question has own format:
1. Min 4 answers
2. Min 1 correct answer
3. Money: min - 1, max - 10 000 000 00

If you want multi answer question, just add more values in "correct answers" array

