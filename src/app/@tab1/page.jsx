// This is a Server Component
export default async function Tab1Page() {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate 1.5 seconds API call
  
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Content for Tab 1</h2>
        <p>This content was loaded after clicking Tab 1 and simulating an API call.</p>
        <p className="text-sm text-gray-500 mt-2">Data fetched for Tab 1.</p>
      </div>
    )
  }
  