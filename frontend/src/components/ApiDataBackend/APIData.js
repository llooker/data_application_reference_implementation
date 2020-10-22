import React, { useEffect, useState } from 'react'
import { Box, Button, Form, Heading, Select, Text, Space} from '@looker/components'

const WelcomePanel = (props) => {
    const name = props.user ? props.user.first_name : '';
    return (
        <>
        <Space m="small">
        <Heading as="h2">Welcome {name}</Heading>
        </Space>
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
        <Button onClick={fetchLooks}>Fetch Looks!</Button>
        {looks && <FetchedLooks looks={looks}/>}
        </>
    )
}

const FetchedLooks = (props) => {
    if (props.looks.length > 0) {
        let [looktoRender, changeRenderLook]  = useState('');
        let [showLook, toggleLookVisible]  = useState(false);
        let [lookData, setLookData] = useState('{}');

        const resetLook = (event) => {
            event.preventDefault();
            toggleLookVisible(false);
            changeRenderLook('');
        }
        const renderLook = (event) => {
            event.preventDefault();
            
            let data = {look_id: looktoRender}
            fetch('/api/look_data', {
                            method:'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-type': 'application/json'
                            }
                        })
            .then(res => res.json())
            .then(data => {
                setLookData(data)
                toggleLookVisible(true)
                return data
            })
            .catch(e => console.log(e))
        };
        const changeLook = (event) => {
            changeRenderLook(event)
        };
        return (
        <>
        <Form m="small" onSubmit={renderLook}>
            <Text>Choose one of these {props.looks.length} looks:</Text>
            <Select
                onChange={changeLook}
                value={looktoRender}
                options={props.looks.map((look) => {
                    return ({ value: look.id, label: look.title })
                })} / >
            <Button type='submit'>Render Data from selected look</Button>
        </Form>
        {(looktoRender && showLook) && 
         <>
            <Space m="medium">
            {JSON.stringify(lookData)}
            </Space>
            <Space m="small">
            <Button onClick={resetLook}> Reset </Button>
            </Space>
            </>
        }
        </>
        )
     } else {
            return <Space></Space>
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
        <Box p='medium' m='large'>
        <WelcomePanel user={user}/>
        <LookFetcher />
        </Box>
        </>
    )
}

export default APIData