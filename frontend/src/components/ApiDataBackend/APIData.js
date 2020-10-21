import React, { useEffect, useState } from 'react'
// data that loads with the page
    // list of all folders
// data that loads on a button press
    // list of looks in the folder
// button to embed the selected look

const WelcomePanel = (props) => {
    const name = props.user ? props.user.first_name : '';
    return (
        <>
        <div>Welcome {name}</div>
        </>
    )
}

const LookFetcher = () => {
    const [looks, getLooks] = useState([]);
    const fetchLooks = () => {
        fetch('/api/all_looks')
        .then(res => res.json())
        .then(looks => {
            getLooks(looks);
          });
      }
    return (
        <>
        <button onClick={fetchLooks}>Fetch Looks!</button>
        {looks && <FetchedLooks looks={looks}/>}
        </>
    )
}

const FetchedLooks = (props) => {
    if (props.looks.length > 0) {
        const looks = props.looks.map(look => {
            <option key={look.id}>{look.name}</option>
        });
        return (
        <>
        <div>Choose one of these {props.looks.length} looks:</div>
        <select>
            {looks}
        </select>
        </>
        )
     } else {
            return <div></div>
        }
}

const APIData = () => {
  const [user, setUser] = useState({});
  const fetchUser = () => {
    fetch('/api/current_user')
    .then(res => res.json())
    .then(user => {
        setUser(user);
      });
  }
  useEffect(() => {
        fetchUser();
    }, []);
    return (
        <>
        <WelcomePanel user={user}/>
        <LookFetcher />
        </>
    )
}

export default APIData