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
        let [looktoRender, changeRenderLook]  = useState(null);
        let [showLook, toggleLookVisible]  = useState(false);
        const renderLook = (event) => {
            event.preventDefault();
            let data = {look_id: looktoRender, foo:'bar'}
            console.log(data)
            fetch('/api/look_data', {
                method:'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            toggleLookVisible(!toggleLookVisible)
        };
        const changeLook = (event) => {
            changeRenderLook(event.target.value)
        };
        return (
        <>
        <form onSubmit={renderLook}>
            <label>Choose one of these {props.looks.length} looks:
            <select onChange={changeLook}>
                {props.looks.map((look) => {
                    return <option value={look.id} key={look.id}>({look.id}) {look.title}</option>
                })}
            </select>
            </label>
            <input type='submit' value='Render Data from selected look'/>
        </form>
        {(looktoRender && showLook) && <div id='renderedLook'>I am a rendered {looktoRender}</div>}
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