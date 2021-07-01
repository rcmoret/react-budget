import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import formBodyHelper from "./AdjustItemFormHelpers"
import { post } from "../../functions/ApiClient"
import MoneyFormatter from "../../functions/MoneyFormatter"

import {
  addFieldToItemsAdjust,
  adjustItemFormSubmit,
  removeAdjustFormCategory,
  removeAdjustFormItem,
  updateAdjustFormCategory,
  updateAdjustFormItem,
  updatedItemAdjustSelectedValue,
} from "../../actions/budget"

import { budget as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { Link } from "react-router-dom"
import Select from "react-select"

const Form = props => {
  const {
    bottomLineChange,
    formItems,
    dispatch,
    selectOptions,
    selectedOption,
    showAdjustItemsForm,
  } = props
  const object = selectedOption === null ? null : selectedOption.object
  const index = formItems.length

  const updateSelectedValue = e => {
    const action = updatedItemAdjustSelectedValue({ selectedValue: e.value })
    dispatch(action)
  }

  if (showAdjustItemsForm) {
    return (
      <div className="budget-banner">
        <div className="adjust-items-form-wrapper">
          <h4>{titleize(copy.menu.adjustItemFormBaseText)}</h4>
          <div className="adjust-items-form">
            <ItemSelect
              selectOptions={selectOptions}
              selectedOption={selectedOption}
              updateSelectedValue={updateSelectedValue}
            />
            <div className="adjust-items-select-add-button">
              <AddFieldButton
                dispatch={dispatch}
                index={index}
                object={object}
              />
            </div>
          </div>
          <FormHeader />
          <FormItems
            dispatch={dispatch}
            items={formItems}
          />
          <Summary bottomLineChange={bottomLineChange} dispatch={dispatch} itemCount={index} items={formItems} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

const AddFieldButton = props => {
  const {
    dispatch,
    index,
    object,
  } = props

  const addField = () => {
    const id = object.objectType === "category" ? `${object.id}.${index}` : object.id
    const updatedAmount = object.objectType === "category" ? 0 : object.amount
    const updatedRemaining = object.objectType === "category" ? 0 : object.remaining
    const action = addFieldToItemsAdjust({
      amount: 0,
      remaining: 0,
      ...object,
      id: id,
      updatedAmount: updatedAmount,
      updatedRemaining: updatedRemaining,
      adjustmentAmount: "",
    })
    dispatch(action)
  }

  if (object  === null) {
    return null
  } else {
    return (
      <Link
        to="#"
        onClick={addField}
        className="fa fa-plus-circle"
      />
    )
  }
}

const ItemSelect = ({ selectOptions, selectedOption, updateSelectedValue }) => {
  return (
    <div className="adjust-items-select">
      <Select options={selectOptions}
        placeholder={copy.adjustItemsForm.selectPlaceholder}
        onChange={updateSelectedValue}
        value={selectedOption}
      />
    </div>
  )
}

const FormHeader = () => (
  <div className="adjust-items-form mg-top-1 flex-space-between sixty-percent-width brd-btm-1-solid-black pd-btm-0_5">
    <div className="twenty-percent-width">{titleize(copy.shared.category)}</div>
    <div className="twelve-percent-width text-align-right">{titleize(copy.shared.budgeted)}</div>
    <div className="twelve-percent-width text-align-right">{titleize(copy.shared.remaining)}</div>
    <div className="twenty-percent-width text-align-right">{titleize(copy.adjustItemsForm.adjustmentAmount)}</div>
    <div className="twelve-percent-width text-align-right">{titleize(copy.adjustItemsForm.updatedBudgeted)}</div>
    <div className="twelve-percent-width text-align-right">{titleize(copy.adjustItemsForm.updatedRemaining)}</div>
  </div>
)

const FormItems = ({ dispatch, items }) => (
  items.map((item, index) => {
    if (item.objectType === "category") {
      return (
        <Category
          key={`category.${item.id}`}
          category={item}
          dispatch={dispatch}
          index={index}
        />
      )
    } else {
      return <Item key={`item.${item.id}`} item={item} dispatch={dispatch} />
    }
  })
)

const Category = props => {
  const { category, dispatch } = props
  const { adjustmentAmount, expense } = category
  const onChange = event => {
    const action = updateAdjustFormCategory({ id: category.id, value: event.target.value })
    dispatch(action)
  }
  const removeCategory = () => {
    const action = removeAdjustFormCategory({ id: category.id })
    dispatch(action)
  }
  const operator = expense ? `(${copy.shared.minus})` : `(${copy.shared.plus})`

  return (
    <div className="adjust-items-form sixty-percent-width flex-space-between mg-top-1">
      <div className="twenty-percent-width">
        <Link
          to="#"
          onClick={removeCategory}
          className="fas fa-times-circle"
        />
        {" "}
        {category.name}
      </div>
      <div className="twelve-percent-width text-align-right">{copy.adjustItemsForm.new}</div>
      <div className="twelve-percent-width text-align-right">{copy.adjustItemsForm.na}</div>
      <div className="twenty-percent-width flex flex-end">
        <strong>{operator}</strong>
        <input className="text-align-right sixty-percent-width mg-lt-0_5" name="amount" onChange={onChange} value={adjustmentAmount} />
      </div>
      <div className="twelve-percent-width text-align-right">{MoneyFormatter(category.updatedAmount)}</div>
      <div className="twelve-percent-width text-align-right">{MoneyFormatter(category.updatedRemaining)}</div>
    </div>
  )
}

const Item = props => {
  const { item, dispatch } = props
  const { adjustmentAmount, expense } = item
  const onChange = event => {
    const action  = updateAdjustFormItem({ id: item.id, value: event.target.value })
    dispatch(action)
  }
  const removeItem = () => {
    const action = removeAdjustFormItem({ id: item.id })
    dispatch(action)
  }
  const operator = expense ? `(${copy.shared.minus})` : `(${copy.shared.plus})`

  return (
    <div className="adjust-items-form sixty-percent-width flex-space-between mg-top-1">
      <div className="twenty-percent-width">
        <Link
          to="#"
          onClick={removeItem}
          className="fas fa-times-circle"
        />
        {" "}
        {item.name}
      </div>
      <div className="twelve-percent-width text-align-right">{MoneyFormatter(item.amount)}</div>
      <div className="twelve-percent-width text-align-right">{MoneyFormatter(item.remaining)}</div>
      <div className="twenty-percent-width flex flex-end">
        <strong>{operator}</strong>
        <input className="text-align-right sixty-percent-width mg-lt-0_5" name="amount" onChange={onChange} value={adjustmentAmount} />
      </div>
      <div className="twelve-percent-width text-align-right">{MoneyFormatter(item.updatedAmount)}</div>
      <div className="twelve-percent-width text-align-right">{MoneyFormatter(item.updatedRemaining)}</div>
    </div>
  )
}

const Summary = ({ bottomLineChange, dispatch, itemCount, items }) => {
  const colorClasses = () => {
    if (bottomLineChange === 0) {
      return ""
    } else if (bottomLineChange > 0) {
      return  "bg-green txt-color-white"
    } else {
      return "bg-red txt-color-white"
    }
  }

  const onSubmit = () => {
    const helper = formBodyHelper(items, bottomLineChange)
    const { body, events}  = helper
    const url = ApiUrlBuilder({ route: "budget-items-events-index" })

    const onSuccess = data => {
      const action = adjustItemFormSubmit(data)
      dispatch(action)
    }
    post(url, body, { onSuccess: onSuccess, events: events })
  }

  if (itemCount === 0) {
    return null
  } else {
    return (
      <div>
        <div className="adjust-items-form mg-top-1 flex-space-between sixty-percent-width brd-btm-1-solid-black pd-btm-0_5">
        </div>
        <div className="adjust-items-form sixty-percent-width flex-space-between mg-top-1">
          <div className="twenty-percent-width">
            <strong>{titleize(copy.adjustItemsForm.bottomLineImpact)}</strong>
          </div>
          <div className="twelve-percent-width">
          </div>
          <div className="twelve-percent-width">
          </div>
          <div className={`twenty-percent-width ${colorClasses()} pd-0_5 brd-rds-4 text-align-right`}>
            {MoneyFormatter(bottomLineChange)}
          </div>
          <div className="twelve-percent-width">
          </div>
          <div className="twelve-percent-width">
            <Link
              to="#"
              onClick={onSubmit}
            >
              <span className="bg-green brd-rds-4 pd-0_75 underline">
                {titleize(copy.adjustItemsForm.submit)}
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { adjustForm } = state.budget
  const { month, year } = state.budget.metadata
  const { items, selectedValue } = adjustForm

  const budgetItems = [
    ...state.budget.monthly.collection,
    ...state.budget.weekly.collection,
  ]
  const adjustingItemIds = items.map(item => item.id)
  const adjustingCategoryIds = items.filter(item => item.objectType === "category")
    .map(item => parseInt(item.id.split(".")[0]))
  const budgetCategories = state.budget.categories.collection
  const categoryIds = budgetItems.map(item => item.budget_category_id)
  const categorySortFn = (a, b) => a.name < b.name ? -1 : 1
  const categoryFormatFn = category => (
    {
      label: category.name,
      value: `category.${category.id}`,
      object: { ...category, month: month, year: year, objectType: "category" },
    }
  )
  const categoryFilterFn = category => (
    category.monthly || ![...categoryIds, ...adjustingCategoryIds].includes(category.id)
  )

  const selectableCategories = budgetCategories.filter(categoryFilterFn).sort(categorySortFn).map(categoryFormatFn)

  const itemFormatFn = item => {
    const label = `${item.name} - (${MoneyFormatter(Math.abs(item.remaining))})`
    return {
      label: label,
      value: `item.${item.id}`,
      object: { ...item, objectType: "item" },
    }
  }

  const itemSortFn = (a, b) => {
    if (a.name === b.name) {
      return Math.abs(b.amount) - Math.abs(a.amount)
    } else {
      return categorySortFn(a, b)
    }
  }

  const itemFilterFn = item => !adjustingItemIds.includes(item.id)

  const selectableItems = budgetItems.filter(itemFilterFn).sort(itemSortFn).map(itemFormatFn)

  const selectOptions = [
    {
      label: "Existing Items",
      options: selectableItems
    },
    {
      label: "Available Categories",
      options: selectableCategories,
    }
  ]

  const selectedOption = [...selectableCategories, ...selectableItems].find(opt => opt.value === selectedValue) || null

  const bottomLineChange = items.reduce((sum, item) => {
    const adjustmentAmount = parseFloat(item.adjustmentAmount) || 0
    if (item.expense) {
      if (item.difference >= 0) {
        const difference = adjustmentAmount - (item.difference / 100.0)
        return sum -= (difference <= 0 ? 0 : difference)
      } else {
        return sum -= adjustmentAmount
      }
    } else {
      if (item.difference < 0) {
        const difference = adjustmentAmount + (item.difference / 100.0)
        return sum += (difference < 0 ? 0 : difference)
      } else {
        return sum += adjustmentAmount
      }
    }
  }, 0)

  return {
    ...state.budget.menuOptions,
    bottomLineChange: (bottomLineChange * 100),
    formItems: items,
    selectedValue: selectedValue,
    selectOptions: selectOptions,
    selectedOption: selectedOption,
  }
}

export default connect(mapStateToProps)(Form)
