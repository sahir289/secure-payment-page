// This is a Server Component
export default async function Tab2Page() {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate 2 seconds API call
  
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Content for Tab 2</h2>
        <p>This content was loaded after clicking Tab 2 and simulating an API call.</p>
        <p className="text-sm text-gray-500 mt-2">Data fetched for Tab 2.</p>
      </div>
    )
  }
  