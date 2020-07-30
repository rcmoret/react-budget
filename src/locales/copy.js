import { account as accountContent } from "./en/account"
import {
  discretionary as discretionaryContent,
  eventLabels as eventLabelsContent,
  finalize as finalizeContent,
  icon as iconContent,
  item as itemContent,
  category as budgetCategoryContent,
  maturityInterval as maturityIntervalContent,
  menu as menuContent,
  setup as setupContent,
  shared as sharedContent,
} from "./en/budget"
import { errors as errorsContent } from "./en/errors"
import { overrides } from "./overrides/copy"
import { terms as termsContent } from "./terms"
import { transfer as transferContent } from "./en/transfer"
import { transaction as transactionContent } from "./en/transaction"

export const account = {
  ...accountContent,
  ...overrides.account,
}

export const budget = {
  category: {
    ...budgetCategoryContent,
    ...overrides.budgetCategory,
  },
  discretionary: {
    ...discretionaryContent,
    ...overrides.discretionary,
  },
  eventLabels: {
    ...eventLabelsContent,
    ...overrides.eventLabels,
  },
  finalize: {
    ...finalizeContent,
    ...overrides.finalize,
  },
  icon: {
    ...iconContent,
    ...overrides.icon,
  },
  item: {
    ...itemContent,
    ...overrides.item,
  },
  maturityInterval: {
    ...maturityIntervalContent,
    ...overrides.maturityInterval,
  },
  menu: {
    ...menuContent,
    ...overrides.menu,
  },
  setup: {
    ...setupContent,
    ...overrides.setup,
  },
  shared: {
    ...sharedContent,
    ...overrides.shared,
  }
}

export const errors = {
  ...errorsContent,
  ...overrides.errors,
}

export const icon = {
  icons: "icons"
}

export const transfer = {
  ...transferContent,
  ...overrides.transfer,
}

export const transaction = {
  ...transactionContent,
  ...overrides.transaction,
}

export const terms = termsContent
