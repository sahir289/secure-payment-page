// This is a Server Component
export default async function Tab3Page() {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate 1 second API call
  
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Content for Tab 3</h2>
        <p>This content was loaded after clicking Tab 3 and simulating an API call.</p>
        <p className="text-sm text-gray-500 mt-2">Data fetched for Tab 3.</p>
      </div>
    )
  }
  