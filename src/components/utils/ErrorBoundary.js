import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
   
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
   
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-red-500">خطا در دریافت مدل سه بعدی!</h2>
            <button
              type="button"
              className="bg-dark-active-btn rounded-app p-2"
              onClick={() => this.setState({ hasError: false })}
            > تلاش دوباره
            </button>
          </div>
        )
      }
   
      // Return children components in case of no error
   
      return this.props.children
    }
  }
   
  export default ErrorBoundary