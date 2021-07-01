import EventMessageBuilder from "../../functions/EventMessageBuilder"
import MoneyFormatter from "../../functions/MoneyFormatter"

export default (items, bottomLineChange) => {
  const data = dataFor(items, bottomLineChange)

  return {
    body: jsonBody(items, data),
    events: items.map((item, index) => itemToEventMessage(item, index)),
  }
}

const jsonBody = (items, data) => {
  const body = {
    events: items.map(item => itemToEvent(item, items.length, data))
  }

  return JSON.stringify(body)
}

const itemToEvent = (item, itemCount, data) => {
  const {
    updatedAmount,
    month,
    year,
  } = item

  if (item.objectType === "category") {
    const event_type = itemCount > 1 ? "multi_item_adjust_create" : "item_create"
    const id = parseInt(item.id.split(".")[0])

    return {
      amount: updatedAmount,
      budget_category_id: id,
      event_type: event_type,
      month: month,
      year: year,
      data: data,
    }
  } else {
    const event_type = itemCount > 1 ? "multi_item_adjust" : "item_adjust"
    const { id } = item

    return {
      amount: updatedAmount,
      budget_item_id: id,
      event_type: event_type,
      data: data,
    }
  }
}

const dataFor = (items, bottomLineChange) => {
  if (items.length < 2) { return null }

  const mappedItems =  items.map(item => {
    const { adjustmentAmount, month, year } = item
    const amount = MoneyFormatter((item.expense ? (adjustmentAmount * -100) : (100 * adjustmentAmount)), { toFloat: true })

    if (item.objectType === "category") {
      const id = parseInt(item.id.split(".")[0])

      return {
        amount: amount,
        budget_category_id: id,
        event_type: "multi_item_adjust_create",
        budget_category: item.name,
        month: month,
        year: year,
      }
    } else {
      const { id } = item

      return {
        id: id,
        amount: amount,
        event_type: "multi_item_adjust",
        budget_category: item.name,
        month: month,
        year: year,
      }
    }
  })

  return { items: mappedItems, bottom_line_change: MoneyFormatter(bottomLineChange, { toFloat: true} ) }
}

const itemToEventMessage = (item, index) => {
  return data => {
    if (item.objectType === "item") {
      const eventParams = {
        ...item,
        category: item.name,
        originalAmount: (parseInt(item.amount) / 100.0),
        newAmount: (parseInt(item.updatedAmount) / 100.0),
      }
      const ev = EventMessageBuilder({ eventType: "budget-item-update", ...eventParams })
      return ev()
    } else {
      const id = data[index].item.id
      const eventParams = {
        ...item,
        id: id,
        amount: item.updatedAmount,
      }
      return EventMessageBuilder({ eventType: "budget-item-create", item: eventParams })
    }
  }
}
