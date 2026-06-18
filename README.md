<div align="center">

# 💸 SalaryCalc

### Decode your real take-home salary, not just your CTC.

A modern salary intelligence tool that helps students and freshers estimate their **monthly in-hand salary** after PF deductions, taxes, and bonus adjustments.

<br>

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br>

🚀 **Live Demo:** [Coming Soon]

📂 **Repository:** SalaryCalc

</div>

---

## ✨ Overview

Most students receive placement offers in terms of **CTC (Cost To Company)**.

However, the actual amount credited to their bank account every month is often significantly lower due to:

- Provident Fund (PF)
- Income Tax
- Bonus Components
- Variable Pay Structures

**SalaryCalc** bridges that gap by providing a clean and intuitive way to estimate real take-home compensation.

---

## 🎯 Key Features

### 📊 Salary Intelligence

- Annual CTC Analysis
- Annual Bonus Support
- PF Deduction Calculation
- Income Tax Estimation
- Fixed Pay Calculation
- Annual In-Hand Salary
- Monthly In-Hand Salary

### 📈 Data Visualization

- Interactive Salary Breakdown
- Deduction Analysis
- Visual Distribution Bars
- Package Comparison Table

### 🎨 User Experience

- Premium Fintech Inspired UI
- Interactive Constellation Background
- Dark / Light Mode
- Smooth Animations
- Responsive Design
- Mobile Friendly

---

## 🖥️ Screenshots

### Desktop Experience

<img width="100%" src="screenshots/desktop.png">

---

### Mobile Experience

<img width="300" src="screenshots/mobile.png">

---

## ⚙️ How It Works

```text
Annual CTC
      │
      ▼
Subtract Bonus
      │
      ▼
Calculate Fixed Pay
      │
      ▼
Deduct PF
      │
      ▼
Apply Income Tax
      │
      ▼
Annual In-Hand Salary
      │
      ▼
Monthly In-Hand Salary
```

---

## 🧮 Salary Formula

### Fixed Pay

```js
fixedPay = annualCTC - annualBonus;
```

### PF Deduction

```js
pfDeduction = fixedPay * (pfPercentage / 100);
```

### Tax Deduction

```js
taxDeduction =
(fixedPay - pfDeduction) *
(taxPercentage / 100);
```

### Annual In-Hand

```js
annualInHand =
fixedPay -
pfDeduction -
taxDeduction;
```

### Monthly In-Hand

```js
monthlyInHand =
annualInHand / 12;
```

---

## 📱 Responsive Design

SalaryCalc is optimized for:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet
- 🌐 Modern Browsers

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/aayushks38/SalaryCalc.git
```

Navigate to project:

```bash
cd SalaryCalc
```

Run:

```bash
Open index.html
```

No installation required.

---

## 📂 Project Structure

```text
SalaryCalc
│
├── index.html
├── style.css
├── script.js
│
├── screenshots
│   ├── desktop.png
│   └── mobile.png
│
└── README.md
```

---

## 🎓 Learning Outcomes

Through this project I practiced:

- Semantic HTML
- Responsive CSS
- JavaScript DOM Manipulation
- Event Handling
- Dynamic UI Updates
- Theme Switching
- Canvas Animation
- Frontend Project Deployment

---

## 👨‍💻 Author

### Aayush Kumar Sinha

Frontend Developer & Computer Science Student

📧 aayushksinha24@gmail.com

🔗 GitHub: https://github.com/aayushks38

🔗 LinkedIn: Add Your LinkedIn URL

---

## ⭐ Support

If you found this project useful, consider giving it a star.

It helps students and developers discover the project.

---

<div align="center">

### Built with ❤️ using HTML, CSS and JavaScript

</div>
