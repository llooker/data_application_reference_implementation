import React, { useEffect, useState } from 'react'
// data that loads with the page
    // list of all folders
// data that loads on a button press
    // list of looks in the folder
// button to embed the selected look

const APIData = () => {
  const [userInfo, setUserInfo] = useState('')
  useEffect(() => {
    fetch('/api/current_user')
      .then(res => res.text())
      .then(userInfo => setUserInfo(userInfo))
    fetch('/api/test')})
    return (
        <>
        <div>Hi there
            <div>
            {userInfo}
            </div>
            
        </div>
        </>
    )
}

export default APIData