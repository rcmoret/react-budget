import { terms as termsContent } from "./en/terms"
import { terms as termsOverrides } from "./overrides/terms"

export const terms = {
  ...termsContent,
  ...termsOverrides,
}
