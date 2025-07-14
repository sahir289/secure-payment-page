export default async function BankTransferPage() {
    // Simulate an API call to fetch bank details
    await new Promise((resolve) => setTimeout(resolve, 800))
  
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Bank Transfer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
          <div>
            <p className="font-medium text-gray-700">Bank Name:</p>
            <p className="font-bold text-gray-900">Example Bank Ltd.</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Account Number:</p>
            <p className="font-bold text-gray-900">123456789012345</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">IFSC Code:</p>
            <p className="font-bold text-gray-900">EXAM0001234</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Account Holder Name:</p>
            <p className="font-bold text-gray-900">Your Company Name</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">Please transfer the amount to the bank details provided above.</p>
      </div>
    )
  }
  