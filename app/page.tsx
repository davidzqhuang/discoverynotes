// This is the app too

import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow" style={{ flex: '1' }}>
        {/* Content for the first (1/5 height) div */}
        <p>Notes</p>
      </div>
      <div className="flex-grow" style={{ flex: '3' }}>
        {/* Content for the second (3/5 height) div */}
        <p>Chat</p>
      </div>
      <div className="flex-grow" style={{ flex: '1' }}>
        {/* Content for the third (1/5 height) div */}
        <p>Text</p>
      </div>
    </div>
  );
}
