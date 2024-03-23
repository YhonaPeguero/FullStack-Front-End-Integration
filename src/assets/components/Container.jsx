import { useState } from "react"
import TabList from "./TabList"

const Container = () => {
  const [isIntegrationVersion, setIsIntegrationVersion] = useState(true)

  return (
    <div className="container mt-5">
      {/* <NoteTab isIntegrationVersion={isIntegrationVersion} setIsIntegrationVersion={setIsIntegrationVersion}/> */}
      <TabList isIntegrationVersion={isIntegrationVersion} setIsIntegrationVersion={setIsIntegrationVersion}/>
    </div>
  )
}

export default Container