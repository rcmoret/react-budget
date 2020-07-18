export const apiKeyEdited = apiKey => (
  { type: "api/KEY_EDITED", payload: { key: apiKey } }
)

export const apiKeyUpdated = apiKey => (
  { type: "api/KEY_UPDATED", payload: { key: apiKey } }
)

export const apiStatusUpdated = ({ status }) => (
  { type: "api/STATUS_UPDATED", payload: { status: status } }
)
