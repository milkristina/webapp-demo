  (() => {
    const home = document.getElementById('home');
    const tipsPage = document.getElementById('tips-page');
    const budgetPage = document.getElementById('budget-page');
    const modal = document.getElementById('modal');
    const modalDesc = document.getElementById('modal-desc');
    const modalTitle = document.getElementById('modal-title');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const btnTips = document.getElementById('btn-tips');
    const btnBudget = document.getElementById('btn-budget');
    const btnBackFromTips = document.getElementById('btn-back-from-tips');
    const btnBackFromBudget = document.getElementById('btn-back-from-budget');
    const tipsList = document.getElementById('tips-list');

    const tipsData = [
      { title: "Budget", text: "A budget is a plan for managing income and expenses over a specific period. It helps individuals track spending and save money by setting limits on various expense categories" },
      { title: "Money", text: "Money is what we use to buy things we need or want. You can earn money by doing jobs or chores" },
      { title: "Saving", text: "Saving means putting some money aside and not spending it right away. It helps you buy something bigger later or be ready for surprises." },
      { title: "Piggy Bank", text: "A piggy bank is a small container to keep your saved money safe at home. It's a fun way to start learning how to save" },
      { title: "Allowance", text: "An allowance is money your parents give you regularly, often for helping with chores. You can choose to spend or save it" },
      { title: "Smart Choices", text: "Smart choices mean thinking carefully before using your money. It helps you use money in a way that's good for you now and later " },
      { title: "Wants Later", text: "Wants later are things you don't need right now, but want to save for. Like a skateboard or a big Lego set" },
      { title: "Money Goal", text: "A money goal is something you want to save for, like a new toy. You can keep track of how close you are" },
      { title: "Save, Spend, Share", text: "These are the three main things you can do with money: save for later, spend on something now, or share with someone who needs help" },
      { title: "Price", text: "Price is how much something costs. You need to check the price before deciding to buy something" },
      { title: "Needs vs. Wants", text: "Needs are things you must have, like food and clothes. Wants are things you'd like to have, like toys or candy" },
      { title: "Spending Plan", text: "A spending plan helps you decide how much money to use now and how much to save. It's like a map for your money" },
      { title: "Smart Shopper", text: "A smart shopper compares prices, looks for sales, and doesn't buy things too quickly. It helps you spend your money wisely" },
      { title: "Money Habit", text: "A money habit is something you do with money regularly, like always saving a part of what you get. Good money habits help you grow up to be smart with money" },
    ];


    const btnRules = document.getElementById('btn-rules');
    const rulesPage = document.getElementById('rules-page');
    const btnBackFromRules = document.getElementById('btn-back-from-rules');
    btnRules.addEventListener('click', () => {
      showSection(rulesPage);
      document.querySelector('.background-figure')?.classList.add('rules-background-under');
      });
    btnBackFromRules.addEventListener('click', () => {
      showSection(home);
      document.querySelector('.background-figure')?.classList.remove('rules-background-under');
    });

    function showSection(sectionToShow) {
  [home, tipsPage, budgetPage, rulesPage].forEach(section => {
    if (section === sectionToShow) {
      section.style.display = 'flex';
      section.setAttribute('aria-hidden', 'false');
      section.focus?.();
    } else {
      section.style.display = 'none';
      section.setAttribute('aria-hidden', 'true');
    }
  });
  closeModal();
}
    showSection(home);

    function populateTips() {
      tipsList.innerHTML = '';
      tipsData.forEach(tip => {
        const btn = document.createElement('button');
        btn.className = 'tip-btn';
        btn.type = 'button';
        btn.textContent = tip.title;
        btn.setAttribute('aria-haspopup', 'dialog');
        btn.setAttribute('aria-controls', 'modal');
        btn.addEventListener('click', () => {
          openModal(tip.title, tip.text);
        });
        tipsList.appendChild(btn);
      });
    }

    function openModal(title, text) {
      modalTitle.textContent = title;
      modalDesc.textContent = text;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      modalCloseBtn.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (tipsPage.style.display === 'flex') {
        tipsList.querySelector('button.tip-btn')?.focus();
      } else {
        btnTips.focus();
      }
    }

    btnTips.addEventListener('click', () => {
      populateTips();
      showSection(tipsPage);
    });

    btnBudget.addEventListener('click', () => {
      showSection(budgetPage);
      document.querySelector('.background-figure')?.classList.add('background-under');
    });

    btnBackFromTips.addEventListener('click', () => {
      showSection(home);
    });

    btnBackFromBudget.addEventListener('click', () => {
      showSection(home);
      document.querySelector('.background-figure')?.classList.remove('background-under');
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

  // Player expenses functionality
  const saveButton = document.getElementById('direct-expense-save');
  const inputField = document.getElementById('direct-expense-input');
  const playerExpensesTableBody = document.querySelector('.player-expenses-table tbody');
  const expenseTypeButtons = document.querySelectorAll('.expense-type-button');
  let selectedExpenseType = null;

  expenseTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (selectedExpenseType === button.dataset.type) {
        selectedExpenseType = null;
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      } else {
        selectedExpenseType = button.dataset.type;
        expenseTypeButtons.forEach(btn => {
          btn.classList.toggle('selected', btn === button);
          btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
        });
      }
    });
  });

  let totalRow = document.querySelector('.player-expenses-table tbody .total-row');
  if (!totalRow) {
    totalRow = document.createElement('tr');
    totalRow.classList.add('total-row');
    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'Total';
    const totalValueCell = document.createElement('td');
    totalValueCell.textContent = '0.00';
    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalValueCell);
    playerExpensesTableBody.appendChild(totalRow);
  }

  function updateTotal() {
    let sum = 0;
    const rows = playerExpensesTableBody.querySelectorAll('tr:not(.total-row)');
    rows.forEach(row => {
      const costCell = row.cells[1];
      if (costCell) {
        const value = parseFloat(costCell.textContent);
        if (!isNaN(value)) {
          sum += value;
        }
      }
    });
    totalRow.cells[1].textContent = sum.toFixed(2);
  }

  saveButton.addEventListener('click', () => {
    const amount = parseFloat(inputField.value);

    if (!selectedExpenseType) {
      alert('Please select either "Need" or "Want" for the expense type.');
      return;
    }

    if (!isNaN(amount) && amount > 0) {
      const newRow = document.createElement('tr');
      const typeCell = document.createElement('td');
      const costCell = document.createElement('td');

      typeCell.textContent = selectedExpenseType;
      costCell.textContent = amount.toFixed(2);

      playerExpensesTableBody.insertBefore(newRow, totalRow);
      newRow.appendChild(typeCell);
      newRow.appendChild(costCell);

      updateTotal();
      inputField.value = '';
      selectedExpenseType = null;
      expenseTypeButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      });
    } else {
      alert('Please enter a valid amount.');
    }
  });
  
  })();