import AccountForm from "./AccountForm"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"

class AccountEditForm extends AccountForm {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm(ev) {
    const url  = ApiUrlBuilder(["accounts", this.state.id])
    fetch(url,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: this.accountBody(),
      }
    )
      .then(resp => resp.json())
      .then(data => this.state.onSave(data))
      .then(() => this.state.closeForm())
  }
}

AccountEditForm.defaultProps = {
  name: "",
  priority: "",
  cash_flow: true,
}

export default AccountEditForm
