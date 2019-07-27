export const category = {
  accrual: "accrual",
  accruing: "accruing",
  addNew: "add new",
  all: "all",
  cancelButtonText: "Cancel",
  categories: "categories",
  closeButtonText: "Close",
  createButtonText: "create",
  defaultAmount: "default amount",
  deleteConfirmMessage: (name) => `Are you sure you want to delete ${name}?`,
  details: "details",
  editSlashDelete: "edit/delete",
  expense: "expense",
  expenses: "expenses",
  filters: "filters",
  frequency: "frequency",
  icon: "icon",
  monthly: "monthly",
  name: "name",
  resetButtonText: "reset",
  revenue: "revenue",
  revenues: "revenues",
  searchLabelText: "category name",
  searchPlaceholder: "search",
  title: "budget categories",
  type: "type",
  updateButtonText: "update",
  weekly: "day-to-day",
}

export const discretionary = {
  aheadOfBudget: "Ahead of Budget",
  overBudget: "Over Budget",
  title: "discretionary",
}

export const icon = {
  cancelButtonText: "cancel",
  className: "class name",
  createButtonText: "create",
  deleteConfirmationMessage: (name) => `Are you sure you want to delete ${name}?`,
  name: "name",
  preview: "preview",
  resetButtonText: "reset",
  updateButtonText: "update",
}

export const item = {
  account: "account",
  amount: "amount",
  budgeted: "budgeted",
  cleared: "cleared",
  createButtonText: "create",
  date: "date",
  deleteConfirmationMessage: (name, date) => `Are you sure you want to delete ${name} for ${date}?`,
  description: "description",
  items: "items",
  perDay: "per day",
  perWeek: "per week",
  spent: "spent",
}

export const maturityInterval = {
  deleteConfirmMessage: "Are you sure you want to delete this maturity interval?",
  options: [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ],
  title: "maturity intervals",
  year: "year",
}

export const menu = {
  manage: "manage",
  order: "order",
  setUpLinkText: (dateString) => `Set up ${dateString}`,
  show: "show",
  title: "menu",
}

export const setup = {
  additional: "additional",
  accrualButtonText: "include selected",
  accruingExpenses: "accruing expenses",
  alreadyIncluded: (amount, item, newMonth) => `You already included ${amount} for ${item} in ${newMonth}'s budget.`,
  amountToInclude: "Amount to include",
  howMuchToInclude: (newMonthString) => `How much to include in ${newMonthString}?`,
  howMuchAdditional: "How much additional to include?",
  ignore: "don't include",
  include: "include",
  nOfTotal: (number, count) => `${number} of ${count}`,
  markCompleteText: "mark setup complete",
  requeue: "requeue",
}

export const shared = {
  deposited: "deposited",
  difference: "difference",
  lastMonthString: (description, prevMonthString) => `${description} in ${prevMonthString}`,
  minus: "-",
  plus: "+",
  remaining: "remaining",
  spent: "spent",
  total: "total",
}
