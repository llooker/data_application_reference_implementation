import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Form,
  Heading,
  Select,
  Text,
  Space,
  Status,
  Spinner
} from "@looker/components";
import { QueryTable } from '../common/QueryDataTable'

// TODO -> Spinner message
// TODO -> Show errors from API in page instead of console
// TODO -> Pretty print JSON data or format as table

/**
 * Render a spinner while data is fetched
 */
const RenderLoading = () => {
  return (<Space p="medium"><Spinner></Spinner></Space>)
};
/**
 * Render an error message
 * @param {Object} props - Properties from the parent component.
 * @param {string} props.message - The error message text to display.
 */
const RenderError = (props) => {
  return (<Space p="small"><Status intent="critical" />{props.message}</Space>)
};
/**
 * An component fragment that provides a button to fetch a list of Looks from the backend.
 */
const LookFetcher = () => {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [looks, setLooks] = useState([]);
  
  const fetchLooks = () => {
    setLoading(true);
    fetch("/api/looks")
      .then((res) => res.json())
      .then((looks) => {
        setLooks(looks);
        setLoading(false);
      })
      .catch(e => setError(String(e)));
  };

  return (
    <>
      <Button onClick={fetchLooks}>Fetch Looks!</Button>
      {isLoading && <RenderLoading/>}
      {error !== '' && <RenderError message={error}/>}
      {looks && <FetchedLooks looks={looks} />}
    </>
  );
};
/**
 * @param  {Object} props - Properties from the parent component.
 * @param  {Array} props.looks - Array of look objects returned by API
 * @param  {number} props.looks[].id - Unique ID of the Look
 * @param  {string} props.looks[].title - Title of the Look
 * @param  {string} props.looks[].embed_url - Embed URL of the Look
 * @param  {string} props.looks[].query_id - Underlying query ID of the look
 */
const FetchedLooks = (props) => {
  /**
   * @param  {string} error - State handler to set error message text
   */
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [looktoRender, chooseRenderLook] = useState("");
  const [lookData, setLookData] = useState("{}");

  if (props.looks.length > 0) {
    /**
     * Resets state for loading, errors and any look data 
     * Note - this is not really public - just a test
     * @param  {object} event
     * @public
     */
    const resetLook = (event) => {
      event.preventDefault();
      setLoading(false);
      setError('');
      setLookData('{}');
    };
    /**
     * Resets state and fetches new data from the API for a specific look ID 
     * @param  {object} event - event fired by the Component.
     */
    const RenderLook = (event) => {
      event.preventDefault();
      resetLook(event);
      setLoading(true);
      fetch(`/api/looks/${looktoRender}`)
        .then((res) => res.json())
        .then((data) => {
          if ((data instanceof Array && data[0].looker_error) || (data instanceof Object && data.error)) {
            let errorMsg = data instanceof Array ? data[0].looker_error : data.error;
            let errorText = data.length > 1 ? `${errorMsg} and ${data.length - 1} other errors` :errorMsg;
            setError(errorText);
          } else {
            setLookData(data);
          }
          setLoading(false);
          return data;
        })
        .catch(e => {console.log(`unhandled:${e}`); setError(String(e))});
    };
    return (
      <>
        <Form m="small" onSubmit={RenderLook}>
          <Text>Choose one of these {props.looks.length} looks:</Text>
          <Select
            onChange={chooseRenderLook}
            value={looktoRender}
            options={props.looks.map((look) => {return { value: look.id, label: look.title }})}
          />
          <Button type="submit">Render Data from selected look</Button>
        </Form>
        {isLoading && <RenderLoading/>}
        {error !== '' && <RenderError message={error}/>}
        {lookData != '{}' && (
          <>
            <Space m="small"><Button color="critical" onClick={resetLook}> Reset </Button></Space>
            <Space m="medium"><QueryTable data={lookData}/></Space>
          </>
        )}
      </>
    );
  } 
  return <Space></Space>;
};
/**
 * Render the main page component
 */
const APIData =  () => {
  const [user, setUser] = useState({});
  const fetchUser =  () => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((user) => setUser(user));
  };
  useEffect(() => fetchUser(), []);
  return (
      <Box p="medium" m="large">
        <Space m="small">
          {user && <Heading as="h2">Welcome {user.first_name}</Heading>}
        </Space>
        <LookFetcher />
      </Box>
  );
};

export default APIData;
